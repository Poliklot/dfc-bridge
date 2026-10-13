// Native editor states are evidence. Cursors, outlines and captions are disclosed editorial cues.
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const assets = resolve(root, 'assets/tutorial');
const motion = resolve(assets, 'motion');
const storyboardBytes = readFileSync(resolve(motion, 'storyboard.json'));
const storyboard = JSON.parse(storyboardBytes);
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const rendererSha256 = hash(readFileSync(new URL(import.meta.url)));
const escape = (text) => String(text).replace(/[&<>"']/gu, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);
const arguments_ = process.argv.slice(2);
const option = (name) => {
  const index = arguments_.indexOf(name);
  if (index < 0) return null;
  assert(arguments_[index + 1] && !arguments_[index + 1].startsWith('--'), `${name} requires a value`);
  return arguments_[index + 1];
};
const selectedClip = option('--clip');
const selectedLocale = option('--locale');
assert(arguments_.every((argument, index) => ['--clip', '--locale'].includes(argument) || ['--clip', '--locale'].includes(arguments_[index - 1])), 'Use only --clip <id> and --locale <ru|en|zh>');
assert.equal(storyboard.schemaVersion, 2);
assert.equal(storyboard.kind, 'annotated-native-step-sequence');
assert(!storyboard.draft, 'Replace draft coordinates with grounded native captures before generating');
const { render } = storyboard;
assert.deepEqual([render.width, render.height, render.fps, render.gifFps, render.crf], [1280, 720, 24, 12, 12]);
assert.deepEqual(storyboard.locales, ['ru', 'en', 'zh']);
const locales = selectedLocale ? [selectedLocale] : storyboard.locales;
assert(locales.every((locale) => storyboard.locales.includes(locale)), 'Unknown locale');
const clips = selectedClip ? storyboard.clips.filter(({ id }) => id === selectedClip) : storyboard.clips;
assert(clips.length > 0, 'No matching clips');
assert.equal(new Set(storyboard.clips.map(({ id }) => id)).size, storyboard.clips.length, 'Clip IDs are unique');
const sourcePath = (file) => {
  assert.match(file, /^source\/(?:[a-z0-9][a-z0-9-]*\/)*[a-z0-9][a-z0-9-]*\.png$/u, 'Native source is a PNG inside motion/source');
  const path = resolve(motion, file);
  assert(path.startsWith(`${motion}${sep}`) && existsSync(path), `Missing native capture: ${file}`);
  return path;
};
const progressLabels = { ru: ['Было', 'Правим', 'Стало'], en: ['Before', 'Change', 'After'], zh: ['之前', '修改', '之后'] };
const temporary = mkdtempSync(resolve(tmpdir(), 'dfc-motion-'));
const manifestPath = resolve(motion, 'provenance.json');
const oldManifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath)) : null;
const manifest = {
  schemaVersion: 2, kind: 'annotated-native-step-sequence', capturedAt: storyboard.capturedAt,
  fileKey: storyboard.fileKey, pageName: storyboard.pageName,
  captureMethod: 'CUA screenshots of real native Figma editor states, held as a discrete step sequence. Not a continuous screen recording.',
  transform: 'Native pixels are only cropped and optionally downsampled, never upscaled or redrawn. Matte, stage text, vector cursor, click rings and stroke-only focus outlines are editorial overlays, not native Figma UI or recorded pointer motion.',
  sourceScope: 'Separate imported QA copy only. Shipped archive and original teaching file unchanged. Individual teaching actions do not claim Ready.',
  storyboardSha256: hash(storyboardBytes), rendererSha256, overlayCoordinateSpace: 'source-pixels', render,
  clips: oldManifest?.schemaVersion === 2 ? oldManifest.clips.filter(({ id }) => storyboard.clips.some((clip) => clip.id === id)) : [],
};
const pendingOutputs = [];

