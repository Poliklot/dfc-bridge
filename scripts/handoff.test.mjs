import { createHash } from 'node:crypto';
import { sha256 } from '../validator/handoff-sha256.mjs';
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


test('portable SHA-256 matches native digest vectors and verifies snapshots without WebCrypto', async () => {
  for (const value of ['', 'abc', 'Снимок · 快照', 'x'.repeat(10000)]) {
    assert.equal(Buffer.from(sha256(new TextEncoder().encode(value))).toString('hex'), createHash('sha256').update(value).digest('hex'));
  }
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
  try {
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: undefined });
    const snapshot = await parseHandoff(text);
    assert.equal((await sealHandoff(snapshot)).revision, snapshot.revision);
  } finally { Object.defineProperty(globalThis, 'crypto', descriptor); }
});

test('schema v2 inspection is separate from structural nodes, bounded and revision-protected', async () => {
  const text = await readFile(new URL('../validator/examples/handoff-components.valid.json', import.meta.url), 'utf8');
  const saved = await parseHandoff(text);
  assert.equal(saved.schemaVersion, 2);
  assert.equal(saved.componentInspection.families[0].variants.length, 2);
  assert.equal(saved.nodes.find(node => node.type === 'INSTANCE').children.length, 0);
  const legacy = JSON.parse(text); legacy.schemaVersion = 1;
  assert.throws(() => validateHandoff(legacy), /Invalid/);
  const duplicate = JSON.parse(text);
  duplicate.componentInspection.families.push(duplicate.componentInspection.families[0]);
  assert.throws(() => validateHandoff(duplicate), /Duplicate/);
  const badPath = JSON.parse(text);
  badPath.componentInspection.families[0].variants[0].nodes[1].path = '/5/0';
  assert.throws(() => validateHandoff(badPath), /parent path/);
  const changed = JSON.parse(text);
  changed.componentInspection.families[0].variants[0].nodes[0].native.strokes = [{ type: 'SOLID' }];
  await assert.rejects(parseHandoff(JSON.stringify(changed)), /revision/);
  const unknownFamily = JSON.parse(text);
  unknownFamily.componentInspection.instances[0].familyId = '999:999';
  assert.throws(() => validateHandoff(unknownFamily), /Unknown inspected family/);
});
