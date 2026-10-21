import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseHandoff, sealHandoff, canonicalHandoffJSON, validateHandoff } from '../validator/handoff.mjs';
const text = await readFile(new URL('../validator/examples/handoff.valid.json', import.meta.url), 'utf8');

test('synthetic handoff fixture validates, verifies its revision and seals deterministically', async () => {
  const snapshot = await parseHandoff(text);
  assert.equal(snapshot.source.fileKey, 'SyntheticFile');
  assert.equal(canonicalHandoffJSON(await sealHandoff(snapshot)), canonicalHandoffJSON(snapshot));
  assert.equal(snapshot.scope.completeness, 'full');
  assert.equal(snapshot.coverage.runtime, 'not-checked');
});

test('unsupported format/schema, tampering, unsafe keys and non-JSON data fail closed', async () => {
  const snapshot = JSON.parse(text);
  for (const changed of [{ ...snapshot, schemaVersion: 2 }, { ...snapshot, format: 'foreign' }]) assert.throws(() => validateHandoff(changed));
  snapshot.nodes[0].name += ' changed';
  await assert.rejects(parseHandoff(JSON.stringify(snapshot)), /revision/);
  const unsafe = JSON.parse(text); unsafe.nodes[0].native = JSON.parse('{"__proto__":{}}');
  assert.throws(() => validateHandoff(unsafe), /Unsafe/);
  const nonJSON = JSON.parse(text); nonJSON.nodes[0].native.fills = new Array(2);
  assert.throws(() => validateHandoff(nonJSON), /plain JSON/);
  const cyclic = {}; cyclic.child = cyclic;
  assert.throws(() => validateHandoff(cyclic), /depth/);
});
