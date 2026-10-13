import assert from 'node:assert/strict';
import {createHash, webcrypto} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createServer, request} from 'node:http';
import {test} from 'node:test';
import {runInNewContext} from 'node:vm';
import {handleRecorderRequest} from './serve-figma-recorder.mjs';

const html=readFileSync(new URL('./figma-recorder.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/u)[1];

test('loopback handler serves only local GET/HEAD recorder routes with restrictive headers',async t=>{
 const server=createServer(handleRecorderRequest);
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 t.after(()=>new Promise(resolve=>server.close(resolve)));
 const fetch=({method='GET',path='/',host='127.0.0.1:4393'}={})=>new Promise((resolve,reject)=>{
  const req=request({host:'127.0.0.1',port:server.address().port,method,path,headers:{Host:host}},res=>{
   const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks).toString()}));
  });
  req.on('error',reject);req.end();
 });
 for(const path of ['/','/index.html']){
  const response=await fetch({path});
  assert.equal(response.status,200);assert.equal(response.body,html);
  assert.match(response.headers['content-type'],/^text\/html/u);
  assert.equal(response.headers['cache-control'],'no-store');
  assert.equal(response.headers['x-content-type-options'],'nosniff');
  assert.match(response.headers['content-security-policy'],/connect-src 'none'/u);
  assert.match(response.headers['content-security-policy'],/frame-ancestors 'none'/u);
  assert.equal(response.headers['permissions-policy'],'microphone=(), camera=(), display-capture=(self)');
 }
 const head=await fetch({method:'HEAD',host:'localhost:4393'});
 assert.equal(head.status,200);assert.equal(head.body,'');
 for(const host of ['evil.example','localhost:4393.evil.example','127.0.0.1:80',''])assert.equal((await fetch({host})).status,403);
 for(const method of ['POST','PUT','DELETE','OPTIONS']){
  const response=await fetch({method});assert.equal(response.status,405);assert.equal(response.headers.allow,'GET, HEAD');
 }
 for(const path of ['/figma-recorder.html','/../package.json','/?x=1','/upload'])assert.equal((await fetch({path})).status,404);
});

