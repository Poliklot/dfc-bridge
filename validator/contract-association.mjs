import validateBridge, { bridgeSchema, supportedVersions } from './bridge-validator.mjs';
import validateAssociation from './contract-association-validator.mjs';
import { canonicalHandoffJSON, parseHandoff, MAX_HANDOFF_BYTES } from './handoff.mjs';
import { sha256 } from './handoff-sha256.mjs';

export const MAX_CONTRACT_ASSOCIATION_BYTES = MAX_HANDOFF_BYTES;
const encoder = new TextEncoder();
const escapePointer = value => String(value).replaceAll('~', '~0').replaceAll('/', '~1');
const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
function pointer(link) {
  const parts = [];
  while (link && typeof link === 'object') { parts.push(escapePointer(link.key)); link = link.parent; }
  return (link || '') + (parts.length ? '/' + parts.reverse().join('/') : '');
}

const hex = bytes => Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
const hash = value => hex(sha256(encoder.encode(canonicalHandoffJSON(value))));
const same = (a, b) => canonicalHandoffJSON(a) === canonicalHandoffJSON(b);

export class ContractAssociationError extends Error {
  constructor(code, path, message, status = 'invalid') {
    super(message);
    this.name = 'ContractAssociationError';
    this.code = code;
    this.path = path;
    this.status = status;
  }
}
const fail = (code, path, message, status) => { throw new ContractAssociationError(code, path, message, status); };

// Limits precede recursive schema validation/canonicalization. Inspect own data
// descriptors instead of reading untrusted accessors. Arrays cannot hide extra
// properties, and cycles fail without trying JSON.stringify on them.
function readJSON(input, path) {
  let value = input;
  if (typeof input === 'string') {
    if (encoder.encode(input).length > MAX_CONTRACT_ASSOCIATION_BYTES) fail('input-limit', path, 'Input exceeds 2 MiB UTF-8.');
    try { value = JSON.parse(input.replace(/^\uFEFF/u, '')); }
    catch { fail('invalid-json', path, 'Input is not valid JSON.'); }
  }
  const stack = [{ value, path, depth: 0 }], active = new WeakSet();
  let count = 0, characters = 0;
  while (stack.length) {
    const entry = stack.pop(), item = entry.value;
    if (entry.exit) { active.delete(item); continue; }
    if (++count > 200000 || entry.depth > 64) fail('input-limit', path, 'Input exceeds supported depth or value count.');
    if (item && typeof item === 'object') {
      if (active.has(item)) fail('unsafe-json', pointer(entry.path), 'JSON input cannot contain cycles.');
      if (Array.isArray(item) ? Object.getPrototypeOf(item) !== Array.prototype : ![Object.prototype, null].includes(Object.getPrototypeOf(item))) fail('unsafe-json', pointer(entry.path), 'Input must contain plain JSON data.');
      active.add(item); stack.push({ value: item, exit: true });
      const keys = Reflect.ownKeys(item), array = Array.isArray(item);
      if (array && keys.length !== item.length + 1) fail('unsafe-json', pointer(entry.path), 'JSON arrays must be dense and have no extra properties.');
      for (const key of keys) {
        if (array && key === 'length') continue;
        if (typeof key !== 'string' || ['__proto__', 'constructor', 'prototype'].includes(key)) fail('unsafe-json', pointer(entry.path), 'Unsafe JSON key.');
        const descriptor = Object.getOwnPropertyDescriptor(item, key);
        if (!descriptor || !('value' in descriptor) || !descriptor.enumerable) fail('unsafe-json', pointer(entry.path), 'Input must contain enumerable data, not accessors.');
        if (array && (!/^(0|[1-9][0-9]*)$/u.test(key) || Number(key) >= item.length)) fail('unsafe-json', pointer(entry.path), 'JSON arrays cannot have properties outside their dense index range.');
        characters += key.length;
        stack.push({ value: descriptor.value, path: { parent: entry.path, key }, depth: entry.depth + 1 });
      }
    } else if (typeof item === 'string') characters += item.length;
    else if (item !== null && (!['number', 'boolean'].includes(typeof item) || (typeof item === 'number' && !Number.isFinite(item)))) fail('unsafe-json', pointer(entry.path), 'Input must contain finite JSON data.');
    if (characters > MAX_CONTRACT_ASSOCIATION_BYTES) fail('input-limit', path, 'Input exceeds 2 MiB.');
  }
  const text = canonicalHandoffJSON(value);
  if (encoder.encode(text).length > MAX_CONTRACT_ASSOCIATION_BYTES) fail('input-limit', path, 'Input exceeds 2 MiB UTF-8.');
  return JSON.parse(text);
}

