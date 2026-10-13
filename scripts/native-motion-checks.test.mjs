import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  nativeTransform, nativePresentation, captionLines, assertCueReadingTime, containsRectangle, assertSourceTimeline, assertContinuousInterval, assertNoFabricatedMotion,
  assertCue, cueIsActive, strokeMasks, insideStrokeMask, compareNativePixels,
} from './native-motion-checks.mjs';

const render = { width: 1920, height: 1080, viewport: { left: 64, top: 96, width: 1792, height: 920 } };
const crop = { left: 10, top: 20, width: 800, height: 600 };
const cue = { startSeconds: 1, endSeconds: 2, label: { ru: 'Имя', en: 'Name', zh: '名称' }, highlights: [{ left: 20, top: 30, width: 160, height: 40 }] };

test('native camera centers, preserves padding and never upscales', () => {
  const actual = nativeTransform(crop, render);
  assert.equal(actual.scale, 1);
  assert.deepEqual([actual.width, actual.height, actual.left, actual.top], [800, 600, 560, 256]);
  const downsampled = nativeTransform({ left: 0, top: 0, width: 3024, height: 1748 }, render);
  assert(downsampled.scaleX <= 1 && downsampled.scaleY <= 1);
  assert(downsampled.top >= 96 && downsampled.top + downsampled.height <= 1016);
  assert.throws(() => nativeTransform({ ...crop, left: -1 }, render));
  assert.throws(() => nativeTransform(crop, { ...render, viewport: { ...render.viewport, top: 300 } }));
});

test('actual VFR timestamps are accepted, invented ordering is not', () => {
  assertSourceTimeline([0, .042, .072, .115, .531]);
  for (const pts of [[0], [0, 0], [0, -.01], [0, .1, .09], [0, Infinity]]) assert.throws(() => assertSourceTimeline(pts));
});

test('one contiguous interval uses natural timing', () => {
  assertContinuousInterval({ startSeconds: 2, endSeconds: 5, playbackRate: 1 }, 6);
  for (const interval of [
    { startSeconds: -1, endSeconds: 2 }, { startSeconds: 2, endSeconds: 2 },
    { startSeconds: 0, endSeconds: 7 }, { startSeconds: 0, endSeconds: 3, playbackRate: 2 },
  ]) assert.throws(() => assertContinuousInterval(interval, 6));
});

test('v3 cannot accept screenshot holds, montage segments or invented cursor paths', () => {
  assertNoFabricatedMotion({ actionFollowingCursorCaptured: false, inputMethod: 'per-character-paste' });
  for (const key of ['pointer', 'keys', 'holdMs', 'stages', 'frames', 'segments', 'interpolation', 'syntheticCursor']) {
    assert.throws(() => assertNoFabricatedMotion({ [key]: [] }), new RegExp(key));
  }
});

test('editorial cues stay within source coordinates and actual clip time', () => {
  assertCue(cue, crop, 3);
  assert.throws(() => assertCue({ ...cue, endSeconds: 4 }, crop, 3));
  assert.throws(() => assertCue({ ...cue, startSeconds: -1 }, crop, 3));
  assert.throws(() => assertCue({ ...cue, label: { ru: 'Имя' } }, crop, 3));
  assert.throws(() => assertCue({ ...cue, highlights: [{ left: 0, top: 0, width: 50, height: 20 }] }, crop, 3));
});

test('only the final cue owns the exact terminal CFR instant', () => {
  const first = { startSeconds: 0, endSeconds: 2 };
  const last = { startSeconds: 2, endSeconds: 7.8 };
  assert.equal(cueIsActive(first, 2, 7.8), false);
  assert.equal(cueIsActive(last, 2, 7.8), true);
  assert.equal(cueIsActive(last, 7.8, 7.8), true);
  assert.equal(cueIsActive(last, 7.8 + 1 / 30, 7.8), false);
  assert.equal(cueIsActive(last, 7.8, 7.8 + 1 / 30), false);
});

test('stroke mask does not authorize changes to a control interior', () => {
  const masks = strokeMasks(cue.highlights, nativeTransform(crop, render));
  assert(insideStrokeMask(10, 10, masks[0]));
  assert.equal(insideStrokeMask(90, 30, masks[0]), false);
});

test('lossless evidence comparison permits only narrow stroke pixels', () => {
  const width = 128; const height = 128;
  const expected = Buffer.alloc(width * height * 3, 100);
  const actual = Buffer.from(expected);
  const masks = [{ left: 20, top: 20, width: 80, height: 80, margin: 2 }];
  actual.fill(255, (20 * width + 30) * 3, (20 * width + 31) * 3);
  assert(compareNativePixels(expected, actual, { width, height, masks, exact: true }).verifiedPixels > width * height * .75);
  actual.fill(255, (60 * width + 60) * 3, (60 * width + 61) * 3);
  assert.throws(() => compareNativePixels(expected, actual, { width, height, masks, exact: true }), /lossless/);
});