// Execute the actual inline browser program with deterministic media/DOM fakes.
// This verifies control flow, not actual browser encoding or capture permissions.
function recorderHarness(options={}){
 const listeners=new Map(), downloads=[], blobs=new Map(), revoked=[], recorders=[], requests=[], timers=new Set();
 let objectId=0, now=1000;
 class Target{
  constructor(){this.events=new Map();this.style={};this.disabled=false;this.textContent='';this.srcObject=null}
  addEventListener(type,fn,{once=false}={}){const list=this.events.get(type)||[];list.push({fn,once});this.events.set(type,list)}
  fire(type,event={}){const list=[...(this.events.get(type)||[])];return Promise.all(list.map(({fn,once})=>{if(once)this.events.set(type,(this.events.get(type)||[]).filter(item=>item.fn!==fn));return fn(event)}))}
  click(){if(this.disabled)return Promise.resolve();if(this.href)downloads.push({href:this.href,file:this.download,blob:blobs.get(this.href)});return this.fire('click')}
  removeAttribute(name){delete this[name]}
  play(){return Promise.resolve()}
 }
 const elements=Object.fromEntries([...html.matchAll(/id="([^"]+)"/gu)].map(([,id])=>[id,new Target()]));
 for(const id of ['stop','save','metadata','clear'])elements[id].disabled=true;
 const track=new Target();track.label=options.label||'Teaching Figma window';track.stopped=false;
 track.getSettings=()=>({displaySurface:'window',width:1440,height:900,frameRate:30,cursor:'always',...options.settings});
 track.stop=()=>{track.stopped=true};
 const audio={stopped:false,stop(){this.stopped=true}};
 const stream={getVideoTracks:()=>options.noVideo?[]:[track],getAudioTracks:()=>options.audio?[audio]:[],getTracks:()=>[track,...(options.audio?[audio]:[])]};
 class Recorder extends Target{
  static isTypeSupported(type){return !options.unsupported&&type==='video/webm;codecs=vp9'}
  constructor(media,config){super();assert.equal(media,stream);assert.equal(config.videoBitsPerSecond,30000000);this.mimeType=config.mimeType;this.state='inactive';recorders.push(this)}
  start(interval){assert.equal(interval,1000);if(options.startError)throw new Error('Encoder could not start');this.state='recording'}
  stop(){assert.equal(this.state,'recording');this.state='inactive';void this.fire('dataavailable',{data:new Blob([options.empty?'':options.data||'real capture bytes'])});void this.fire('stop')}
 }
 const window={MediaRecorder:Recorder,addEventListener(type,fn){listeners.set(type,fn)}};
 runInNewContext(script,{
  document:{getElementById:id=>elements[id],createElement:()=>new Target()},window,MediaRecorder:Recorder,
  navigator:{mediaDevices:{getDisplayMedia:async config=>{requests.push(config);if(options.permissionError)throw new Error('Permission denied');return stream}}},
  Blob,Uint8Array,URL:{createObjectURL(blob){const url=`blob:test-${++objectId}`;blobs.set(url,blob);return url},revokeObjectURL(url){revoked.push(url);blobs.delete(url)}},
  performance:{now:()=>now},crypto:{subtle:{digest:options.digest||webcrypto.subtle.digest.bind(webcrypto.subtle)}},
  setInterval(){const id=Symbol();timers.add(id);return id},clearInterval:id=>timers.delete(id),setTimeout:()=>0,
 });
 return {elements,downloads,blobs,revoked,recorders,requests,track,audio,timers,window: listeners,
  click:id=>elements[id].click(),advance:ms=>{now+=ms}};
}

test('window recording requests no audio, releases tracks, downloads matching media and metadata',async()=>{
 const h=recorderHarness();await h.click('start');
 assert.equal(h.requests.length,1);
 assert.equal(h.requests[0].audio,false);assert.equal(h.requests[0].systemAudio,'exclude');
 assert.equal(h.requests[0].video.displaySurface,'window');assert.equal(h.requests[0].video.frameRate.max,30);
 assert.match(h.elements.status.textContent,/Recording the selected surface/u);
 assert.equal(h.elements.start.disabled,true);assert.equal(h.elements.stop.disabled,false);
 h.advance(3500);await h.click('stop');
 assert.equal(h.track.stopped,true);assert.equal(h.timers.size,0);assert.equal(h.elements.start.disabled,true);
 await h.click('save');await h.click('metadata');
 const [video,json]=h.downloads, metadata=JSON.parse(await json.blob.text());
 assert.match(video.file,/^dfc-native-.*\.webm$/u);assert.equal(json.file,video.file.replace('.webm','.json'));
 assert.equal(await video.blob.text(),'real capture bytes');assert.equal(metadata.file,video.file);
 assert.equal(metadata.sha256,createHash('sha256').update('real capture bytes').digest('hex'));
 assert.equal(metadata.durationSeconds,3.5);assert.equal(metadata.audioTracks,0);assert.equal(metadata.recorderError,null);
 assert.match(metadata.clock,/not an event timeline/u);
 await h.click('start');assert.equal(h.requests.length,1,'Start may not silently replace an unsaved capture');
 await h.click('clear');assert.equal(h.elements.start.disabled,false);assert.equal(h.elements.save.disabled,true);
 assert.ok(h.revoked.includes(video.href));assert.equal(h.elements.preview.srcObject,null);
});

test('capture picker cancellation returns a retryable state',async()=>{
 const h=recorderHarness({permissionError:true});await h.click('start');
 assert.equal(h.elements.start.disabled,false);assert.equal(h.elements.stop.disabled,true);assert.equal(h.elements.save.disabled,true);
 assert.match(h.elements.error.textContent,/Permission denied/u);
});

for(const displaySurface of ['monitor','browser',undefined])test(`rejects non-window surface ${displaySurface} and stops all tracks`,async()=>{
 const h=recorderHarness({settings:{displaySurface}});await h.click('start');
 assert.equal(h.recorders.length,0);assert.equal(h.track.stopped,true);assert.equal(h.elements.start.disabled,false);
 assert.match(h.elements.error.textContent,/Only a window is allowed/u);
});

test('unexpected audio is rejected and released before recording',async()=>{
 const h=recorderHarness({audio:true});await h.click('start');
 assert.equal(h.recorders.length,0);assert.equal(h.track.stopped,true);assert.equal(h.audio.stopped,true);
 assert.match(h.elements.error.textContent,/Unexpected audio track/u);
});

for(const [options,message] of [[{noVideo:true},'No video track'],[{unsupported:true},'cannot encode WebM'],[{startError:true},'Encoder could not start']])test(`retryable failure: ${message}`,async()=>{
 const h=recorderHarness(options);await h.click('start');
 assert.equal(h.track.stopped,true);assert.equal(h.elements.preview.srcObject,null);assert.equal(h.timers.size,0);
 assert.equal(h.elements.start.disabled,false);assert.equal(h.elements.save.disabled,true);assert.ok(h.elements.error.textContent.includes(message));
});

test('browser stop-sharing finalizes once; Clear cannot interrupt a capture',async()=>{
 const h=recorderHarness();await h.click('start');await h.elements.clear.fire('click');
 assert.equal(h.track.stopped,false);assert.equal(h.elements.stop.disabled,false);
 h.advance(2000);await h.track.fire('ended');
 assert.equal(h.elements.save.disabled,false);assert.equal(h.track.stopped,true);assert.equal(h.timers.size,0);
 await h.click('stop');assert.equal(h.elements.save.disabled,false);
});

test('empty capture cannot be saved and leaves Start usable',async()=>{
 const h=recorderHarness({empty:true});await h.click('start');await h.click('stop');
 assert.equal(h.elements.save.disabled,true);assert.equal(h.elements.metadata.disabled,true);assert.equal(h.elements.start.disabled,false);
 assert.equal(h.elements.preview.srcObject,null);assert.match(h.elements.status.textContent,/No recording data/u);
});

test('metadata hash uses one snapshot even if Clear and the next take occur while hashing',async()=>{
 let releaseDigest,enteredDigest;
 const entered=new Promise(resolve=>{enteredDigest=resolve});
 const digest=async(...args)=>{enteredDigest();await new Promise(resolve=>{releaseDigest=resolve});return webcrypto.subtle.digest(...args)};
 const h=recorderHarness({digest});await h.click('start');h.advance(2300);await h.click('stop');await h.click('save');
 const original=h.downloads[0];const pending=h.click('metadata');await entered;
 await h.click('clear');h.track.label='Next teaching window';await h.click('start');h.advance(9000);await h.click('stop');
 releaseDigest();await pending;
 const json=h.downloads[1], metadata=JSON.parse(await json.blob.text());
 assert.equal(metadata.file,original.file);assert.equal(metadata.surface,'Teaching Figma window');assert.equal(metadata.durationSeconds,2.3);
 assert.equal(metadata.sha256,createHash('sha256').update(await original.blob.text()).digest('hex'));
});

test('metadata hashing failure is visible and retains the capture for retry',async()=>{
 const h=recorderHarness({digest:async()=>{throw new Error('Hash failed')}});await h.click('start');await h.click('stop');await h.click('metadata');
 assert.match(h.elements.error.textContent,/Metadata could not be saved: Hash failed/u);assert.equal(h.elements.save.disabled,false);
});

test('encoder errors disclose incomplete data in UI and metadata',async()=>{
 const h=recorderHarness();await h.click('start');await h.recorders[0].fire('error',{error:{message:'Encoder failed'}});
 assert.match(h.elements.status.textContent,/may be incomplete/u);assert.equal(h.track.stopped,true);
 await h.click('metadata');assert.equal(JSON.parse(await h.downloads[0].blob.text()).recorderError,'Encoder failed');
});

test('navigation warns without stopping; only confirmed departure releases capture',async()=>{
 const h=recorderHarness();let prevented=false;const event={preventDefault(){prevented=true}};
 h.window.get('beforeunload')(event);assert.equal(prevented,false);
 await h.click('start');h.window.get('beforeunload')(event);
 assert.equal(prevented,true);assert.equal(event.returnValue,'');assert.equal(h.track.stopped,false);
 h.window.get('pagehide')();assert.equal(h.track.stopped,true);assert.equal(h.timers.size,0);
});