function schemaCheck(validate, value, path, code) {
  if (validate(value)) return;
  const error = validate.errors?.[0];
  fail(code, path + (error?.instancePath || ''), `Schema validation failed: ${error?.message || 'unsupported shape'}.`);
}
function contractInput(input) {
  const contract = readJSON(input, '');
  schemaCheck(validateBridge, contract, '', 'invalid-contract');
  for (const [field, version] of Object.entries(supportedVersions)) {
    if (contract.bridge[field] !== version) fail('unsupported-version', `/bridge/${field}`, 'Use a validator matching the pinned contract, methodology and rules versions.');
  }
  return contract;
}
async function snapshotInput(input) {
  const value = readJSON(input, '/snapshot');
  try { return await parseHandoff(canonicalHandoffJSON(value)); }
  catch (error) { fail('invalid-snapshot', '/snapshot', error.message); }
}
function associationInput(input) {
  const value = readJSON(input, '/association');
  schemaCheck(validateAssociation, value, '/association', 'invalid-association');
  return value;
}
function budget(value) {
  if (encoder.encode(canonicalHandoffJSON(value)).length > MAX_CONTRACT_ASSOCIATION_BYTES) fail('report-limit', '/', 'Contract association report exceeds 2 MiB; use a smaller declared scope.');
  return value;
}
function unique(items, key, path) {
  const map = new Map();
  for (const [index, item] of items.entries()) {
    const id = typeof item === 'string' ? item : item[key];
    if (map.has(id)) fail('duplicate-id', `${path}/${index}${typeof item === 'string' ? '' : `/${key}`}`, 'Duplicate identifier in its declared namespace.');
    map.set(id, item);
  }
  return map;
}
function requireRef(map, value, path) {
  if (!map.has(value)) fail('unknown-reference', path, 'Reference is not declared in the attached contract scope.');
}
function listRefs(map, values, path) {
  for (const [index, value] of (values || []).entries()) requireRef(map, value, `${path}/${index}`);
}

function validateOwner(owner, path) {
  if (typeof owner === 'string' ? !owner.trim() : !owner.role.trim()) fail('empty-owner', path, 'Owner and accountable role cannot be whitespace.');
}

