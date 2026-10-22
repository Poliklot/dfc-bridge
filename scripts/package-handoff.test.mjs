import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  parseHandoff,
  validateHandoff,
  sealHandoff
} from '../validator/handoff.mjs';
const text = await readFile(
  new URL('../validator/examples/handoff-package.valid.json', import.meta.url),
  'utf8'
);
test('v4 synthetic section package resolves ordinary-node bindings and exact native aliases without changing structural boundaries', async () => {
  const snapshot = await parseHandoff(text);
  assert.equal(snapshot.schemaVersion, 4);
  assert.equal(snapshot.scope.kind, 'section');
  assert.equal((await sealHandoff(snapshot)).revision, snapshot.revision);
  const binding = snapshot.sourceBindings.find((node) => node.id === '21:3');
  assert.equal(binding.styles.length, 2);
  assert.equal(binding.variables[0].path, 'fills/0/boundVariables/color');
  assert.equal(binding.variables[0].resolved.value.r, 0.2);
  const old = structuredClone(snapshot);
  old.schemaVersion = 3;
  assert.throws(() => validateHandoff(old), /Invalid/);
  const missing = structuredClone(snapshot);
  missing.sourceBindings.pop();
  assert.throws(() => validateHandoff(missing), /coverage/);
  const unsafe = structuredClone(snapshot);
  unsafe.sourceBindings.find(
    (node) => node.variables.length
  ).variables[0].path = '__proto__/constructor';
  assert.throws(() => validateHandoff(unsafe), /variable differs/);
});
