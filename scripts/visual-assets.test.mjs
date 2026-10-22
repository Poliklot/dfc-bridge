import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseHandoff, validateHandoff } from '../validator/handoff.mjs';
import { parseVisualAssetRequest, parseVisualAssetPacket, validateVisualAssetRequest, parseVisualTransferRequest, parseVisualPreviewPacket, validateVisualPreviewRequest } from '../validator/visual-assets.mjs';
const read = name => readFile(new URL('../validator/' + name, import.meta.url),'utf8');

test('v3 synthetic visual facts preserve full native paint order without expanding the structural graph',async()=>{
 const snapshot=await parseHandoff(await read('examples/handoff-visuals.valid.json'));
 const request=parseVisualAssetRequest(await read('examples/visual-request.valid.json'));
 assert.equal(snapshot.schemaVersion,3);assert.equal(request.snapshotRevision,snapshot.revision);
 const target=snapshot.visualInspection.nodes.find(node=>node.id===request.slots[0].nodeId);
 assert.equal(target.native.fills[0].imageHash,request.slots[0].imageHash);
 assert.equal(target.native.fills.length,3);assert.equal(target.native.fills[2].visible,false);
 assert.equal(snapshot.nodes.some(node=>node.id===target.id),false);
 for(const node of snapshot.nodes.filter(node=>node.type==='INSTANCE'))assert.deepEqual(node.children,[]);
 const old=structuredClone(snapshot);old.schemaVersion=2;assert.throws(()=>validateHandoff(old),/Invalid/);
});
test('exact visual requests reject unsafe or excessive slots, duplicate sources, accessors and offsets',async()=>{
 const text=await read('examples/visual-request.valid.json');const request=parseVisualAssetRequest(text);
 let reads=0;const accessor={...request};Object.defineProperty(accessor,'kind',{enumerable:true,get(){reads++;return 'page';}});assert.throws(()=>validateVisualAssetRequest(accessor),/accessors/);assert.equal(reads,0);
 const slots=[request.slots[0]];Object.defineProperty(slots,'0',{enumerable:true,get(){reads++;return request.slots[0];}});assert.throws(()=>validateVisualAssetRequest({...request,slots}),/accessors/);assert.equal(reads,0);
 for(const changed of [{...request,extra:true},{...request,slots:Array(9).fill(request.slots[0])},{...request,slots:[request.slots[0],request.slots[0]]},{...request,slots:[{...request.slots[0],offset:1}]}])assert.throws(()=>parseVisualAssetRequest(JSON.stringify(changed)));
 assert.throws(()=>parseVisualAssetRequest(' '.repeat(16385)),/16 KiB/);
 const prototype=JSON.parse(text.replace('"format":','"__proto__":{},"format":'));assert.throws(()=>parseVisualAssetRequest(JSON.stringify(prototype)));
});
test('visual byte packet shape and exact chunk ranges are bounded independently of snapshot size',()=>{
 const packet={format:'dfc-bridge-visual-assets',schemaVersion:1,snapshotRevision:'a'.repeat(64),chunks:[{imageHash:'b'.repeat(40),offset:0,totalBytes:1,base64:'eA==',sha256:'c'.repeat(64)}],unavailable:[]};
 assert.equal(parseVisualAssetPacket(JSON.stringify(packet)).chunks[0].totalBytes,1);
 assert.throws(()=>parseVisualAssetPacket(JSON.stringify({...packet,chunks:[{...packet.chunks[0],totalBytes:2}]})),/length/);
 assert.throws(()=>parseVisualAssetPacket(' '.repeat(2*1024*1024+1)),/2 MiB/);
});
test('native preview transfer is bounded, revision-bound and separate from original bytes', async () => {
 const request = parseVisualTransferRequest(await read('examples/visual-preview-request.valid.json'));
 const packet = parseVisualPreviewPacket(await read('examples/visual-preview.valid.json'));
 assert.equal(request.nodeId, packet.nodeId); assert.equal(request.snapshotRevision, packet.snapshotRevision);
 assert.equal(parseVisualTransferRequest(await read('examples/visual-request.valid.json')).format, 'dfc-bridge-visual-request');
 assert.throws(() => parseVisualAssetPacket(JSON.stringify(packet)), /field/);
 for (const changed of [{...request, nodeId:'../x'}, {...request, kind:'file'}, {...request, extra:0}, {...request, snapshotRevision:'a'}]) assert.throws(() => validateVisualPreviewRequest(changed));
 let reads = 0; const accessor = {...request}; Object.defineProperty(accessor, 'nodeId', {enumerable:true,get(){reads++;return request.nodeId;}});
 assert.throws(() => validateVisualPreviewRequest(accessor), /accessors/); assert.equal(reads, 0);
 assert.throws(() => validateVisualPreviewRequest({...request, [Symbol('hidden')]:true}));
 for (const changed of [{...packet,preview:null}, {...packet,unavailable:'refused'}, {...packet, preview:{...packet.preview,base64:'eA=='}}, {...packet,extra:true}]) assert.throws(() => parseVisualPreviewPacket(JSON.stringify(changed)));
 const unavailable = {...packet,preview:null,unavailable:'Native export refused'};
 assert.equal(parseVisualPreviewPacket(JSON.stringify(unavailable)).preview, null);
 assert.throws(() => parseVisualPreviewPacket(' '.repeat(2*1024*1024+1)), /2 MiB/);
});
