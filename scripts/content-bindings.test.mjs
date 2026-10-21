import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseContentBindings } from '../validator/content-bindings.mjs';
const fixture = await readFile(new URL('../validator/examples/content-bindings.valid.json', import.meta.url), 'utf8');
const snapshot = JSON.parse(await readFile(new URL('../validator/examples/handoff-components.valid.json', import.meta.url), 'utf8'));

test('synthetic bindings pin the exact saved revision and explicit instance/slot/context', () => {
  const bindings = parseContentBindings(fixture, snapshot.revision);
  assert.equal(bindings.groups[0].sources.length, 2);
  for (const source of bindings.groups[0].sources) assert.ok(snapshot.nodes.some(node => node.id === source.instanceId && node.type === 'INSTANCE'));
});

test('revision mismatch, duplicate contexts, unsafe keys, empty reasons and large bindings fail closed', () => {
  assert.throws(() => parseContentBindings(fixture, '0'.repeat(64)), /revision/);
  const duplicate = JSON.parse(fixture); duplicate.groups[0].sources.push(duplicate.groups[0].sources[0]);
  assert.throws(() => parseContentBindings(JSON.stringify(duplicate), snapshot.revision), /Duplicate/);
  assert.throws(() => parseContentBindings('{"__proto__":{}}', snapshot.revision), /Unsafe/);
  assert.throws(() => parseContentBindings(' '.repeat(65537), snapshot.revision), /64 KiB/);
  const invalid = JSON.parse(fixture); invalid.groups[0].sources[0].exceptions = [{ slotKey: 'label', reason: ' ' }];
  assert.throws(() => parseContentBindings(JSON.stringify(invalid), snapshot.revision), /reason/);
});
