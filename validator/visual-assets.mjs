// Bounded native-byte transfer shared by the plugin, UI and offline consumer.
// A request identifies exact saved slots, never names or export-list positions.
export const VISUAL_CHUNK_BYTES = 65536;
export const MAX_VISUAL_PACKET_BYTES = 2 * 1024 * 1024;
const visualHash = /^[a-f0-9]{40}$/u;
const visualRevision = /^[a-f0-9]{64}$/u;
function visualObject(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new Error('Expected a plain visual transfer object.');
  const own = Object.keys(value);
  if (own.length !== keys.length || own.some(key => !keys.includes(key))) throw new Error('Unknown or missing visual transfer field.');
  for (const key of keys) if (!Object.prototype.hasOwnProperty.call(value, key) || !('value' in Object.getOwnPropertyDescriptor(value, key))) throw new Error('Visual transfer accessors are unsupported.');
}
function visualArray(value, maxItems) {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype || value.length > maxItems || Object.keys(value).length !== value.length || Object.getOwnPropertySymbols(value).length) throw new Error('Expected a bounded plain visual array.');
  for (let index = 0; index < value.length; index++) if (!('value' in Object.getOwnPropertyDescriptor(value, String(index)))) throw new Error('Visual array accessors are unsupported.');
}
export function validateVisualAssetRequest(request) {
  visualObject(request, ['format', 'schemaVersion', 'snapshotRevision', 'kind', 'slots']);
  if (request.format !== 'dfc-bridge-visual-request' || request.schemaVersion !== 1 || typeof request.snapshotRevision !== 'string' || !visualRevision.test(request.snapshotRevision) || !['page', 'section'].includes(request.kind)) throw new Error('Invalid visual asset request header.');
  visualArray(request.slots, 8);
  if (!Array.isArray(request.slots) || !request.slots.length || request.slots.length > 8) throw new Error('Request 1–8 exact visual slots at a time.');
  const seen = new Set();
  for (const slot of request.slots) {
    visualObject(slot, ['nodeId', 'field', 'index', 'imageHash', 'offset']);
    if (typeof slot.nodeId !== 'string' || !/^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$/u.test(slot.nodeId) || !['fills', 'strokes'].includes(slot.field) || !Number.isInteger(slot.index) || slot.index < 0 || slot.index > 200000 || typeof slot.imageHash !== 'string' || !visualHash.test(slot.imageHash) || !Number.isInteger(slot.offset) || slot.offset < 0 || slot.offset >= 32 * 1024 * 1024 || slot.offset % VISUAL_CHUNK_BYTES) throw new Error('Invalid exact visual slot or chunk offset.');
    const key = slot.imageHash + ':' + slot.offset;
    if (seen.has(key)) throw new Error('Duplicate requested source chunk.');
    seen.add(key);
  }
  return request;
}
export function parseVisualAssetRequest(text) {
  if (typeof text !== 'string' || new TextEncoder().encode(text).length > 16384) throw new Error('Visual request exceeds 16 KiB.');
  return validateVisualAssetRequest(JSON.parse(text));
}
export function parseVisualAssetPacket(text) {
  if (typeof text !== 'string' || new TextEncoder().encode(text).length > MAX_VISUAL_PACKET_BYTES) throw new Error('Visual packet exceeds 2 MiB.');
  const packet = JSON.parse(text);
  visualObject(packet, ['format', 'schemaVersion', 'snapshotRevision', 'chunks', 'unavailable']);
  if (packet.format !== 'dfc-bridge-visual-assets' || packet.schemaVersion !== 1 || typeof packet.snapshotRevision !== 'string' || !visualRevision.test(packet.snapshotRevision)) throw new Error('Invalid visual packet header.');
  visualArray(packet.chunks, 8); visualArray(packet.unavailable, 8);
  if (!Array.isArray(packet.chunks) || packet.chunks.length > 8 || !Array.isArray(packet.unavailable) || packet.unavailable.length > 8 || packet.chunks.length + packet.unavailable.length > 8) throw new Error('Visual packet count exceeds one request.');
  const seen = new Set();
  for (const chunk of packet.chunks) {
    visualObject(chunk, ['imageHash', 'offset', 'totalBytes', 'base64', 'sha256']);
    if (typeof chunk.imageHash !== 'string' || !visualHash.test(chunk.imageHash) || !Number.isInteger(chunk.offset) || chunk.offset < 0 || chunk.offset % VISUAL_CHUNK_BYTES || !Number.isInteger(chunk.totalBytes) || chunk.totalBytes < 1 || chunk.totalBytes > 32 * 1024 * 1024 || chunk.offset >= chunk.totalBytes || typeof chunk.base64 !== 'string' || chunk.base64.length > 87384 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(chunk.base64) || typeof chunk.sha256 !== 'string' || !visualRevision.test(chunk.sha256)) throw new Error('Invalid visual source chunk.');
    if (atob(chunk.base64).length !== Math.min(VISUAL_CHUNK_BYTES, chunk.totalBytes - chunk.offset)) throw new Error('Visual chunk length does not match its declared byte range.');
    const key = chunk.imageHash + ':' + chunk.offset;
    if (seen.has(key)) throw new Error('Duplicate visual packet chunk.');
    seen.add(key);
  }
  for (const entry of packet.unavailable) {
    visualObject(entry, ['nodeId', 'field', 'index', 'imageHash', 'offset', 'reason']);
    const { reason, ...slot } = entry;
    validateVisualAssetRequest({ format: 'dfc-bridge-visual-request', schemaVersion: 1, snapshotRevision: packet.snapshotRevision, kind: 'page', slots: [slot] });
    if (typeof reason !== 'string' || !reason.trim() || reason.length > 2400 || seen.has(entry.imageHash + ':' + entry.offset)) throw new Error('Invalid unavailable visual source.');
    seen.add(entry.imageHash + ':' + entry.offset);
  }
  return packet;
}