function semanticContract(contract) {
  const b = contract.bridge;
  if (!b.lifecycle) fail('missing-lifecycle', '/bridge/lifecycle', 'Association requires an authored lifecycle and contractRevision.');
  if (!b.lifecycle.contractRevision.trim()) fail('empty-contract-revision', '/bridge/lifecycle/contractRevision', 'Contract revision cannot be whitespace.');
  if (Array.isArray(b.lifecycle.owners)) b.lifecycle.owners.forEach((owner, i) => validateOwner(owner, `/bridge/lifecycle/owners/${i}`));
  else for (const [role, owner] of Object.entries(b.lifecycle.owners)) {
    if (!role.trim()) fail('empty-owner-role', '/bridge/lifecycle/owners', 'Lifecycle owner role cannot be whitespace.');
    validateOwner(owner, `/bridge/lifecycle/owners/${escapePointer(role)}`);
  }
  if (!b.structure) fail('missing-contexts', '/bridge/structure', 'Association requires declared structure contexts, not inferred frame widths.');
  const identities = unique(b.identity.elements, 'bridgeKey', '/bridge/identity/elements');
  unique(b.identity.elements.map(element => element.designInstance), 'designInstanceKey', '/bridge/identity/elements');
  const contexts = unique(b.structure.contexts, 'id', '/bridge/structure/contexts');
  const requirements = unique(b.lifecycle.requirements, 'id', '/bridge/lifecycle/requirements');
  const questions = unique(b.openQuestions || [], 'id', '/bridge/openQuestions');
  const external = unique(b.context.externalDependencies || [], 'id', '/bridge/context/externalDependencies');
  (b.context.externalDependencies || []).forEach((entry, i) => validateOwner(entry.owner, `/bridge/context/externalDependencies/${i}/owner`));
  const machines = unique(b.interaction?.stateMachines || [], 'id', '/bridge/interaction/stateMachines');
  const transforms = unique(b.responsive?.transformations || [], 'id', '/bridge/responsive/transformations');
  const scopes = new Set([...identities.keys(), ...contexts.keys(), ...requirements.keys(), ...machines.keys(), ...external.keys()]);
  // Namespaces remain distinct: a question can refer to an identity with the
  // same human label as a component. A missing reference is never fuzzy-matched.
  for (const [i, context] of b.structure.contexts.entries()) {
    const path = `/bridge/structure/contexts/${i}`;
    requireRef(identities, context.rootIdentity, path + '/rootIdentity');
    const seen = new Set();
    const stack = [{ value: context.tree, path: path + '/tree' }];
    while (stack.length) {
      const { value, path: nodePath } = stack.pop();
      if (typeof value === 'string') {
        requireRef(identities, value, nodePath);
        if (seen.has(value)) fail('duplicate-tree-identity', nodePath, 'An identity occurs more than once in a context tree.');
        seen.add(value);
      } else if (typeof value.identity === 'string') {
        requireRef(identities, value.identity, nodePath + '/identity');
        if (seen.has(value.identity)) fail('duplicate-tree-identity', nodePath, 'An identity occurs more than once in a context tree.');
        seen.add(value.identity);
        (value.children || []).forEach((child, index) => stack.push({ value: child, path: `${nodePath}/children/${index}` }));
      } else {
        const adjacency = new Map(Object.entries(value)), parentOf = new Map();
        for (const [parent, children] of adjacency) {
          requireRef(identities, parent, nodePath);
          for (const child of children) {
            requireRef(identities, child, nodePath);
            if (parentOf.has(child)) fail('ambiguous-tree-parent', nodePath, 'Tree-map child has duplicate or multiple parents.');
            parentOf.set(child, parent);
          }
        }
        const candidates = [...adjacency.keys()].filter(id => !parentOf.has(id));
        if (candidates.length !== 1 || (nodePath === path + '/tree' && candidates[0] !== context.rootIdentity)) fail('context-root-mismatch', nodePath, 'Tree map must have one root matching the declared root at the context boundary.');
        const visited = new Set(), pending = [candidates[0]];
        while (pending.length) {
          const id = pending.pop();
          if (visited.has(id)) fail('cyclic-tree', nodePath, 'Tree map contains a cycle.');
          visited.add(id);
          if (seen.has(id)) fail('duplicate-tree-identity', nodePath, 'An identity occurs more than once in a context tree.');
          seen.add(id);
          pending.push(...(adjacency.get(id) || []));
        }
        if ([...adjacency.keys(), ...parentOf.keys()].some(id => !visited.has(id))) fail('disconnected-tree', nodePath, 'Tree map contains disconnected or cyclic identities outside the declared root.');

      }
    }
    const treeRoot = typeof context.tree === 'string' ? context.tree : (typeof context.tree.identity === 'string' ? context.tree.identity : undefined);
    if (treeRoot !== undefined && treeRoot !== context.rootIdentity) fail('context-root-mismatch', path + '/tree', 'Context tree root differs from rootIdentity.');
  }
  for (const [i, element] of b.identity.elements.entries()) {
    const seen = new Set();
    for (const [j, node] of element.designInstance.sourceNodes.entries()) {
      const path = `/bridge/identity/elements/${i}/designInstance/sourceNodes/${j}`;
      requireRef(contexts, node.contextId, path + '/contextId');
      const pair = `${node.contextId}\u0000${node.nodeId}`;
      if (seen.has(pair)) fail('duplicate-source-node', path, 'Repeated native node/context binding.');
      seen.add(pair);
    }
  }
  if (b.context.scope) {
    requireRef(identities, b.context.scope.rootIdentity, '/bridge/context/scope/rootIdentity');
    listRefs(contexts, b.context.scope.contextIds, '/bridge/context/scope/contextIds');
  }
  const responsiveContexts = unique(b.responsive?.contexts || [], 'id', '/bridge/responsive/contexts');
  for (const [i, entry] of (b.responsive?.contexts || []).entries()) requireRef(contexts, entry.id, `/bridge/responsive/contexts/${i}/id`);
  for (const [i, entry] of (b.responsive?.transformations || []).entries()) {
    const path = `/bridge/responsive/transformations/${i}`;
    requireRef(responsiveContexts, entry.fromContext, path + '/fromContext');
    requireRef(responsiveContexts, entry.toContext, path + '/toContext');
    if (entry.when.container) requireRef(identities, entry.when.container, path + '/when/container');
    entry.mappings.forEach((mapping, j) => { listRefs(identities, mapping.source, `${path}/mappings/${j}/source`); listRefs(identities, mapping.target, `${path}/mappings/${j}/target`); });
    listRefs(identities, entry.focusOrder, path + '/focusOrder'); listRefs(identities, entry.readingOrder, path + '/readingOrder');
  }
  for (const [i, machine] of (b.interaction?.stateMachines || []).entries()) {
    const path = `/bridge/interaction/stateMachines/${i}`, states = new Set(machine.states);
    requireRef(states, machine.initial, path + '/initial');
    if (machine.scope) requireRef(scopes, machine.scope, path + '/scope');
    unique(machine.transitions, 'id', path + '/transitions');
    machine.transitions.forEach((transition, j) => {
      const prefix = `${path}/transitions/${j}`;
      listRefs(states, typeof transition.from === 'string' ? [transition.from] : transition.from, prefix + '/from');
      if (transition.to) requireRef(states, transition.to, prefix + '/to');
      if (typeof transition.event === 'object') requireRef(scopes, transition.event.source, prefix + '/event/source');
      // Open extensionObject transition bodies are preserved but not executed
      // or interpreted as a complete state-machine/runtime proof here.
    });
  }
  for (const [i, entry] of (b.openQuestions || []).entries()) {
    const path = `/bridge/openQuestions/${i}`;
    if (entry.scopeRef) requireRef(scopes, entry.scopeRef, path + '/scopeRef');
    if (entry.scope) {
      if (!entry.scope.length) fail('empty-question-scope', path + '/scope', 'Question scope must name at least one declared owner or context.');
      listRefs(scopes, entry.scope, path + '/scope');
    }
    validateOwner(entry.owner, path + '/owner');
    if (!entry.question.trim() || !entry.fallback.trim()) fail('empty-question', path, 'Question and fallback cannot be whitespace.');
    if (entry.reviewAt !== undefined && !entry.reviewAt.trim()) fail('empty-review-gate', path + '/reviewAt', 'Review gate cannot be whitespace.');
    if (entry.decisionLink !== undefined && (!entry.decisionLink.trim() || /^(?:javascript|data|vbscript):/iu.test(entry.decisionLink.trim()) || /[\u0000-\u001f]/u.test(entry.decisionLink))) fail('unsafe-decision-link', path + '/decisionLink', 'Decision link is empty or uses an unsafe URI.');
  }
  for (const [name, entries] of [['exceptions', b.exceptions || []], ['lifecycle/deviations', b.lifecycle.deviations]]) {
    unique(entries, 'id', '/bridge/' + name);
    entries.forEach((entry, i) => { validateOwner(entry.owner, `/bridge/${name}/${i}/owner`); requireRef(requirements, entry.requirement, `/bridge/${name}/${i}/requirement`); listRefs(scopes, entry.scope, `/bridge/${name}/${i}/scope`); });
  }
  const a11y = b.accessibility?.elements || [];
  unique(a11y, 'element', '/bridge/accessibility/elements');
  a11y.forEach((entry, i) => requireRef(identities, entry.element, `/bridge/accessibility/elements/${i}/element`));
  unique(b.data?.displays || [], 'displayId', '/bridge/data/displays');
  (b.data?.displays || []).forEach((entry, i) => requireRef(identities, entry.displayId, `/bridge/data/displays/${i}/displayId`));
  unique(b.motion?.sequences || [], 'sequenceId', '/bridge/motion/sequences');
  unique(b.capabilities?.profiles || [], 'id', '/bridge/capabilities/profiles');
  (b.capabilities?.profiles || []).forEach((entry, i) => {
    listRefs(scopes, entry.essentialExperience, `/bridge/capabilities/profiles/${i}/essentialExperience`);
    (entry.assets || []).forEach((asset, j) => requireRef(identities, asset.element, `/bridge/capabilities/profiles/${i}/assets/${j}/element`));
  });
  return { identities, contexts, questions, external, requirements, transforms };
}