const cursorAt = (path, timeMs) => {
  if (!path.length) return null;
  const nextIndex = path.findIndex(({ atMs }) => atMs > timeMs);
  if (nextIndex === 0) return path[0];
  if (nextIndex < 0) return path.at(-1);
  const previous = path[nextIndex - 1];
  const next = path[nextIndex];
  const ratio = (timeMs - previous.atMs) / (next.atMs - previous.atMs);
  const eased = ratio * ratio * (3 - 2 * ratio);
  return { x: previous.x + (next.x - previous.x) * eased, y: previous.y + (next.y - previous.y) * eased };
};

function nativeTransform(crop) {
  assert(['left', 'top', 'width', 'height'].every((key) => Number.isInteger(crop[key]) && crop[key] >= (['width', 'height'].includes(key) ? 1 : 0)), 'Valid native crop');
  const scale = Math.min(1, render.viewport.width / crop.width, render.viewport.height / crop.height);
  const width = Math.round(crop.width * scale);
  const height = Math.round(crop.height * scale);
  const transform = {
    crop, scale, scaleX: width / crop.width, scaleY: height / crop.height,
    left: render.viewport.left + Math.floor((render.viewport.width - width) / 2),
    top: render.viewport.top + Math.floor((render.viewport.height - height) / 2), width, height,
  };
  assert(transform.left >= 48 && transform.top >= 88 && transform.left + width <= render.width - 48 && transform.top + height <= render.height - 64, 'Native viewport preserves header, inner fields and control clearance');
  return transform;
}

function overlay(stage, locale, timeMs, transform) {
  const { left, top, scaleX, scaleY, crop } = transform;
  const coordinate = ({ x, y }) => ({ x: left + (x - crop.left) * scaleX, y: top + (y - crop.top) * scaleY });
  const progress = ['before', 'action', 'after'].indexOf(stage.phase);
  const markers = progressLabels[locale].map((label, index) => `<circle cx="${974 + index * 100}" cy="28" r="4" fill="${index === progress ? '#117e91' : '#cad3d8'}"/><text x="${974 + index * 100}" y="55" text-anchor="middle" font-size="15" fill="${index === progress ? '#193943' : '#687982'}" font-weight="${index === progress ? 'bold' : 'normal'}">${escape(label)}</text>`).join('');
  const highlights = stage.highlights.map((rect) => {
    const point = coordinate({ x: rect.left, y: rect.top });
    return `<rect x="${point.x}" y="${point.y}" width="${rect.width * scaleX}" height="${rect.height * scaleY}" rx="5" fill="none" stroke="#ffffff" stroke-width="5"/><rect x="${point.x}" y="${point.y}" width="${rect.width * scaleX}" height="${rect.height * scaleY}" rx="5" fill="none" stroke="#117e91" stroke-width="2.5"/>`;
  }).join('');
  const pointer = cursorAt(stage.pointer, timeMs);
  const cursor = pointer ? (() => {
    const point = coordinate(pointer);
    return `<path transform="translate(${point.x} ${point.y})" d="M 0 0 L 0 31 L 8.5 23 L 15 37 L 21 34 L 14.5 20 L 27 20 Z" fill="#182229" stroke="#ffffff" stroke-width="2.2" stroke-linejoin="round"/>`;
  })() : '';
  const rings = stage.pointer.filter((point) => point.click && timeMs >= point.atMs && timeMs < point.atMs + 450).map((point) => {
    const center = coordinate(point);
    const age = (timeMs - point.atMs) / 450;
    return `<circle cx="${center.x}" cy="${center.y}" r="${8 + age * 13}" fill="none" stroke="#ffffff" stroke-width="4" opacity="${1 - age}"/><circle cx="${center.x}" cy="${center.y}" r="${8 + age * 13}" fill="none" stroke="#117e91" stroke-width="2" opacity="${1 - age}"/>`;
  }).join('');
  const keys = (stage.keys ?? []).map((key, index) => `<rect x="${32 + index * 56}" y="58" width="44" height="26" rx="5" fill="#ffffff" stroke="#cad3d8"/><text x="${54 + index * 56}" y="77" text-anchor="middle" font-size="17" fill="#193943">${escape(key)}</text>`).join('');
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${render.width}" height="${render.height}"><g font-family="Arial Unicode MS,Arial,sans-serif"><text x="32" y="47" font-size="26" fill="#193943">${escape(stage.label[locale])}</text>${markers}${keys}</g>${highlights}${rings}${cursor}</svg>`);
}

