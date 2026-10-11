import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { execFileSync, spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tutorial = resolve(root, 'assets/tutorial');
const read = (path) => readFileSync(resolve(tutorial, path));
const hash = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');
const data = JSON.parse(read('native-nodes.json'));
const reports = JSON.parse(read('check-results.json')).reports;
const provenance = JSON.parse(read('capture-provenance.json'));
const renderProvenance = JSON.parse(read('renders/provenance.json'));
const manifest = JSON.parse(readFileSync(resolve(root, 'validator/site-content.json')));
const concepts = ['contexts', 'identity', 'structure', 'interactions', 'content', 'roles', 'axes', 'scope', 'handoff-questions', 'handoff-clarified'];
const walk = (node) => [node, ...(node.children || []).flatMap(walk)];
const find = (node, name) => walk(node).find((item) => item.name === name);
const parentOf = (root, child) => walk(root).find((item) => item.children?.includes(child));
assert.equal(data.purpose, 'teaching-evidence-not-a-contract');
assert.equal(data.pages.length, 5);
assert.equal(new Set(data.pages.map((p) => p.name)).size, 5);
const fig = read('dfc-bridge-workshop.fig');
assert(fig.length > 10000 && fig.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 3, 4])), 'native .fig archive');
const canvas = execFileSync('unzip', ['-p', resolve(tutorial, 'dfc-bridge-workshop.fig'), 'canvas.fig']);
assert(canvas.length > 10000 && canvas.subarray(0, 8).toString() === 'fig-kiwi', 'native canvas payload');