// Collect unknown fields at schema-declared record boundaries. Deliberately
// open extensionObject/map values remain authored data, not inferred behavior.
function unknownExtensions(contract) {
  const paths = [], stack = [{ value: contract, schema: bridgeSchema, path: '' }];
  let charged = 0;
  const resolve = schema => {
    const seen = new Set();
    while (schema?.$ref?.startsWith('#/$defs/')) {
      if (seen.has(schema.$ref)) fail('invalid-schema-reference', '/', 'Cyclic local schema alias cannot be inspected.');
      seen.add(schema.$ref);
      schema = bridgeSchema.$defs[schema.$ref.slice(8)];
      if (!schema) fail('invalid-schema-reference', '/', 'Local schema alias is unavailable.');
    }
    return schema;
  };
  // The entire input already passed Ajv. Only distinguish the valid union
  // shapes here; in particular treeMap may legally use the key "identity".
  const typeMatches = (schema, value) => {
    schema = resolve(schema);
    if (!schema) return true;
    if (schema.type === 'object' && (!value || typeof value !== 'object' || Array.isArray(value))) return false;
    if (schema.type === 'array' && !Array.isArray(value)) return false;
    return !['string', 'number', 'boolean'].includes(schema.type) || typeof value === schema.type;
  };
  const matches = (schema, value) => {
    schema = resolve(schema);
    return typeMatches(schema, value) && (!schema?.required || schema.required.every(key =>
      Object.hasOwn(value, key) && typeMatches(schema.properties?.[key], value[key])));
  };
  while (stack.length) {
    const entry = stack.pop(), value = entry.value;
    let schema = resolve(entry.schema);
    if (!schema || value === null || typeof value !== 'object') continue;
    if (schema.oneOf) schema = resolve(schema.oneOf.find(option => matches(option, value)));
    if (!schema) continue;
    if (Array.isArray(value)) {
      if (schema.items) value.forEach((item, i) => stack.push({ value: item, schema: schema.items, path: { parent: entry.path, key: i } }));
      continue;
    }
    for (const [key, item] of Object.entries(value)) {
      const path = { parent: entry.path, key };
      if (schema.properties?.[key]) stack.push({ value: item, schema: schema.properties[key], path });
      else if (schema.additionalProperties && typeof schema.additionalProperties === 'object') stack.push({ value: item, schema: schema.additionalProperties, path });
      else if (schema.properties && schema.additionalProperties === true) {
        const rendered = pointer(path);
        charged += rendered.length;
        if (charged > MAX_CONTRACT_ASSOCIATION_BYTES) fail('report-limit', '/', 'Too many unknown extension paths to report.');
        paths.push(rendered);
      }
    }
  }
  return paths.sort(compare);
}