test('compressed comparison catches a local forged field even when global error is small', () => {
  const width = 320; const height = 320;
  const expected = Buffer.alloc(width * height * 3, 100);
  const harmless = Buffer.alloc(expected.length, 102);
  assert.equal(compareNativePixels(expected, harmless, { width, height }).meanError, 2);
  const forged = Buffer.from(expected);
  for (let y = 64; y < 80; y++) for (let x = 64; x < 80; x++) forged.fill(255, (y * width + x) * 3, (y * width + x + 1) * 3);
  assert.throws(() => compareNativePixels(expected, forged, { width, height }), /local RGB error/);
});

test('oversized overlay footprints cannot exempt most of the native image', () => {
  const width = 64; const height = 64;
  const pixels = Buffer.alloc(width * height * 3);
  assert.throws(() => compareNativePixels(pixels, pixels, { width, height, masks: [{ left: 0, top: 0, width: 64, height: 64, margin: 64 }] }), /one quarter/);
});


test('subject-fit presentation follows native geometry with even dimensions and reserved caption matte', () => {
  const settings = { ...render, layout: 'subject-fit', padding: 24, captionHeight: 96, captionFontSize: 32 };
  for (const subject of [crop, { left: 0, top: 250, width: 860, height: 1050 }, { left: 17, top: 21, width: 771, height: 451 }, { left: 0, top: 0, width: 3024, height: 1748 }]) {
    const p = nativePresentation(subject, settings);
    const t = p.nativeTransform;
    assert.equal(p.width % 2, 0); assert.equal(p.height % 2, 0);
    assert.deepEqual([t.left, t.top], [24, 96]);
    assert.equal(t.width, p.viewport.width); assert.equal(t.height, p.viewport.height);
    assert(t.scaleX <= 1 && t.scaleY <= 1, 'subject pixels are never enlarged');
    assert.equal(p.width - t.width >= 48 && p.width - t.width <= 49, true);
    assert.equal(p.height - t.height >= 120 && p.height - t.height <= 121, true);
    assert(p.caption.top + p.caption.height < t.top, 'caption does not cover genuine UI');
  }
  assert.deepEqual([nativePresentation(crop, settings).width, nativePresentation(crop, settings).height], [848, 720]);
  assert.throws(() => nativePresentation(crop, { ...settings, padding: 0 }));
});

test('a declared fixed detail crop must fit the sanitized source in both axes', () => {
  const source = { left: 0, top: 0, width: 2170, height: 1404 };
  assert(containsRectangle(source, { left: 1190, top: 130, width: 750, height: 520 }));
  for (const invalid of [{ left: 1190, top: 130, width: 981, height: 520 }, { left: 10, top: 1000, width: 100, height: 405 }]) {
    assert.equal(containsRectangle(source, invalid), false);
  }
  assert.throws(() => assertCue({ ...cue, highlights: [{ left: 740, top: 30, width: 200, height: 40 }] }, crop, 3));
});

test('localized captions wrap on whole Latin words and CJK characters without font shrinking', () => {
  const p = nativePresentation({ ...crop, width: 300 }, { ...render, layout: 'subject-fit', padding: 24, captionHeight: 96, captionFontSize: 32 });
  assert.deepEqual(captionLines('Select hero-copy', p), ['Select', 'hero-copy']);
  assert.deepEqual(captionLines('检查生成的标签', p), ['检查生成的标签']);
  assert.throws(() => captionLines('a'.repeat(30), p), /token must fit/);
  assert.throws(() => captionLines('select select select select select select select', p), /two-line/);
});

test('caption reading floor merges adjacent equal wording but rejects rushed changes', () => {
  const make = (start, end, text) => ({ startSeconds: start, endSeconds: end, label: { ru: text, en: text, zh: text } });
  assertCueReadingTime([make(0, 2, 'Name saved')]);
  assertCueReadingTime([make(0, .3, 'Name saved'), make(.3, 2, 'Name saved')]);
  assert.throws(() => assertCueReadingTime([make(0, .3, 'Name saved'), make(.4, 2, 'Name saved')]), /caption needs/);
  assert.throws(() => assertCueReadingTime([make(0, 1.3, 'Check the generated page metadata tag')]), /caption needs/);
  assert.throws(() => assertCueReadingTime([make(0, .9, '检查生成的标签')]), /caption needs/);
});