try {
  for (const clip of clips) {
    assert.match(clip.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/u);
    assert(clip.action && clip.evidenceFact && clip.sourcePageName && clip.sourceInterface && clip.stages.length >= 3, `${clip.id}: action, observed fact, native page/interface and before/action/after states are required`);
    assert.equal(clip.stages[0].phase, 'before');
    assert.equal(clip.stages.at(-1).phase, 'after');
    assert(clip.stages.some(({ phase }) => phase === 'action'));
    const defaultTransform = nativeTransform(clip.crop);
    const frames = [];
    const bases = [];
    for (const stage of clip.stages) {
      const crop = stage.crop ?? clip.crop;
      const transform = nativeTransform(crop);
      assert(['before', 'action', 'after'].includes(stage.phase));
      assert(Number.isInteger(stage.holdMs) && stage.holdMs >= 500 && stage.holdMs % 250 === 0, `${clip.id}: hold durations use 250ms units`);
      for (const locale of storyboard.locales) assert(typeof stage.label[locale] === 'string' && stage.label[locale].length > 0 && stage.label[locale].length <= 64, `${clip.id}: short ${locale} stage caption`);
      assert(Array.isArray(stage.pointer) && Array.isArray(stage.highlights));
      assert(stage.keys === undefined || (Array.isArray(stage.keys) && stage.keys.length <= 4 && stage.keys.every((key) => typeof key === 'string' && key.length > 0 && key.length <= 3)), `${clip.id}: compact actual shortcut cues`);
      let lastTime = -1;
      for (const point of stage.pointer) {
        assert(Number.isInteger(point.atMs) && point.atMs >= 0 && point.atMs < stage.holdMs && point.atMs > lastTime, `${clip.id}: ordered pointer timing`);
        assert(Number.isFinite(point.x) && point.x >= crop.left && point.x < crop.left + crop.width && Number.isFinite(point.y) && point.y >= crop.top && point.y < crop.top + crop.height, `${clip.id}: pointer target is inside native crop`);
        assert(point.click === undefined || typeof point.click === 'boolean');
        lastTime = point.atMs;
      }
      for (const rect of stage.highlights) assert(['left', 'top', 'width', 'height'].every((key) => Number.isInteger(rect[key])) && rect.left >= crop.left && rect.top >= crop.top && rect.width > 0 && rect.height > 0 && rect.left + rect.width <= crop.left + crop.width && rect.top + rect.height <= crop.top + crop.height, `${clip.id}: focus outline is inside native crop`);
      const bytes = readFileSync(sourcePath(stage.sourceFile));
      const { width, height } = await sharp(bytes).metadata();
      assert(crop.left + crop.width <= width && crop.top + crop.height <= height, `${clip.id}: crop inside raw capture`);
      const cropped = await sharp(bytes).extract(crop).png().toBuffer();
      const native = transform.scale === 1 ? cropped : await sharp(cropped).resize(transform.width, transform.height, { fit: 'fill', kernel: 'lanczos3' }).png().toBuffer();
      const base = await sharp({ create: { width: render.width, height: render.height, channels: 4, background: '#edf2f5' } }).composite([{ input: native, left: transform.left, top: transform.top }]).png().toBuffer();
      bases.push(base);
      frames.push({ ...stage, crop, nativeTransform: transform, sha256: hash(bytes), width, height, cropSha256: hash(cropped), nativeBitmapSha256: hash(native) });
    }
    const configurationSha256 = hash(JSON.stringify({ rendererSha256, render, clip, sources: frames.map(({ sha256 }) => sha256) }));
    const existingClip = manifest.clips.find(({ id }) => id === clip.id);
    const outputs = existingClip?.configurationSha256 === configurationSha256 ? existingClip.outputs.filter(({ locale }) => !locales.includes(locale)) : [];
    const durationSeconds = clip.stages.reduce((total, { holdMs }) => total + holdMs, 0) / 1000;
    for (const locale of locales) {
      const frameDirectory = resolve(temporary, `${clip.id}-${locale}`);
      mkdirSync(frameDirectory);
      const exportDirectory = resolve(temporary, `${clip.id}-${locale}-exports`);
      mkdirSync(exportDirectory);
      let index = 0;
      for (const [stageIndex, stage] of clip.stages.entries()) {
        const count = stage.holdMs * render.fps / 1000;
        let lastStaticFrame;
        const staticAfter = (stage.pointer.at(-1)?.atMs ?? 0) + (stage.pointer.some(({ click }) => click) ? 450 : 0);
        for (let localFrame = 0; localFrame < count; localFrame++) {
          const timeMs = localFrame * 1000 / render.fps;
          const rendered = timeMs >= staticAfter && lastStaticFrame ? lastStaticFrame : await sharp(bases[stageIndex]).composite([{ input: overlay(stage, locale, timeMs, frames[stageIndex].nativeTransform) }]).png().toBuffer();
          if (timeMs >= staticAfter) lastStaticFrame = rendered;
          writeFileSync(resolve(frameDirectory, `${String(index).padStart(5, '0')}.png`), rendered);
          if (index === 0) writeFileSync(resolve(exportDirectory, `${clip.id}-${locale}.png`), rendered);
          index++;
        }
      }
      const file = `${clip.id}-${locale}.mp4`;
      const gif = `${clip.id}-${locale}.gif`;
      const poster = `${clip.id}-${locale}.png`;
      const common = ['-hide_banner', '-loglevel', 'error', '-y', '-framerate', String(render.fps), '-i', resolve(frameDirectory, '%05d.png')];
      execFileSync('ffmpeg', [...common, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(render.crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', resolve(exportDirectory, file)]);
      execFileSync('ffmpeg', [...common, '-filter_complex', `fps=${render.gifFps},split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=sierra2_4a`, '-an', '-loop', '0', resolve(exportDirectory, gif)]);
      outputs.push({ locale, file, gif, poster, sha256: hash(readFileSync(resolve(exportDirectory, file))), gifSha256: hash(readFileSync(resolve(exportDirectory, gif))), posterSha256: hash(readFileSync(resolve(exportDirectory, poster))), width: render.width, height: render.height, durationSeconds, fps: render.fps, gifFps: render.gifFps, crf: render.crf });
      for (const name of [file, gif, poster]) pendingOutputs.push({ file: name, path: resolve(exportDirectory, name) });
      console.log(`${clip.id} ${locale}: ${durationSeconds}s, ${index} frames, ${render.width}×${render.height}, native scales ${frames.map(({ nativeTransform: { scale } }) => scale.toFixed(3)).join('/')}`);
      rmSync(frameDirectory, { recursive: true, force: true });
    }
    const record = { id: clip.id, action: clip.action, evidenceFact: clip.evidenceFact, sourcePageName: clip.sourcePageName, sourceInterface: clip.sourceInterface, crop: clip.crop, nativeTransform: defaultTransform, configurationSha256, frames, outputs: outputs.sort((a, b) => storyboard.locales.indexOf(a.locale) - storyboard.locales.indexOf(b.locale)) };
    const oldIndex = manifest.clips.findIndex(({ id }) => id === clip.id);
    if (oldIndex < 0) manifest.clips.push(record); else manifest.clips[oldIndex] = record;
  }
  manifest.clips.sort((a, b) => storyboard.clips.findIndex(({ id }) => id === a.id) - storyboard.clips.findIndex(({ id }) => id === b.id));
  // Do not replace existing published assets if validation or encoding failed.
  for (const output of pendingOutputs) writeFileSync(resolve(motion, output.file), readFileSync(output.path));
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