function linkScope(snapshot, contract, association, index) {
  const b = contract.bridge, roots = [...snapshot.scope.rootIds].sort(compare);
  if (association.snapshotRevision !== snapshot.revision) fail('snapshot-revision-mismatch', '/association/snapshotRevision', 'Association refers to another saved snapshot.', 'stale');
  if (association.contractSha256 !== hash(contract)) fail('contract-digest-mismatch', '/association/contractSha256', 'Authored contract bytes changed; create a new association.', 'stale');
  if (association.contractRevision !== b.lifecycle.contractRevision) fail('contract-revision-mismatch', '/association/contractRevision', 'Association refers to another authored contract revision.', 'stale');
  if (!same(association.source, snapshot.source && { fileKey: snapshot.source.fileKey, figmaPageId: snapshot.source.figmaPageId })) fail('source-mismatch', '/association/source', 'Native file or Figma page differs from the recorded association.', 'stale');
  if (association.scope.kind !== snapshot.scope.kind || !same(association.scope.rootIds, roots)) fail('scope-mismatch', '/association/scope', 'Exact root scope differs or root IDs are not sorted.', 'stale');
  if (b.source.tool !== 'Figma') fail('source-tool-mismatch', '/bridge/source/tool', 'This snapshot association requires an explicitly authored Figma source.');
  if (snapshot.source.fileKey && b.source.documentId !== snapshot.source.fileKey) fail('source-document-mismatch', '/bridge/source/documentId', 'Authored native documentId must match the known snapshot fileKey; aliases are not inferred.');
  if (!b.source.documentId?.trim() || !b.source.revision?.trim() || !b.lifecycle.sourceRevision.trim()) fail('missing-source-provenance', '/bridge/source', 'Author documentId and native/source revisions before association.');
  if (snapshot.generator.validatorVersion !== b.rulesVersion) fail('rules-version-mismatch', '/snapshot/generator/validatorVersion', 'Recorded source checks and authored contract use different rule catalogs.');
  if (snapshot.scope.kind === 'section') {
    if (!b.context.scope || b.context.scope.kind !== 'section') fail('contract-scope-mismatch', '/bridge/context/scope', 'A section snapshot requires the canonical selected-section contract boundary.');
  } else if (b.context.scope) fail('contract-scope-mismatch', '/bridge/context/scope', 'A page snapshot cannot be associated as a selected-section contract.');
  if (snapshot.scope.kind === 'page' && b.context.page !== snapshot.scope.pageId) fail('contract-page-mismatch', '/bridge/context/page', 'Authored logical page must match the captured page identity.');
  const contextBindings = unique(association.contexts, 'contextId', '/association/contexts');
  const rootsBound = unique(association.contexts, 'rootId', '/association/contexts');
  if (!same([...rootsBound.keys()].sort(compare), roots)) fail('context-coverage', '/association/contexts', 'Every captured root needs exactly one explicit context binding.');
  if (!same([...contextBindings.keys()].sort(compare), [...index.contexts.keys()].sort(compare))) fail('context-coverage', '/association/contexts', 'Bindings must cover exactly the authored structure contexts.');
  if (b.context.scope && !same([...b.context.scope.contextIds].sort(compare), [...contextBindings.keys()].sort(compare))) fail('context-scope-mismatch', '/bridge/context/scope/contextIds', 'Selected-section contexts differ from the explicit association.');

  const nodes = new Map(snapshot.nodes.map(node => [node.id, node]));
  const dependencies = new Map(snapshot.dependencies.map(node => [node.id, node]));
  const rootFor = new Map();
  // Propagate from already bounded captured roots using native child links.
  // Never ascend a dependency and accidentally absorb a legacy host subtree.
  for (const rootId of roots) {
    const stack = [rootId];
    while (stack.length) {
      const id = stack.pop();
      if (rootFor.has(id)) fail('ambiguous-native-root', '/snapshot/nodes', 'A source node belongs to overlapping captured roots.');
      const node = nodes.get(id);
      if (!node) fail('missing-native-root', '/snapshot/scope/rootIds', 'Captured root or child is unavailable.');
      rootFor.set(id, rootId);
      stack.push(...node.children);
    }
  }
  const externalRefs = new Map();
  for (const dependency of index.external.values()) {
    const entries = externalRefs.get(dependency.reference) || [];
    entries.push(dependency); externalRefs.set(dependency.reference, entries);
  }
  const seenSources = new Map();
  for (const [i, element] of b.identity.elements.entries()) {
    if (element.template?.sourceComponentId) {
      const id = element.template.sourceComponentId, source = nodes.get(id) || dependencies.get(id);
      if (!source || !['COMPONENT', 'COMPONENT_SET'].includes(source.type)) fail('unknown-component-source', `/bridge/identity/elements/${i}/template/sourceComponentId`, 'Component source is not captured as a native component dependency.');
    }
    for (const [j, source] of element.designInstance.sourceNodes.entries()) {
      const path = `/bridge/identity/elements/${i}/designInstance/sourceNodes/${j}`;
      const expectedRoot = contextBindings.get(source.contextId).rootId, actualRoot = rootFor.get(source.nodeId);
      if (actualRoot && actualRoot !== expectedRoot) fail('source-context-mismatch', path, 'Native source belongs to a different explicitly bound context root.');
      if (!actualRoot) {
        const native = dependencies.get(source.nodeId), declared = externalRefs.get(source.nodeId) || [];
        if (!native || !declared.some(entry => ['COMPONENT', 'COMPONENT_SET'].includes(native.type) ? entry.kind === 'component' : ['host-layout', 'other'].includes(entry.kind))) fail('source-outside-scope', path, 'Source node is not in the selected root or an explicitly declared captured dependency.');
      }
      const key = `${source.contextId}\u0000${source.nodeId}`;
      if (seenSources.has(key) && seenSources.get(key) !== element.bridgeKey) fail('ambiguous-source-identity', path, 'One native node/context cannot silently represent two logical identities.');
      seenSources.set(key, element.bridgeKey);
    }
  }
  for (const [i, binding] of association.contexts.entries()) {
    const context = index.contexts.get(binding.contextId), identity = index.identities.get(context.rootIdentity);
    if (!identity.designInstance.sourceNodes.some(node => node.contextId === binding.contextId && node.nodeId === binding.rootId)) fail('root-identity-mismatch', `/association/contexts/${i}`, 'Context rootIdentity must explicitly map to the captured native root.');
    if (b.context.scope && context.rootIdentity !== b.context.scope.rootIdentity) fail('section-root-mismatch', '/bridge/context/scope/rootIdentity', 'Selected section rootIdentity differs between contexts.');
  }
}