for (const page of [data.pages[1], data.pages[2], data.pages[4]]) {
  const roots = page.children.filter((n) => n.name.includes('[page=workshop]'));
  assert.equal(roots.length, page === data.pages[4] ? 4 : 2);
  for (const n of roots) {
    assert.equal(n.width, Number(n.name.match(/\[bp=(\d+)\]/u)[1]));
    assert.equal(n.layoutMode, 'VERTICAL');
    assert.equal(n.primaryAxisSizingMode, 'AUTO');
    assert(!n.name.includes('[asset]'));
    for (const child of walk(n)) {
      for (const target of [...child.name.matchAll(/\[action=modal:([^\]]+)\]/gu)]) {
        assert(find(n, `contact-modal [modal=${target[1]}]`), 'modal resolves inside the prepared root');
      }
      if (child.name.includes('[href=#faq]')) assert(find(n, 'faq [section=workshop-faq] [anchor=faq]'));
    }
  }
}
const prepared = data.pages[1].children.filter((n) => n.name.includes('[page=workshop]'));
const [wide, narrow] = prepared;
const uiKit = data.pages[1].children.find((n) => n.name === 'UI Kit');
const modals = data.pages[1].children.find((n) => n.name === 'Modals');
assert(uiKit && modals, 'the final canvas exposes UI Kit and Modals beside the page roots');
const families = {
  primary: find(data.pages[1], 'button-primary'),
  secondary: find(data.pages[1], 'button-secondary'),
};
const states = ['default', 'hover', 'pressed', 'disabled'];
const componentProperty = (node, name) => Object.entries(node.componentProperties || {}).find(([key]) => key.split('#')[0] === name)?.[1];
const colorBinding = (node, field) => node[field]?.find((paint) => paint.type === 'SOLID')?.boundVariables?.color;
for (const family of Object.values(families)) {
  assert.equal(family?.type, 'COMPONENT_SET', 'button families are real native variant owners');
  assert(!/\[(?:action|href|modal|component|state)=/u.test(family.name), 'visual button states do not invent DFC targets or page actions');
  assert.equal(family.children.length, states.length);
  assert.deepEqual(family.children.map((n) => n.variantProperties?.State).sort(), [...states].sort(), 'each family has exactly four pointer/availability variants');
  assert.equal(family.componentPropertyDefinitions?.State?.type, 'VARIANT');
  const definitions = Object.entries(family.componentPropertyDefinitions || {});
  const labels = definitions.filter(([key]) => key.split('#')[0] === 'Label');
  assert.equal(labels.length, 1, 'each family exposes one shared Label property, not separate per-variant text controls');
  const [labelKey, labelDefinition] = labels[0];
  assert.equal(labelDefinition.type, 'TEXT');
  const focuses = definitions.filter(([key]) => key.split('#')[0] === 'Focus visible');
  assert.equal(focuses.length, 1, 'all variants share one independent focus control');
  const focus = focuses[0];
  assert(focus, 'keyboard focus is a separate native component property');
  assert.equal(focus[1].type, 'BOOLEAN');
  assert.equal(focus[1].defaultValue, false);
  for (const component of family.children) {
    assert.equal(component.type, 'COMPONENT', 'the states stay editable native main components');
    assert(!/\[(?:action|href|modal|component|state)=/u.test(component.name));
    assert.equal(component.width, 236);
    assert.equal(component.height, 58, 'state changes do not make the control jump in size');
    assert.equal(component.layoutMode, 'HORIZONTAL');
    assert.equal(component.clipsContent, false, 'the external focus ring cannot be clipped by its component');
    for (const field of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']) assert.equal(component[field], 16);
    assert.equal(component.cornerRadius, 4);
    assert(colorBinding(component, 'fills'), 'button fills retain native token bindings');
    assert(colorBinding(component, 'strokes'), 'button borders retain native token bindings');
    const label = component.children.find((n) => n.type === 'TEXT');
    assert(label && colorBinding(label, 'fills'), 'state label color is a native binding, not opacity on the whole control');
    assert.equal(label.componentPropertyReferences?.characters, labelKey, 'all variants point to the shared editable label property');
    assert.equal(label.characters, labelDefinition.defaultValue, 'changing visual state does not change the label');
    const ring = find(component, 'focus-ring');
    assert.equal(ring?.type, 'RECTANGLE');
    assert.equal(ring.visible, false, 'focus defaults off in every main variant');
    assert.equal(ring.layoutPositioning, 'ABSOLUTE', 'focus cannot change flow geometry');
    assert.deepEqual([ring.x, ring.y, ring.width, ring.height], [-4, -4, component.width + 8, component.height + 8], 'a real 4px gap separates the focus ring from the control');
    assert.deepEqual(ring.constraints, { horizontal: 'STRETCH', vertical: 'STRETCH' });
    assert.deepEqual(ring.fills, []);
    assert.equal(ring.strokeAlign, 'OUTSIDE');
    assert.equal(ring.strokeWeight, 2);
    assert.equal(ring.cornerRadius, 8);
    // Figma expands setBoundVariable('strokeWeight', ...) into four edge
    // bindings; verify the actual exported representation, not an invented key.
    const ringWeightBindings = ['strokeTopWeight', 'strokeBottomWeight', 'strokeLeftWeight', 'strokeRightWeight'].map((field) => ring.boundVariables?.[field]);
    assert(ringWeightBindings.every((binding) => binding?.type === 'VARIABLE_ALIAS'), 'ring width has native token bindings on all four edges');
    assert.equal(new Set(ringWeightBindings.map((binding) => binding.id)).size, 1, 'one token owns the complete ring width');
    assert(colorBinding(ring, 'strokes'), 'focus color reuses a native semantic binding');
    assert.equal(ring.componentPropertyReferences?.visible, focus[0], 'all variants use the independent Focus visible property');
  }
  const statePaint = (state) => colorBinding(family.children.find((n) => n.variantProperties.State === state), 'fills').id;
  assert.equal(new Set(states.map(statePaint)).size, states.length, 'default, hover, pressed and disabled each have an explicit distinct fill token');
}
const shared = {
  primary: families.primary.children.find((n) => n.variantProperties.State === 'default'),
  secondary: families.secondary.children.find((n) => n.variantProperties.State === 'default'),
  modal: find(modals, 'contact-modal'),
};
assert.equal(shared.modal?.type, 'COMPONENT', 'the modal remains a real native main component');
assert(!/\[(?:action|href|modal|component)=/u.test(shared.modal.name), 'page target identity does not belong to the shared modal name');
const specimens = walk(uiKit).filter((n) => n.type === 'INSTANCE');
assert.equal(specimens.length, 10, 'the UI Kit contains five linked native specimens per button style');
for (const family of Object.values(families)) {
  const examples = specimens.filter((n) => n.mainComponentSetId === family.id);
  assert.equal(examples.length, 5);
  assert.deepEqual(examples.map((n) => [n.variantProperties?.State, componentProperty(n, 'Focus visible')?.value]).sort(), [
    ['default', false], ['hover', false], ['default', true], ['pressed', false], ['disabled', false],
  ].sort(), 'focus is displayed independently while disabled has no focus ring');
  for (const instance of examples) {
    const main = family.children.find((n) => n.id === instance.mainComponentId);
    assert(main, 'review examples link to an actual main variant');
    assert.equal(instance.mainComponentName, main.name);
    assert.equal(instance.mainComponentSetName, family.name);
    assert.equal(componentProperty(instance, 'State')?.value, instance.variantProperties.State);
    assert.equal(instance.width, 236);
    assert.equal(instance.height, 58);
    assert.equal(find(instance, 'focus-ring')?.visible, componentProperty(instance, 'Focus visible').value);
  }
}
const before = data.pages[0].children;
assert.deepEqual(before.map((n) => n.name), ['desktop', 'mobile-final-2'], 'the raw roots have the actual ambiguous names');
// Page 01 has standalone frames; page 02 introduces linked library instances.
// Compare only exported visual evidence after normalizing those atomic owners,
// never claim identical native objects, source links or full paint/font output.
const normalizeTeachingOwnerType = (name, type) => type === 'INSTANCE'
  && /^(?:contact-button|faq-link|contact-modal)(?:\s|$)/u.test(name) ? 'FRAME' : type;
const isTeachingButton = (name) => /^(?:Button(?: copy)?|contact-button|faq-link)(?:\s|$)/u.test(name);
const buttonContent = (children) => (children || []).filter((n) => n.type === 'TEXT').map(({ characters, fontName, textAutoResize }) => ({ characters, fontName, textAutoResize }));
// These newly exported fields verify the native library below; they are not
// part of the existing raw/prepared layout-and-content comparison or a new
// transfer contract. Raw frames intentionally have no shared source bindings.
const visualMetadata = ['mainComponentId', 'mainComponentName', 'mainComponentKey', 'mainComponentSetId', 'mainComponentSetName', 'variantProperties', 'componentProperties', 'componentPropertyDefinitions', 'componentPropertyReferences', 'boundVariables', 'fills', 'strokes', 'strokeWeight', 'strokeAlign', 'cornerRadius', 'constraints'];
const exportedDesignEvidence = ({ id, name, children, ...properties }, depth = 0) => {
  for (const key of visualMetadata) delete properties[key];
  properties.type = normalizeTeachingOwnerType(name, properties.type);
  if (!depth || properties.visible === false) { delete properties.x; delete properties.y; }
  if (properties.visible === false) return properties; // Hidden target placement is not rendered evidence.
  if (isTeachingButton(name)) return { ...properties, content: buttonContent(children) }; // FILL glyph width changes with the new shared source.
  return children ? { ...properties, children: children.map((child) => exportedDesignEvidence(child, depth + 1)) } : properties;
};
for (const [index, n] of before.entries()) {
  assert.equal(n.width, prepared[index].width, 'before and after compare the same authored width');
  assert(walk(n).every((child) => !/\[[^\]]+\]/u.test(child.name)), 'page 01 has no declared name tags');
  assert(find(n, index ? 'Title mobile' : 'Heading'), 'raw text names match the narrative');
  assert(find(n, index ? 'Button copy' : 'Button'), 'raw button names match the narrative');
}
assert.deepEqual(exportedDesignEvidence(before[0]), exportedDesignEvidence(wide), 'wide rendered composition keeps its exported root-relative geometry/text/layout while control internals gain shared-source sizing');
const rawNarrow = structuredClone(before[1]);
const rawHero = find(rawNarrow, 'Frame 42');
const rawCopy = find(rawHero, 'hero-copy');
const rawActions = find(rawHero, 'hero-actions');
const rawArt = find(rawHero, 'workshop-art');
const rawTitle = find(rawNarrow, 'Title mobile');
assert.equal(rawTitle.characters, 'Мастерская макетов', 'the source deliberately shortens the mobile title');
assert.equal(parentOf(rawNarrow, rawActions), rawHero, 'mobile actions changed meaningful parent, not merely sibling order');
assert(rawHero.children.indexOf(rawActions) > rawHero.children.indexOf(rawArt), 'the misplaced mobile actions are below the artwork');
assert.equal(rawHero.layoutMode, 'VERTICAL', 'the deliberate structural error is not missing Auto Layout');
// Restoring the two authored facts must restore the exported logical design.
// Geometry changes naturally when native Auto Layout and text reflow recalculate.
rawTitle.characters = find(narrow, 'hero-title').characters;
rawHero.children = rawHero.children.filter((item) => item !== rawActions);
rawCopy.children.push(rawActions);
const exportedLogicalEvidence = ({ id, name, x, y, width, height, children, ...properties }) => {
  for (const key of visualMetadata) delete properties[key];
  properties.type = normalizeTeachingOwnerType(name, properties.type);
  if (properties.visible === false) return properties;
  if (isTeachingButton(name)) return { ...properties, content: buttonContent(children) };
  return children ? { ...properties, children: children.map(exportedLogicalEvidence) } : properties;
};
assert.deepEqual(exportedLogicalEvidence(rawNarrow), exportedLogicalEvidence(narrow), 'only title content and the actions parent differ in the raw narrow logical design');
const productText = (n) => walk(n).filter((c) => c.type === 'TEXT').map((c) => [c.name, c.characters]);
assert.deepEqual(productText(wide), productText(narrow), 'content does not change at narrow width');
for (const n of prepared) {
  const isNarrow = n.width < 500;
  const hero = find(n, 'hero [section=workshop-hero]');
  assert.equal(hero.layoutMode, 'VERTICAL', 'hero stays vertical at both widths');
  for (const key of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']) {
    assert.equal(hero[key], 0, `hero ${key} is zero`);
  }
  assert.equal(hero.itemSpacing, isNarrow ? 24 : 32, 'hero keeps the authored gap');
  const actions = find(hero, 'hero-actions');
  assert.equal(parentOf(n, actions), find(hero, 'hero-copy'), 'the same meaningful hero-copy owns actions at both widths');
  assert.equal(actions.layoutMode, isNarrow ? 'VERTICAL' : 'HORIZONTAL', 'only the actions reflow');
  assert.equal(actions.width, hero.width, 'actions occupy the hero width');
  assert.deepEqual(actions.children.map((button) => button.name), [
    'contact-button [action=modal:contact-modal]',
    'faq-link [href=#faq]',
  ], 'both named buttons keep the same direct parent and order');
  for (const button of actions.children) {
    assert.equal(button.width, isNarrow ? 327 : 236, 'both buttons have the same authored width');
  }
  for (const [index, button] of actions.children.entries()) {
    const component = index ? shared.secondary : shared.primary;
    assert.equal(button.type, 'INSTANCE');
    assert.equal(button.mainComponentId, component.id, 'the page button stays linked to its actual UI Kit source');
    assert.equal(button.mainComponentName, component.name);
    const family = index ? families.secondary : families.primary;
    assert.equal(button.mainComponentSetId, family.id);
    assert.equal(button.mainComponentSetName, family.name);
    assert.equal(button.variantProperties?.State, 'default', 'page composition remains the default visual example');
    assert.equal(componentProperty(button, 'Focus visible')?.value, false);
    const ring = find(button, 'focus-ring');
    assert.equal(ring?.visible, false);
    assert.deepEqual([ring.x, ring.y, ring.width, ring.height], [-4, -4, button.width + 8, button.height + 8], 'the hidden default ring stretches correctly at both page widths');
    assert.deepEqual(ring.constraints, { horizontal: 'STRETCH', vertical: 'STRETCH' });
    assert(!button.name.includes('[component='), 'the source link comes from native Figma metadata, not a duplicate tag');
  }
  const modal = find(n, 'contact-modal [modal=contact-modal]');
  assert.equal(modal.visible, false);
  assert.equal(modal.type, 'INSTANCE');
  assert.equal(modal.mainComponentId, shared.modal.id, 'the local modal target stays linked to the visible shared source');
  assert.equal(modal.mainComponentName, shared.modal.name);
  const card = find(n, 'project-card-catalog [item=project]');
  assert.equal(card.primaryAxisSizingMode, 'AUTO');
  assert.equal(find(n, 'project-catalog-title').textAutoResize, 'HEIGHT');
  assert.equal(find(n, 'contact-button [action=modal:contact-modal]').counterAxisSizingMode, 'AUTO');
  assert(find(n, 'contact-button [action=modal:contact-modal]').height < 70, 'button has no accidental fixed 100px height');
  const asset = find(n, 'workshop-art [decor] [asset]');
  assert.equal(asset.children[0].type, 'GROUP', 'group is confined to the export boundary');
}
assert(find(narrow, 'project-card-catalog [item=project]').height > find(wide, 'project-card-catalog [item=project]').height);
assert.equal(reports[0].status, 'ready');
assert.deepEqual(reports[1].issues.map((i) => i.ruleId).sort(), ['content.text-changed-between-breakpoints', 'responsive.parent-changed-across-breakpoints']);
assert.deepEqual(reports[1].summary, { errors: 2, todos: 0, warnings: 0 }, 'the inconsistent example has exactly the two intended findings');
const brokenRoots = data.pages[2].children.filter((n) => n.name.includes('[page=workshop]'));
for (const n of brokenRoots) {
  const hero = find(n, 'hero [section=workshop-hero]');
  const actions = find(hero, 'hero-actions');
  const isNarrow = n.width < 500;
  assert.equal(hero.layoutMode, 'VERTICAL');
  assert.equal(find(n, 'hero-title').characters, isNarrow ? 'Мастерская макетов' : 'Мастерская понятных макетов');
  assert.equal(parentOf(n, actions), isNarrow ? hero : find(hero, 'hero-copy'));
  if (isNarrow) assert(hero.children.indexOf(actions) > hero.children.indexOf(find(hero, 'workshop-art [decor] [asset]')));
  assert(find(n, 'contact-button [action=modal:contact-modal]'), 'button identity is not an extra deliberate error');
}
assert.equal(reports[2].status, 'partial');
assert.equal(reports[2].summary.deferred, 1);
assert.equal(reports[2].roots[0].contextSource, 'inferred-width');
assert.equal(reports[3].rootCount, 4);

for (const locale of manifest.locales) {
  for (const concept of concepts) {
    const svg = read(`diagrams/${concept}-${locale}.svg`).toString();
    assert(/<title>.+<\/title>/u.test(svg));
    assert(/<desc>.+<\/desc>/u.test(svg));
    assert(/content="[^"\n]*mxfile/u.test(svg), 'SVG embeds editable draw.io source');
    assert(!/<script\b/u.test(svg));
    if (['handoff-questions', 'handoff-clarified'].includes(concept)) {
      // Check the native graph, not just its rendered appearance: each speech
      // bubble must stay above the corresponding member of the recurring cast.
      const xml = svg.match(/\bcontent="([^"]+)"/u)[1]
        .replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
      const cells = [...xml.matchAll(/<mxCell\b([^>]*\bvertex="1"[^>]*)>([\s\S]*?)<\/mxCell>/gu)].map((match) => ({
        style: match[1].match(/\bstyle="([^"]*)"/u)?.[1] || '',
        geometry: Object.fromEntries([...match[2].matchAll(/\b(x|y|width|height)="([\d.]+)"/gu)].map((item) => [item[1], Number(item[2])])),
      }));
      const bubbles = cells.filter((cell) => cell.style.includes('shape=callout;'));
      const penguins = cells.filter((cell) => cell.style.includes('shape=image;'));
      assert.equal(bubbles.length, 3, `${concept}-${locale}: three editable speech bubbles`);
      assert.equal(penguins.length, 3, `${concept}-${locale}: the same three penguins recur`);
      for (const [index, { geometry: bubble, style }] of bubbles.entries()) {
        const speaker = penguins[index].geometry;
        assert(bubble.y + bubble.height <= speaker.y, `${concept}-${locale}: speech stays above the speaker`);
        const tipX = bubble.x + Number(style.match(/(?:^|;)position2=([\d.]+);/u)?.[1]) * bubble.width;
        assert(Math.abs(tipX - (speaker.x + speaker.width / 2)) < 1, `${concept}-${locale}: the tail points to its speaker`);
      }
    }
  }
}
for (const capture of provenance.captures) {
  const meta = await sharp(read(capture.file)).metadata();
  assert.equal(meta.width, capture.crop.width);
  assert.equal(meta.height, capture.crop.height);
  const source = capture.sourceCaptureFile && resolve(tutorial, capture.sourceCaptureFile);
  if (source && existsSync(source)) {
    assert(source.startsWith(`${tutorial}${sep}`), 'retained capture originals stay inside the evidence directory');
    assert.equal(hash(source), capture.sourceSha256, `${capture.file}: source capture hash`);
    const sourceMeta = await sharp(source).metadata();
    assert.equal(sourceMeta.width, capture.sourceDimensions.width);
    assert.equal(sourceMeta.height, capture.sourceDimensions.height);
    const expectedPixels = await sharp(source).extract(capture.crop).ensureAlpha().raw().toBuffer();
    const actualPixels = await sharp(read(capture.file)).ensureAlpha().raw().toBuffer();
    assert(actualPixels.equals(expectedPixels), `${capture.file}: genuine rectangular crop of its retained native capture`);
  } else if (capture.sourceCaptureFile?.startsWith('motion/')) {
    assert.fail(`${capture.file}: new native capture must retain its source file`);
  }
  for (const [x, y] of capture.numberMarkers || []) {
    assert(x > 0 && x < meta.width && y > 0 && y < meta.height);
  }
}
// These clips are timed sequences of actual editor states, not continuous
// screen recordings. Keep their source pixels and playback claims verifiable.
const motionRoot = resolve(tutorial, 'motion');
const motion = JSON.parse(read('motion/provenance.json'));
const motionPath = (file) => {
  assert.equal(typeof file, 'string', 'motion file path is a string');
  const path = resolve(motionRoot, file);
  assert(path.startsWith(`${motionRoot}${sep}`), 'motion files stay inside their evidence directory');
  assert(existsSync(path), `motion evidence exists: ${file}`);
  return path;
};
const ffprobe = existsSync('/opt/homebrew/bin/ffprobe') ? '/opt/homebrew/bin/ffprobe' : 'ffprobe';
assert.equal(motion.schemaVersion, 1);
assert.equal(motion.kind, 'native-ui-step-sequence');
assert.equal(motion.fileKey, 'yCIbd7pIabjIepkkncPPYl', 'motion belongs to the disposable QA copy, not the shipped source');
assert.match(motion.pageName, /^01\b/u, 'motion starts from the raw teaching page');
assert.deepEqual(motion.clips.map((clip) => clip.id).sort(), ['move-actions', 'rename-title']);
for (const clip of motion.clips) {
  assert.equal(typeof clip.action, 'string');
  assert(clip.action.trim(), `${clip.id}: describes the actual action`);
  const { crop, frames, output } = clip;
  assert.deepEqual(Object.keys(crop).sort(), ['height', 'left', 'top', 'width']);
  for (const value of Object.values(crop)) assert(Number.isInteger(value) && value >= 0, `${clip.id}: integer crop geometry`);
  assert(crop.width > 0 && crop.height > 0);
  assert(Array.isArray(frames) && frames.length >= 3, `${clip.id}: before, action and after states are retained`);
  let durationMs = 0;
  for (const frame of frames) {
    assert.match(frame.sourceFile, /^source\/.+\.png$/u);
    const source = motionPath(frame.sourceFile);
    assert.equal(hash(source), frame.sha256, `${clip.id}: source frame hash`);
    const meta = await sharp(source).metadata();
    assert.equal(meta.width, frame.width, `${clip.id}: source frame width`);
    assert.equal(meta.height, frame.height, `${clip.id}: source frame height`);
    assert(crop.left + crop.width <= meta.width && crop.top + crop.height <= meta.height, `${clip.id}: fixed crop stays inside every native capture`);
    assert(Number.isInteger(frame.holdMs) && frame.holdMs > 0, `${clip.id}: each native state has an explicit positive hold`);
    durationMs += frame.holdMs;
  }
  assert.match(output.file, /\.mp4$/u);
  assert.match(output.poster, /\.png$/u);
  const video = motionPath(output.file);
  const poster = motionPath(output.poster);
  assert.equal(hash(video), output.sha256, `${clip.id}: encoded video hash`);
  assert.equal(hash(poster), output.posterSha256, `${clip.id}: poster hash`);
  assert.match(output.gif, /\.gif$/u);
  const gif = motionPath(output.gif);
  assert.equal(hash(gif), output.gifSha256, `${clip.id}: downloadable GIF hash`);
  const gifMeta = await sharp(gif).metadata();
  assert.equal(gifMeta.width, crop.width);
  assert.equal(gifMeta.height, crop.height);
  assert(gifMeta.pages >= 3, `${clip.id}: downloadable GIF contains native before/action/after states`);
  assert.equal(gifMeta.delay.length, gifMeta.pages, `${clip.id}: every GIF frame has a documented playback delay`);
  assert(gifMeta.delay.every((delay) => delay > 0), `${clip.id}: GIF frame holds remain positive`);
  assert(Math.abs(gifMeta.delay.reduce((sum, delay) => sum + delay, 0) / 1000 - output.durationSeconds) <= .1, `${clip.id}: GIF duration matches the same native-state sequence`);
  assert.equal(output.width, crop.width);
  assert.equal(output.height, crop.height);
  assert(Number.isFinite(output.durationSeconds) && output.durationSeconds > 0, `${clip.id}: duration is documented`);
  assert(Math.abs(output.durationSeconds - durationMs / 1000) <= .1, `${clip.id}: documented playback matches the native-state holds`);
  const posterMeta = await sharp(poster).metadata();
  assert.equal(posterMeta.width, crop.width);
  assert.equal(posterMeta.height, crop.height);
  const expectedPoster = await sharp(motionPath(frames[0].sourceFile)).extract(crop).ensureAlpha().raw().toBuffer();
  const actualPoster = await sharp(poster).ensureAlpha().raw().toBuffer();
  assert(actualPoster.equals(expectedPoster), `${clip.id}: poster is an unmodified rectangular crop of the first real state`);
  const probe = spawnSync(ffprobe, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', video], { encoding: 'utf8' });
  assert(!probe.error, `ffprobe is required to verify tutorial video: ${probe.error?.message}`);
  assert.equal(probe.status, 0, `${clip.id}: ffprobe completed: ${probe.stderr}`);
  const encoded = JSON.parse(probe.stdout);
  assert.equal(encoded.streams.length, 1, `${clip.id}: one video stream only; no private audio or additional streams`);
  assert.equal(encoded.streams[0].codec_type, 'video');
  assert.equal(encoded.streams[0].codec_name, 'h264', `${clip.id}: broadly supported MP4 codec`);
  assert.equal(encoded.streams[0].width, output.width);
  assert.equal(encoded.streams[0].height, output.height);
  assert(Math.abs(Number(encoded.format.duration) - output.durationSeconds) <= .1, `${clip.id}: encoded duration matches the documented sequence`);
}
assert.equal(renderProvenance.schemaVersion, 1);
assert.deepEqual(renderProvenance.renders.map((item) => item.file).sort(), ['hero-1440.png', 'hero-375.png']);
for (const n of prepared) {
  const width = n.width;
  const meta = await sharp(read(`renders/workshop-${width}.png`)).metadata();
  assert.equal(meta.width, width);
  assert.equal(meta.height, n.height);
  const hero = find(n, 'hero [section=workshop-hero]');
  const heroMeta = await sharp(read(`renders/hero-${width}.png`)).metadata();
  const record = renderProvenance.renders.find((item) => item.file === `hero-${width}.png`);
  assert.equal(record.sourceFile, `workshop-${width}.png`);
  assert.equal(record.sourceNodeId, n.id);
  assert.deepEqual(record.subjectBounds, { left: hero.x, top: hero.y, width: hero.width, height: hero.height }, 'subject bounds come from the native hero inside its root');
  const { crop, subjectBounds: subject } = record;
  for (const value of Object.values(crop)) assert(Number.isInteger(value) && value >= 0, 'PNG crop coordinates are nonnegative integers');
  assert(crop.width > 0 && crop.height > 0);
  assert(crop.left + crop.width <= meta.width && crop.top + crop.height <= meta.height, 'crop stays within the real root render');
  assert.equal(heroMeta.width, crop.width);
  assert.equal(heroMeta.height, crop.height);
  const insets = {
    top: subject.top - crop.top,
    right: crop.left + crop.width - subject.left - subject.width,
    bottom: crop.top + crop.height - subject.top - subject.height,
    left: subject.left - crop.left,
  };
  assert.deepEqual(record.insets, insets, 'documented fields match actual crop geometry');
  for (const inset of Object.values(insets)) assert(inset >= (width < 500 ? 24 : 32), 'meaningful hero content has true surrounding image fields on all four sides');
  const expectedPixels = await sharp(read(`renders/${record.sourceFile}`)).extract(crop).ensureAlpha().raw().toBuffer();
  const actualPixels = await sharp(read(`renders/${record.file}`)).ensureAlpha().raw().toBuffer();
  assert(actualPixels.equals(expectedPixels), 'hero image is a genuine crop of the complete native root, not synthetic padding');
}
// HTML assets must resolve in canonical source as well as after site rewriting.
let images = 0;
for (const page of manifest.pages) {
  for (const source of Object.values(page.source)) {
    const text = readFileSync(resolve(root, source), 'utf8');
    for (const match of text.matchAll(/\b(src|href|poster)="((?:\.\.\/)+assets\/tutorial\/[^"]+)"/gu)) {
      assert(existsSync(resolve(root, dirname(source), match[2])), `${source}: ${match[2]}`);
    }
    for (const match of text.matchAll(/<img\b[^>]*src="[^"]*assets\/tutorial\/[^>]+>/gu)) {
      images++;
      const src = match[0].match(/src="([^"]+)"/u)[1];
      const mascot = /\/illustrations\/handoff-penguin-(?:frontend|backend|ai)-display\.png$/u.test(src);
      if (mascot) {
        assert(/class="bridge-lesson-penguin"/u.test(match[0]), `${source}: mascot is an editorial decoration`);
        assert(/alt=""/u.test(match[0]) && /aria-hidden="true"/u.test(match[0]) && /draggable="false"/u.test(match[0]), `${source}: decorative mascot is silent and not draggable`);
      } else {
        assert(/alt="[^"]+"/u.test(match[0]), `${source}: explanatory alt missing`);
      }
      const meta = await sharp(resolve(root, dirname(source), src)).metadata();
      assert.equal(Number(match[0].match(/\bwidth="(\d+)"/u)?.[1]), meta.width, `${source}: intrinsic image width`);
      assert.equal(Number(match[0].match(/\bheight="(\d+)"/u)?.[1]), meta.height, `${source}: intrinsic image height`);
    }
    for (const match of text.matchAll(/<video\b[^>]*\bsrc="([^"]*assets\/tutorial\/motion\/[^"]+)"[^>]*>/gu)) {
      const tag = match[0];
      const clip = motion.clips.find(({ output }) => match[1].endsWith(`/motion/${output.file}`));
      assert(clip, `${source}: video belongs to a registered native step sequence`);
      assert(/\bcontrols(?:\s|[=>])/u.test(tag), `${source}: reader can pause and inspect the sequence`);
      assert(/\bplaysinline(?:\s|[=>])/u.test(tag), `${source}: inline playback remains available on mobile`);
      assert(/\bpreload="(?:none|metadata)"/u.test(tag), `${source}: no eager video download`);
      assert(!/\b(?:autoplay|loop)(?:\s|[=>])/u.test(tag), `${source}: motion never starts or repeats without the reader`);
      assert(/\baria-label="[^"]+"/u.test(tag), `${source}: sequence has a meaningful accessible name`);
      assert.equal(Number(tag.match(/\bwidth="(\d+)"/u)?.[1]), clip.output.width, `${source}: intrinsic video width`);
      assert.equal(Number(tag.match(/\bheight="(\d+)"/u)?.[1]), clip.output.height, `${source}: intrinsic video height`);
      assert(tag.match(/\bposter="([^"]+)"/u)?.[1].endsWith(`/motion/${clip.output.poster}`), `${source}: poster is the registered first native state`);
    }
  }
}
const imageSources = (text) => [...text.matchAll(/<img\b[^>]*\bsrc="([^"]*assets\/tutorial\/[^"]+)"[^>]*>/gu)].map((match) => match[1]);
const capturesByFile = new Map(provenance.captures.map((capture) => [capture.file, capture]));
const capturedEvidence = (source) => capturesByFile.get(source.split('/assets/tutorial/')[1]);
const lesson = manifest.pages.find((page) => page.route === 'start/visual-walkthrough');
const recipes = manifest.pages.find((page) => page.route === 'examples');
for (const locale of manifest.locales) {
  const lessonText = readFileSync(resolve(root, lesson.source[locale]), 'utf8');
  const sources = imageSources(lessonText);
  for (const asset of [`diagrams/contexts-${locale}.svg`, 'renders/hero-1440.png', 'renders/hero-375.png']) {
    assert(sources.some((src) => src.endsWith(`/assets/tutorial/${asset}`)), `${locale} lesson: ${asset} illustrates the actual story`);
  }
  assert(sources.some((src) => capturedEvidence(src)?.interface === 'Figma Design'), `${locale} lesson: a recorded native Figma capture is visible`);
  assert(sources.some((src) => capturedEvidence(src)?.interface === 'local-development-not-community-release'), `${locale} lesson: a recorded local Assistant capture is visible`);
  assert(lessonText.includes('assets/tutorial/dfc-bridge-workshop.fig'), `${locale} lesson: editable source is available`);
  for (const clip of motion.clips) assert(lessonText.includes(`/motion/${clip.output.file}`), `${locale}: the ${clip.id} correction is shown at its narrative point`);
  const comments = [...lessonText.matchAll(/<aside class="bridge-lesson-comment">([\s\S]*?)<\/aside>\s*<img\b[^>]*src="([^"]+)"/gu)];
  assert.equal(comments.length, 3, `${locale}: only three comments, directly attached to evidence`);
  for (const [index, [asset, role]] of [
    ['figma-broken-comparison.png', 'frontend'],
    ['assistant-layer-target-local.png', 'ai'],
    ['figma-final-overview.png', 'backend'],
  ].entries()) {
    assert(comments[index][2].endsWith(asset), `${locale}: role comments on relevant evidence`);
    assert(comments[index][1].includes(`handoff-penguin-${role}-display.png`), `${locale}: the right speaker comments`);
  }
  const recipeText = readFileSync(resolve(root, recipes.source[locale]), 'utf8');
  const sections = recipeText.split(/^## /mu).slice(1, 9);
  const recipeAssets = [
    `diagrams/contexts-${locale}.svg`, `diagrams/identity-${locale}.svg`,
    `diagrams/structure-${locale}.svg`, `diagrams/interactions-${locale}.svg`,
    'screenshots/assistant-layer-local.png', `diagrams/structure-${locale}.svg`,
    `diagrams/content-${locale}.svg`, `diagrams/roles-${locale}.svg`,
  ];
  for (const [index, asset] of recipeAssets.entries()) {
    assert(sections[index]?.startsWith(`${index + 1}.`), `${locale}: recipe ${index + 1} exists`);
    assert(imageSources(sections[index]).some((src) => src.endsWith(`/assets/tutorial/${asset}`)), `${locale}: recipe ${index + 1} has its relevant illustration`);
  }
}
const expectedDiagrams = manifest.locales.flatMap((locale) => concepts.map((concept) => `${concept}-${locale}.svg`)).sort();
assert.deepEqual(readdirSync(resolve(tutorial, 'diagrams')).filter((name) => name.endsWith('.svg')).sort(), expectedDiagrams, 'ten intentional SVG concepts in all three locales');
console.log(`Tutorial evidence verified: 5 native pages, ${expectedDiagrams.length} editable diagrams, ${provenance.captures.length} real captures, localized story evidence and all eight illustrated recipes (${images} image placements).`);
