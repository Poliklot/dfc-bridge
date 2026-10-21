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
  let inspected = 0;
  const familyIds = new Set();
  const inspectionVariantIds = new Set();
  for (const family of input.componentInspection?.families || []) {
    if (familyIds.has(family.id)) throw new Error('Duplicate component family.');
    familyIds.add(family.id);
    const variantIds = new Set();
    for (const variant of family.variants) {
      if (variantIds.has(variant.id) || inspectionVariantIds.has(variant.id)) throw new Error('Duplicate component variant.');
      variantIds.add(variant.id);
      inspectionVariantIds.add(variant.id);
      const paths = new Set(), ids = new Set();
      for (const node of variant.nodes) {
        if (paths.has(node.path) || ids.has(node.id)) throw new Error('Duplicate inspection node/path.');
        if (!/^(?:\/(?:0|[1-9][0-9]*))*$/u.test(node.path)) throw new Error('Invalid inspection child-index path.');
        paths.add(node.path); ids.add(node.id);
        const parentPath = node.path.slice(0, node.path.lastIndexOf('/'));
        if (node.path && !paths.has(parentPath)) throw new Error('Missing inspection parent path.');
      }
      if (!variant.nodes.length || variant.nodes[0].id !== variant.id || variant.nodes[0].path !== '') throw new Error('Missing inspection variant root.');
      inspected += variant.nodes.length;
    }
  }
  const inspectedInstances = new Set();
  for (const item of input.componentInspection?.instances || []) {
    if (inspectedInstances.has(item.node.id) || item.node.type !== 'INSTANCE') throw new Error('Duplicate or invalid inspected instance.');
    inspectedInstances.add(item.node.id);
    if (item.familyId && !familyIds.has(item.familyId)) throw new Error('Unknown inspected family.');
    inspected++;
  }
  if (input.nodes.length + input.dependencies.length + inspected > 10000) throw new Error('Snapshot exceeds 10000 native records including component inspection.');
  const byId = new Map();
  for (const node of [...input.nodes, ...input.dependencies]) {
    if (byId.has(node.id)) throw new Error('Duplicate native node ID: ' + node.id);
    byId.set(node.id, node);
  }
  const visual = input.visualInspection;
  if (visual) {
    if (input.nodes.length + input.dependencies.length + inspected + visual.nodes.length > 10000) throw new Error('Snapshot exceeds 10000 native records including visual inspection.');
    const visualNodes = new Map(), hashes = new Set();
    for (const node of visual.nodes) {
      if (visualNodes.has(node.id)) throw new Error('Duplicate visual node.');
      visualNodes.set(node.id, node);
    }
    for (const node of visual.nodes) {
      if (!input.scope.rootIds.includes(node.rootId)) throw new Error('Unknown visual root.');
      if (node.id === node.rootId) {
        if (node.parentId !== null) throw new Error('Visual root must have no inspection parent.');
      } else {
        const parent = visualNodes.get(node.parentId);
        if (!parent || parent.rootId !== node.rootId) throw new Error('Unknown visual parent.');
      }
      const childIds = new Set();
      for (const [index, id] of node.children.entries()) {
        const child = visualNodes.get(id);
        if (childIds.has(id) || !child || child.parentId !== node.id || child.childIndex !== index) throw new Error('Invalid visual child ownership or compositing order.');
        childIds.add(id);
      }
      if (node.parentId && visualNodes.get(node.parentId).children[node.childIndex] !== node.id) throw new Error('Missing visual child ownership.');
      const structural = byId.get(node.id);
      if (structural && canonicalHandoffJSON(structural.native) !== canonicalHandoffJSON(node.native)) throw new Error('Visual facts differ from the structural source.');
      let ancestor = node, seen = new Set();
      while (ancestor.parentId) {
        if (seen.has(ancestor.id) || seen.size > 256) throw new Error('Cyclic or excessive visual ancestry.');
        seen.add(ancestor.id); ancestor = visualNodes.get(ancestor.parentId);
        if (!ancestor) throw new Error('Unknown visual ancestor.');
      }
      if (ancestor.id !== node.rootId) throw new Error('Visual node is outside its declared root.');
      for (const field of ['fills', 'strokes']) for (const paint of node.native[field] || []) {
        if (paint?.type === 'IMAGE' && typeof paint.imageHash === 'string' && /^[a-f0-9]{40}$/u.test(paint.imageHash)) hashes.add(paint.imageHash);
      }
    }
    for (const rootId of input.scope.rootIds) if (!visualNodes.has(rootId)) throw new Error('Missing visual root.');
    for (const source of input.nodes) {
      const node = visualNodes.get(source.id);
      if (!node || (!input.scope.rootIds.includes(source.id) && node.parentId !== source.parentId)) throw new Error('Visual inspection is missing a structural source node or parent.');
    }
    const imageHashes = new Set();
    for (const image of visual.images) {
      if (imageHashes.has(image.imageHash) || !hashes.has(image.imageHash)) throw new Error('Duplicate or unreferenced visual image.');
      if ((image.width === null) !== (image.height === null)) throw new Error('Image dimensions must be available together.');
      if ((image.width === null || image.height === null) !== (image.reason !== null)) throw new Error('Unavailable image dimensions need an explicit reason.');
      imageHashes.add(image.imageHash);
    }
    if (hashes.size !== imageHashes.size) throw new Error('Missing visual image metadata.');
  }
  for (const item of input.componentInspection?.instances || []) {
    const source = byId.get(item.node.id);
    if (!source || source.type !== 'INSTANCE' || source.mainComponentId !== item.mainComponentId) throw new Error('Inspected instance does not match structural source.');
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