function makeReport(snapshot, contract, association, index) {
  const unsupported = unknownExtensions(contract), warnings = [];
  const sourceContinuity = snapshot.source.fileKey ? 'recorded-native-file-key' : 'unverified';
  if (!snapshot.source.fileKey) warnings.push({ code: 'source-unverified', path: '/snapshot/source/fileKey', message: 'Unknown native file key: integrity is not proof of source continuity.' });
  if (snapshot.scope.completeness !== 'full') warnings.push({ code: 'partial-source', path: '/snapshot/scope/completeness', message: 'Partial source coverage does not establish complete implementation context.' });
  if (snapshot.coverage.unavailable.length) warnings.push({ code: 'unavailable-source', path: '/snapshot/coverage/unavailable', message: 'Recorded source facts remain unavailable.' });
  if (unsupported.length) warnings.push({ code: 'unsupported-extensions', path: '/bridge', message: 'Unknown extension fields are preserved but their meaning is not supported.' });
  const external = [...index.external.values()].filter(entry => entry.status !== 'resolved');
  if (external.length) warnings.push({ code: 'external-dependencies-unverified', path: '/bridge/context/externalDependencies', message: 'Deferred or unverified external dependencies remain outside local evidence.' });
  return budget({
    format: 'dfc-bridge-contract-report', schemaVersion: 1,
    status: !snapshot.source.fileKey ? 'unverified' : warnings.length ? 'partial' : 'linked',
    snapshotRevision: snapshot.revision, contractSha256: association.contractSha256, contractRevision: association.contractRevision,
    nativeSourceRevision: contract.bridge.source.revision, lifecycleSourceRevision: contract.bridge.lifecycle.sourceRevision,
    source: association.source, scope: association.scope, contexts: association.contexts,
    sourceContinuity, errors: [], warnings, unsupported,
    unavailable: snapshot.coverage.unavailable.map((_, index) => `/snapshot/coverage/unavailable/${index}`),
    questionRefs: (contract.bridge.openQuestions || []).map((question, index) => ({ id: question.id, pointer: `/bridge/openQuestions/${index}`, status: question.status, blocking: question.blocking, scope: question.scope || [question.scopeRef] })),
    coverage: { schema: 'validated', sourceReferences: 'validated-in-declared-scope', authoredMeaning: 'not-checked', content: 'not-checked', runtime: 'not-checked', ownerApproval: 'not-checked' },
    handoffReady: false, readinessClaim: 'none'
  });
}

