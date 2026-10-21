import validate from './content-bindings-validator.mjs';

export const MAX_CONTENT_BINDING_BYTES = 64 * 1024;
export function parseContentBindings(text, revision) {
  if (typeof text !== 'string' || new TextEncoder().encode(text).length > MAX_CONTENT_BINDING_BYTES) throw new Error('Content bindings exceed 64 KiB.');
  const data = JSON.parse(text.replace(/^\uFEFF/u, ''));
  const stack = [{ value: data, depth: 0 }];
  let count = 0;
  while (stack.length) {
    const { value, depth } = stack.pop();
    if (depth > 12 || ++count > 20000) throw new Error('Content binding depth/value limit exceeded.');
    if (value && typeof value === 'object') for (const key of Object.keys(value)) {
      if (['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error('Unsafe content binding key.');
      stack.push({ value: value[key], depth: depth + 1 });
    }
  }
  if (!validate(data)) throw new Error('Invalid content bindings: ' + (validate.errors?.[0]?.instancePath || '/') + ' ' + (validate.errors?.[0]?.message || 'schema mismatch'));
  if (data.snapshotRevision !== revision) throw new Error('Content bindings reference a different snapshot revision; review and rebind explicitly.');
  const groups = new Set();
  for (const group of data.groups) {
    if (groups.has(group.key)) throw new Error('Duplicate content key.');
    groups.add(group.key);
    const contexts = new Set(), kinds = new Map();
    for (const source of group.sources) {
      if (contexts.has(source.contextId)) throw new Error('Duplicate content context.');
      contexts.add(source.contextId);
      const slots = new Set(), exceptions = new Set();
      for (const slot of source.slots) {
        if (slots.has(slot.key)) throw new Error('Duplicate content slot.');
        slots.add(slot.key);
        if (kinds.has(slot.key) && kinds.get(slot.key) !== slot.kind) throw new Error('Incompatible content slot kinds.');
        kinds.set(slot.key, slot.kind);
      }
      for (const exception of source.exceptions || []) {
        if (!slots.has(exception.slotKey) || exceptions.has(exception.slotKey) || !exception.reason.trim()) throw new Error('Content exceptions need one bound slot and a non-empty reason.');
        exceptions.add(exception.slotKey);
      }
    }
  }
  return data;
}
