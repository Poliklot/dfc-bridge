// Stage continuous native video only. This renderer never publishes over v2 assets.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,existsSync,rmSync,renameSync,readdirSync} from 'node:fs';
import {resolve,sep,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import sharp from 'sharp';
import { nativeClipIds, assertRectangle, containsRectangle, nativePresentation, captionLines, assertCueReadingTime, assertCue, assertNoFabricatedMotion, assertContinuousInterval } from './native-motion-checks.mjs';

const root=resolve(import.meta.dirname,'..');
const motion=resolve(root,'assets/tutorial/motion');
const args=process.argv.slice(2), allowed=['--clip','--locale','--output-dir','--storyboard'];
const option=name=>{const i=args.indexOf(name); if(i<0)return null;assert(args[i+1]&&!args[i+1].startsWith('--'),name+' requires a value');return args[i+1]};
assert(args.every((value,i)=>allowed.includes(value)||allowed.includes(args[i-1])),'Use --clip, --locale, --output-dir or --storyboard only; there is no publish mode');
const storyboardPath=resolve(option('--storyboard')??resolve(motion,'native-storyboard.json'));
const storyboardBytes=readFileSync(storyboardPath), storyboard=JSON.parse(storyboardBytes);
const outputRoot=resolve(option('--output-dir')??resolve(tmpdir(),'dfc-native-motion-stage'));
assert(outputRoot!==motion&&!outputRoot.startsWith(motion+sep),'Stage outside published motion assets');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
// Both implementation files determine the rendered bytes and invalidate stale stages.
const rendererSha256=hash(Buffer.concat([readFileSync(new URL(import.meta.url)),readFileSync(new URL('./native-motion-checks.mjs',import.meta.url))]));
const escaped=text=>String(text).replace(/[&<>"']/gu,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const {render}=storyboard;
const ids=nativeClipIds;
assert.equal(storyboard.schemaVersion,3);
assert.equal(storyboard.kind,'annotated-native-continuous-recording');
assert.equal(storyboard.overlayCoordinateSpace,'source-pixels');
assert.deepEqual(storyboard.locales,['ru','en','zh']);
assert.deepEqual(storyboard.clips.map(clip=>clip.id),ids);
assert.deepEqual([render.width,render.height,render.fps,render.gifFps,render.crf,render.level],[1920,1080,30,12,12,'4.1']);
assert.deepEqual(render.viewport,{left:64,top:96,width:1792,height:920});
const selected=option('--clip'), locale=option('--locale');
assert(!selected||ids.includes(selected),'Unknown native clip');
assert(!locale||storyboard.locales.includes(locale),'Unknown locale');
const clips=storyboard.clips.filter(clip=>(!selected||clip.id===selected)&&clip.approved);
assert(clips.length,'No reviewed native sources. Approve capture/trim/crop/audit frames before rendering; v2 remains unchanged');
const locales=locale?[locale]:storyboard.locales;
const rect=assertRectangle, contains=containsRectangle;
function probe(file){
 const info=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-show_frames','-show_entries','frame=best_effort_timestamp_time,width,height,duration_time','-of','json',file],{maxBuffer:64*1024*1024}));
 assert.equal(info.streams.length,1,'Source has exactly one video stream and no audio');
 const stream=info.streams[0];assert.equal(stream.codec_type,'video');assert.equal(stream.sample_aspect_ratio,'1:1','Native screen pixels are square');
 const frames=info.frames.map((frame,index)=>({index,ptsSeconds:Number(frame.best_effort_timestamp_time),width:frame.width,height:frame.height,durationSeconds:Number(frame.duration_time)||0}));
 assert(frames.length>=3&&frames.every((frame,index)=>Number.isFinite(frame.ptsSeconds)&&(!index||frame.ptsSeconds>frames[index-1].ptsSeconds)),'Decoded source PTS are strictly increasing; VFR is supported');
 const first=frames[0].ptsSeconds,last=frames.at(-1).ptsSeconds, deltas=frames.slice(1).map((frame,i)=>frame.ptsSeconds-frames[i].ptsSeconds).sort((a,b)=>a-b),median=deltas[Math.floor(deltas.length/2)];
 return {frames,metadata:{width:stream.width,height:stream.height,codec:stream.codec_name,pixFmt:stream.pix_fmt,timeBase:stream.time_base,nominalFrameRate:stream.r_frame_rate,firstPtsSeconds:first,lastPtsSeconds:last,durationSeconds:last-first,coverageEndSeconds:last+ (frames.at(-1).durationSeconds||median)-first,decodedFrames:frames.length,framePtsSha256:hash(JSON.stringify(frames.map(frame=>frame.ptsSeconds))),minimumFrameIntervalSeconds:deltas[0],medianFrameIntervalSeconds:median,maximumFrameIntervalSeconds:deltas.at(-1)}};
}
function cueSvg(cue,locale,presentation){
 const t=presentation.nativeTransform;
 const outlines=cue.highlights.map(r=>{const x=t.left+(r.left-t.crop.left)*t.scaleX,y=t.top+(r.top-t.crop.top)*t.scaleY;return `<rect x="${x}" y="${y}" width="${r.width*t.scaleX}" height="${r.height*t.scaleY}" rx="6" fill="none" stroke="#fff" stroke-width="6"/><rect x="${x}" y="${y}" width="${r.width*t.scaleX}" height="${r.height*t.scaleY}" rx="6" fill="none" stroke="#117e91" stroke-width="3"/>`}).join('');
  const caption=captionLines(cue.label[locale],presentation).map((line,index)=>`<text x="${presentation.caption.left}" y="${presentation.caption.top+presentation.caption.fontSize+index*presentation.caption.lineHeight}" font-family="Arial Unicode MS,Arial,sans-serif" font-size="${presentation.caption.fontSize}" fill="#193943">${escaped(line)}</text>`).join('');
 return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${presentation.width}" height="${presentation.height}">${caption}${outlines}</svg>`);
}
const temporary=mkdtempSync(resolve(tmpdir(),'dfc-native-render-'));
const nativeBaseFilter=(clip,presentation,source)=>{
 const first=source.firstPtsSeconds,t=presentation.nativeTransform;
 return `trim=start=${first+clip.trim.startSeconds}:end=${first+clip.trim.endSeconds},setpts=PTS-STARTPTS,scale=iw:ih:in_color_matrix=bt709:out_color_matrix=bt709:in_range=tv:out_range=full,format=rgba,crop=${clip.crop.width}:${clip.crop.height}:${clip.crop.left}:${clip.crop.top}:exact=1,scale=${t.width}:${t.height}:flags=lanczos,pad=${presentation.width}:${presentation.height}:${t.left}:${t.top}:color=0xedf2f5,setsar=1,fps=${render.fps}:start_time=0:round=near`;
};
try{
 mkdirSync(outputRoot,{recursive:true});
 const manifestPath=resolve(outputRoot,'native-provenance.json');
 const previous=existsSync(manifestPath)?JSON.parse(readFileSync(manifestPath)):null;
 const configurationHash=clip=>hash(JSON.stringify({rendererSha256,render,clip,sourceSha256:clip.sourceCapture.sha256}));
 const manifest={schemaVersion:3,kind:storyboard.kind,publication:'staged-only',complete:false,capturedAt:storyboard.capturedAt,fileKey:storyboard.fileKey,plannedIds:ids,overlayCoordinateSpace:'source-pixels',captureMethod:'Continuous native Figma window video recorded by browser getDisplayMedia and MediaRecorder. Public excerpts retain one continuous interval with a fixed privacy crop and lossless encoding. No action-following automation cursor was captured; a parked native pointer may remain. No editorial pointer is rendered.',transform:'One contiguous native movie interval at natural 1× timing, one documented fixed privacy crop, one declared fixed presentation crop, subject-fit matte, optional downsample only and ordinary CFR30 resampling. Localized captions and stroke-only action highlights are editorial. No native state reconstruction, synthetic pointer paths, added holds, speed-up or interpolated native frames.',storyboardSha256:hash(storyboardBytes),storyboardFile:"native-storyboard.json",rendererSha256,render,clips:previous?.schemaVersion===3&&previous.rendererSha256===rendererSha256?previous.clips.filter(clip=>storyboard.clips.some(plan=>plan.id===clip.id&&plan.approved&&clip.configurationSha256===configurationHash(plan))):[]};
 const pending=[];
 for(const clip of clips){
  for(const key of ['action','evidenceFact','sourcePageName','sourceInterface'])assert(typeof clip[key]==='string'&&clip[key].trim(),clip.id+': '+key);
  assert(clip.sourceCapture&&clip.trim&&clip.crop&&clip.auditFrames?.length>=3&&clip.cues?.length,clip.id+': reviewed continuous source and intermediate audits required');
  assertNoFabricatedMotion(clip);
  const capture=clip.sourceCapture;
  assert.match(capture.file,/^source\/video\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:webm|mkv|mov|mp4)$/u);
  assert.equal(capture.actionFollowingCursorCaptured,false,'No action-following automation cursor was captured; parked native cursor pixels may remain');
  assert.match(capture.sha256,/^[a-f0-9]{64}$/u);
  assert.match(capture.origin.originalSha256,/^[a-f0-9]{64}$/u);
  assert(capture.origin.localOriginalRetained===true&&capture.origin.ciVerifies==='excerpt-only');
  assert(Number.isFinite(capture.origin.startSeconds)&&capture.origin.startSeconds>=0&&capture.origin.endSeconds>capture.origin.startSeconds);
  const file=resolve(motion,capture.file);assert(file.startsWith(motion+sep)&&existsSync(file),'Reviewed video excerpt exists');assert.equal(hash(readFileSync(file)),capture.sha256,'Source unchanged after review');
  const source=probe(file),presentation=nativePresentation(clip.crop,render),t=presentation.nativeTransform;
  rect(capture.originalFixedCrop);assert(typeof clip.presentationPurpose==='string'&&clip.presentationPurpose.trim(),'Declare what the fixed presentation crop proves');assert.deepEqual([source.metadata.width,source.metadata.height],[capture.originalFixedCrop.width,capture.originalFixedCrop.height]);
  assert(source.frames.every(frame=>contains({left:0,top:0,width:frame.width,height:frame.height},clip.crop)),'Fixed crop fits every decoded source frame');
  assertContinuousInterval(clip.trim,source.metadata.coverageEndSeconds);
  const duration=clip.trim.endSeconds-clip.trim.startSeconds;
  assert(Number.isFinite(clip.posterAtSeconds)&&clip.posterAtSeconds>=0&&clip.posterAtSeconds<duration);
  let lastEnd=0;
  assertCueReadingTime(clip.cues);
  for(const cue of clip.cues){
   assertCue(cue,clip.crop,duration);
   assert(cue.startSeconds===lastEnd,'Editorial cue times cover the real trim without gaps or overlaps');lastEnd=cue.endSeconds;
   for(const lang of storyboard.locales)captionLines(cue.label[lang],presentation);
  }
  assert(Math.abs(lastEnd-duration)<=1e-9,'Final explanation reaches the real endpoint');
  const auditFrames=[];
  for(const [index,audit] of clip.auditFrames.entries()){
   assert(Number.isFinite(audit.timeSeconds)&&audit.timeSeconds>=clip.trim.startSeconds&&audit.timeSeconds<clip.trim.endSeconds,'Audit sample is excerpt-relative and inside trim');
   assert(['before','action','after'].includes(audit.phase)&&typeof audit.kind==='string'&&audit.kind.trim(),'Audit phase and observed event kind');
   const frame=source.frames.find(frame=>frame.ptsSeconds>=source.metadata.firstPtsSeconds+audit.timeSeconds);assert(frame,'Observed audit frame exists');
   const raw=execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-i',file,'-vf',`select=eq(n\\,${frame.index})`,'-frames:v','1','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],{maxBuffer:frame.width*frame.height*3+1024});
   assert.equal(raw.length,frame.width*frame.height*3);
   const image=sharp(raw,{raw:{width:frame.width,height:frame.height,channels:3}}), cropped=await image.clone().extract(clip.crop).raw().toBuffer();
   const resized=execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-i',file,'-vf',`select=eq(n\\,${frame.index}),scale=iw:ih:in_color_matrix=bt709:out_color_matrix=bt709:in_range=tv:out_range=full,format=rgba,crop=${clip.crop.width}:${clip.crop.height}:${clip.crop.left}:${clip.crop.top}:exact=1,scale=${t.width}:${t.height}:flags=lanczos,format=rgb24`,'-frames:v','1','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],{maxBuffer:t.width*t.height*3+1024});
   const proof=`audit/${clip.id}-${String(index+1).padStart(2,'0')}.png`,proofPath=resolve(temporary,proof);mkdirSync(dirname(proofPath),{recursive:true});await image.png().toFile(proofPath);pending.push({name:proof,path:proofPath});
   auditFrames.push({...audit,sourceFrameIndex:frame.index,sourcePtsSeconds:frame.ptsSeconds,sourceFrameSha256:hash(raw),cropSha256:hash(cropped),nativeBitmapSha256:hash(resized),sourceFrameProof:proof});
  }
  assert(auditFrames[0].phase==='before'&&auditFrames.at(-1).phase==='after'&&auditFrames.some(frame=>frame.phase==='action'),'Before/intermediate/after evidence is reviewed');
  const configurationSha256=configurationHash(clip);
  const old=manifest.clips.find(record=>record.id===clip.id);
  const outputs=old?.configurationSha256===configurationSha256?old.outputs.filter(output=>!locales.includes(output.locale)):[];
  for(const lang of locales){
   const cueInputs=[];for(const [index,cue]of clip.cues.entries()){const cuePath=resolve(temporary,`${clip.id}-${lang}-cue-${index}.png`);await sharp(cueSvg(cue,lang,presentation)).png().toFile(cuePath);cueInputs.push(cuePath)}
   const filters=[`[0:v]${nativeBaseFilter(clip,presentation,source.metadata)}[native]`];let last='native';
   clip.cues.forEach((cue,index)=>{const next=`cue${index}`, finalEndpoint=index===clip.cues.length-1&&Math.abs(cue.endSeconds-duration)<=1e-9;filters.push(`[${last}][${index+1}:v]overlay=0:0:format=rgb:shortest=1:enable='gte(t,${cue.startSeconds})*${finalEndpoint?'lte':'lt'}(t,${cue.endSeconds})'[${next}]`);last=next});
   filters.push(`[${last}]scale=iw:ih:in_color_matrix=bt709:out_color_matrix=bt709:in_range=full:out_range=tv,format=yuv420p,setparams=range=tv:color_primaries=bt709:color_trc=bt709:colorspace=bt709[video]`);
   const common=['-hide_banner','-loglevel','error','-y','-i',file,...cueInputs.flatMap(path=>['-loop','1','-framerate',String(render.fps),'-i',path]),'-filter_complex',filters.join(';'),'-map','[video]','-an'];
   const names={file:`native/${clip.id}-${lang}.mp4`,gif:`native/${clip.id}-${lang}.gif`,poster:`native/${clip.id}-${lang}.png`};for(const name of Object.values(names))mkdirSync(dirname(resolve(temporary,name)),{recursive:true});
   execFileSync('ffmpeg',[...common,'-c:v','libx264','-preset','slow','-crf',String(render.crf),'-level:v',render.level,'-pix_fmt','yuv420p','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-movflags','+faststart',resolve(temporary,names.file)],{maxBuffer:16*1024*1024});
   const encoded=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',resolve(temporary,names.file)]));const stream=encoded.streams[0],encodedDuration=Number(encoded.format.duration);
   assert(encoded.streams.length===1&&stream.codec_name==='h264'&&stream.width===presentation.width&&stream.height===presentation.height&&stream.r_frame_rate==='30/1'&&stream.level===41,'Encoded native output uses subject-fit H264 level4.1 CFR30 without audio');
   assert(Math.abs(encodedDuration-duration)<=.1,'Real source duration retained without added holds or retiming');
   execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',resolve(temporary,names.file),'-filter_complex',`fps=${render.gifFps},split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=sierra2_4a`,'-an','-loop','0',resolve(temporary,names.gif)],{maxBuffer:16*1024*1024});
   const posterFilters=filters.slice(0,-1);posterFilters.push(`[${last}]select='gte(t,${clip.posterAtSeconds})',format=rgba[video]`);
   const posterArgs=[...common];posterArgs[posterArgs.indexOf('-filter_complex')+1]=posterFilters.join(';');
   execFileSync('ffmpeg',[...posterArgs,'-frames:v','1',resolve(temporary,names.poster)],{maxBuffer:16*1024*1024});
   outputs.push({locale:lang,...names,sha256:hash(readFileSync(resolve(temporary,names.file))),gifSha256:hash(readFileSync(resolve(temporary,names.gif))),posterSha256:hash(readFileSync(resolve(temporary,names.poster))),width:presentation.width,height:presentation.height,durationSeconds:encodedDuration,decodedFrames:Number(stream.nb_read_frames),fps:render.fps,gifFps:render.gifFps,crf:render.crf,level:render.level});
   for(const name of Object.values(names))pending.push({name,path:resolve(temporary,name)});
   console.log(`${clip.id} ${lang}: ${encodedDuration}s real native video, ${t.width}×${t.height} native on ${presentation.width}×${presentation.height}, scale ${t.scale.toFixed(3)}; staged only`);
  }
  const firstSelected=source.frames.find(frame=>frame.ptsSeconds>=source.metadata.firstPtsSeconds+clip.trim.startSeconds);
  const record={id:clip.id,kind:storyboard.kind,action:clip.action,evidenceFact:clip.evidenceFact,sourcePageName:clip.sourcePageName,sourceInterface:clip.sourceInterface,sourceCapture:{...capture,...source.metadata},trim:clip.trim,crop:clip.crop,presentationPurpose:clip.presentationPurpose,presentation,nativeTransform:t,posterAtSeconds:clip.posterAtSeconds,cues:clip.cues,auditFrames,timeline:{speed:1,continuous:true,frameResampling:'fps=30:start_time=0:round=near',sourceStartPtsSeconds:firstSelected.ptsSeconds,sourceTimeline:'seconds relative to the first decoded source PTS',addedHolds:false,syntheticPointer:false},rendererSha256,configurationSha256,outputs:outputs.sort((a,b)=>storyboard.locales.indexOf(a.locale)-storyboard.locales.indexOf(b.locale))};
  const oldIndex=manifest.clips.findIndex(item=>item.id===clip.id);if(oldIndex<0)manifest.clips.push(record);else manifest.clips[oldIndex]=record;
 }
 manifest.clips.sort((a,b)=>ids.indexOf(a.id)-ids.indexOf(b.id));
 manifest.complete=manifest.clips.length===ids.length&&manifest.clips.every(clip=>clip.outputs.length===3)&&storyboard.clips.every(clip=>clip.approved);
 // Failed validation/encoding leaves staged media and all published v2 bytes untouched.
 for(const output of pending){const destination=resolve(outputRoot,output.name);mkdirSync(dirname(destination),{recursive:true});const temporaryDestination=destination+'.pending';writeFileSync(temporaryDestination,readFileSync(output.path));renameSync(temporaryDestination,destination)}
 const snapshotPath=resolve(outputRoot,manifest.storyboardFile);writeFileSync(snapshotPath+'.pending',storyboardBytes);renameSync(snapshotPath+'.pending',snapshotPath);
 const temporaryManifest=manifestPath+'.pending';writeFileSync(temporaryManifest,JSON.stringify(manifest,null,2)+'\n');renameSync(temporaryManifest,manifestPath);
 const registeredNative=new Set(manifest.clips.flatMap(clip=>clip.outputs.flatMap(output=>[output.file,output.gif,output.poster])));
 const registeredAudits=new Set(manifest.clips.flatMap(clip=>clip.auditFrames.map(frame=>frame.sourceFrameProof)));
 const nativeDirectory=resolve(outputRoot,'native'),auditDirectory=resolve(outputRoot,'audit');
 // Prune only this renderer's canonical stage names, never unknown files or published v2 assets.
 if(existsSync(nativeDirectory))for(const name of readdirSync(nativeDirectory))if(ids.some(id=>storyboard.locales.some(lang=>['mp4','gif','png'].some(ext=>name===`${id}-${lang}.${ext}`)))&&!registeredNative.has('native/'+name))rmSync(resolve(nativeDirectory,name));
 if(existsSync(auditDirectory))for(const name of readdirSync(auditDirectory))if(ids.some(id=>new RegExp(`^${id}-\\d{2}\\.png$`,'u').test(name))&&!registeredAudits.has('audit/'+name))rmSync(resolve(auditDirectory,name));
 console.log(`Stage manifest: ${manifestPath}; complete=${manifest.complete}; no published files changed`);
}finally{rmSync(temporary,{recursive:true,force:true})}