export async function createContractAssociation(snapshotInputValue, contractInputValue, options) {
  const parsedOptions = readJSON(options, '/options');
  if (!parsedOptions || typeof parsedOptions !== 'object' || Array.isArray(parsedOptions) || Object.keys(parsedOptions).join(',') !== 'contexts') fail('invalid-options', '/options', 'Provide only explicit contexts as association options.');
  const snapshot = await snapshotInput(snapshotInputValue), contract = contractInput(contractInputValue), index = semanticContract(contract);
  const association = {
    format: 'dfc-bridge-contract-association', schemaVersion: 1,
    snapshotRevision: snapshot.revision, contractSha256: hash(contract), contractRevision: contract.bridge.lifecycle.contractRevision,
    source: { fileKey: snapshot.source.fileKey, figmaPageId: snapshot.source.figmaPageId },
    scope: { kind: snapshot.scope.kind, rootIds: [...snapshot.scope.rootIds].sort(compare) },
    contexts: parsedOptions.contexts
  };
  schemaCheck(validateAssociation, association, '/association', 'invalid-association');
  linkScope(snapshot, contract, association, index);
  return budget({ association, report: makeReport(snapshot, contract, association, index) });
}

export async function inspectContractAssociation(snapshotInputValue, contractInputValue, associationInputValue) {
  try {
    if (snapshotInputValue == null || contractInputValue == null || associationInputValue == null) fail('missing-input', '/', 'Snapshot, authored contract and association are all required.', 'missing');
    const snapshot = await snapshotInput(snapshotInputValue), contract = contractInput(contractInputValue), association = associationInput(associationInputValue);
    // Digest mismatch is reported before reference checks on a different
    // contract. Rebinding requires a deliberate new association.
    if (association.contractSha256 !== hash(contract)) fail('contract-digest-mismatch', '/association/contractSha256', 'Authored contract bytes changed; create a new association.', 'stale');
    const index = semanticContract(contract);
    linkScope(snapshot, contract, association, index);
    return makeReport(snapshot, contract, association, index);
  } catch (error) {
    if (!(error instanceof ContractAssociationError)) throw error;
    const result = { format: 'dfc-bridge-contract-report', schemaVersion: 1, status: error.status,
      errors: [{ code: error.code, path: error.path, message: error.message }], warnings: [],
      handoffReady: false, readinessClaim: 'none' };
    if (encoder.encode(canonicalHandoffJSON(result)).length > MAX_CONTRACT_ASSOCIATION_BYTES) result.errors = [{ code: 'report-limit', path: '/', message: 'Validation error details exceed the report limit; use a smaller input.' }];
    return result;
  }
}
