import validate from './handoff-validator.mjs';
import { sha256 } from './handoff-sha256.mjs';

export const MAX_HANDOFF_BYTES = 2 * 1024 * 1024;

export function canonicalHandoffJSON(value) {
  if (Array.isArray(value)) return '[' + value.map(canonicalHandoffJSON).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonicalHandoffJSON(value[key])).join(',') + '}';
  return JSON.stringify(value);
}

// Iterative limits run before schema recursion, hashing or graph hydration.
export function validateHandoff(input) {
  const stack = [{ value: input, depth: 0 }];
  let values = 0;
  let characters = 0;
  while (stack.length) {
    const { value, depth } = stack.pop();
    if (typeof value === 'string') characters += value.length;
    if (characters > MAX_HANDOFF_BYTES) throw new Error('Snapshot exceeds 2 MiB.');
    if (++values > 200000 || depth > 64) throw new Error('Snapshot exceeds supported depth or value count.');
    if (value && typeof value === 'object') {
      if (Array.isArray(value) ? Object.keys(value).length !== value.length : ![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new Error('Snapshot must contain plain JSON data only.');
      for (const key of Object.keys(value)) {
        if (['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error('Unsafe snapshot key.');
        characters += key.length;
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        if (!('value' in descriptor)) throw new Error('Snapshot must contain plain JSON data, not accessors.');
        stack.push({ value: descriptor.value, depth: depth + 1 });
      }
    } else if ((!['string', 'number', 'boolean'].includes(typeof value) && value !== null) || (typeof value === 'number' && !Number.isFinite(value))) {
      throw new Error('Snapshot must contain finite JSON data only.');
    }
  }
  if (!validate(input)) throw new Error('Invalid DFC Bridge handoff: ' + (validate.errors?.[0]?.instancePath || '/') + ' ' + (validate.errors?.[0]?.message || 'schema mismatch'));
  if (new TextEncoder().encode(canonicalHandoffJSON(input)).length > MAX_HANDOFF_BYTES) throw new Error('Snapshot exceeds 2 MiB; export a smaller selected section.');
  if (input.nodes.length + input.dependencies.length > 10000) throw new Error('Snapshot exceeds 10000 native nodes including dependencies.');
  const byId = new Map();
  for (const node of [...input.nodes, ...input.dependencies]) {
    if (byId.has(node.id)) throw new Error('Duplicate native node ID: ' + node.id);
    byId.set(node.id, node);
  }
  const mainIds = new Set(input.nodes.map(node => node.id));
  for (const id of input.scope.rootIds) {
    if (!mainIds.has(id)) throw new Error('Unknown scope root: ' + id);
    if (byId.get(id).figmaPageId !== input.source.figmaPageId) throw new Error('Scope root belongs to a different Figma page: ' + id);
  }
  const childOwners = new Map();
  for (const node of byId.values()) {
    if (!node.supportsChildren && node.children.length) throw new Error('Leaf node cannot own children: ' + node.id);
    if (node.mainComponentId && !byId.has(node.mainComponentId)) throw new Error('Unknown main component: ' + node.mainComponentId);
    for (const id of node.children) {
      const child = byId.get(id);
      if (!child || child.parentId !== node.id || childOwners.has(id)) throw new Error('Invalid child/parent ownership: ' + id);
      childOwners.set(id, node.id);
    }
    if (node.parentId && !byId.has(node.parentId)) throw new Error('Unknown parent: ' + node.parentId);
    if (node.mainComponentId && byId.get(node.mainComponentId).type !== 'COMPONENT') throw new Error('Main component reference must target a COMPONENT.');
  }
  for (const node of input.nodes) {
    if (node.parentId && childOwners.get(node.id) !== node.parentId) throw new Error('Missing root/parent ownership: ' + node.id);
  }
  if (input.preflight.mode !== input.scope.kind || input.preflight.scope !== (input.scope.kind === 'section' ? 'selection' : 'page')) throw new Error('Preflight scope does not match the snapshot.');
  const depths = new Map();
  for (const node of byId.values()) {
    let ancestor = node;
    const seen = new Set();
    while (ancestor && !depths.has(ancestor.id)) {
      if (seen.has(ancestor.id)) throw new Error('Cyclic snapshot tree.');
      seen.add(ancestor.id);
      ancestor = ancestor.parentId ? byId.get(ancestor.parentId) : null;
    }
    let depth = ancestor ? depths.get(ancestor.id) : 0;
    for (const id of [...seen].reverse()) {
      if (++depth > 256) throw new Error('Snapshot ancestry exceeds 256 nodes.');
      depths.set(id, depth);
    }
  }
  const reached = new Set();
  const queue = [...input.scope.rootIds];
  while (queue.length) {
    const id = queue.pop();
    if (reached.has(id)) throw new Error('Overlapping snapshot roots.');
    reached.add(id);
    queue.push(...byId.get(id).children);
  }
  if (reached.size !== input.nodes.length || [...reached].some(id => !mainIds.has(id))) throw new Error('Snapshot contains nodes outside the declared scope.');
  return input;
}

export async function handoffRevision(input) {
  const { revision, ...facts } = input;
  const bytes = new TextEncoder().encode(canonicalHandoffJSON(facts));
  // Figma Desktop's plugin iframe does not expose SubtleCrypto. Both paths
  // hash the same canonical UTF-8 bytes; the bundled fallback needs no network.
  const digest = globalThis.crypto?.subtle
    ? await globalThis.crypto.subtle.digest('SHA-256', bytes)
    : sha256(bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function sealHandoff(input) {
  const candidate = validateHandoff({ ...input, revision: '0'.repeat(64) });
  const sealed = JSON.parse(canonicalHandoffJSON(candidate));
  sealed.revision = await handoffRevision(sealed);
  return sealed;
}

export async function parseHandoff(text) {
  if (typeof text !== 'string' || new TextEncoder().encode(text).length > MAX_HANDOFF_BYTES) throw new Error('Snapshot exceeds 2 MiB.');
  const input = validateHandoff(JSON.parse(text.replace(/^\uFEFF/u, '')));
  if (input.revision !== await handoffRevision(input)) throw new Error('Snapshot revision does not match its facts.');
  return input;
}
