import assert from 'node:assert/strict';

export const nativeClipIds = ['page-metadata', 'rename-title', 'repair-copy', 'move-actions', 'button-states', 'local-action', 'repeat-check'];

export function assertRectangle(value, label = 'rectangle') {
  assert.deepEqual(Object.keys(value).sort(), ['height', 'left', 'top', 'width'], `${label}: rectangle fields`);
  for (const [key, number] of Object.entries(value)) {
    assert(Number.isInteger(number) && number >= (key === 'width' || key === 'height' ? 1 : 0), `${label}: nonnegative integer geometry`);
  }
}

export const containsRectangle = (outer, inner) => inner.left >= outer.left && inner.top >= outer.top
  && inner.left + inner.width <= outer.left + outer.width && inner.top + inner.height <= outer.top + outer.height;

export function nativeTransform(crop, render) {
  assertRectangle(crop, 'native crop');
  assertRectangle(render.viewport, 'presentation viewport');
  assert(containsRectangle({ left: 0, top: 0, width: render.width, height: render.height }, render.viewport), 'viewport stays inside presentation');
  const scale = Math.min(1, render.viewport.width / crop.width, render.viewport.height / crop.height);
  const width = Math.round(crop.width * scale);
  const height = Math.round(crop.height * scale);
  return {
    crop, scale, scaleX: width / crop.width, scaleY: height / crop.height,
    left: render.viewport.left + Math.floor((render.viewport.width - width) / 2),
    top: render.viewport.top + Math.floor((render.viewport.height - height) / 2), width, height,
  };
}


// The output follows the genuine subject crop, not an arbitrary cinema frame.
// Even dimensions keep yuv420p valid; extra rounding is only empty matte.
export function nativePresentation(crop, render) {
  assert.equal(render.layout, 'subject-fit');
  assert.equal(render.padding, 24);
  assert.equal(render.captionHeight, 96);
  assert.equal(render.captionFontSize, 32);
  const source = nativeTransform(crop, render);
  const even = (value) => Math.ceil(value / 2) * 2;
  return {
    width: even(source.width + render.padding * 2),
    height: even(source.height + render.captionHeight + render.padding),
    viewport: { left: render.padding, top: render.captionHeight, width: source.width, height: source.height },
    caption: { left: render.padding, top: 12, width: source.width, height: 76, fontSize: render.captionFontSize, lineHeight: 40 },
    nativeTransform: { ...source, left: render.padding, top: render.captionHeight },
  };
}

// Conservative width budget; preserve whole Latin words and allow CJK wrapping.
export function captionLines(text, presentation) {
  const { width, fontSize } = presentation.caption;
  const measure = (value) => [...value].reduce((sum, character) => sum + (/[^\u0000-\u024f\u0400-\u04ff]/u.test(character) ? 1 : .66) * fontSize, 0);
  const tokens = text.match(/[\u3400-\u9fff]|[^\s\u3400-\u9fff]+|\s+/gu) || [];
  const lines = []; let line = '';
  for (const token of tokens) {
    assert(measure(token.trim()) <= width, 'caption token must fit without shrinking');
    if (line.trim() && measure(line + token) > width) { lines.push(line.trim()); line = token.trimStart(); }
    else line += token;
  }
  if (line.trim()) lines.push(line.trim());
  assert(lines.length >= 1 && lines.length <= 2, 'caption fits the reserved two-line matte');
  return lines;
}

// A floor, not a claim that human comprehension has been proved. Adjacent
// identical text is one reading interval even if its outline changes.
export function assertCueReadingTime(cues) {
  for (const locale of ['ru', 'en', 'zh']) {
    const groups = [];
    for (const cue of cues) {
      const last = groups.at(-1);
      if (last && last.text === cue.label[locale] && Math.abs(last.end - cue.startSeconds) < 1e-9) last.end = cue.endSeconds;
      else groups.push({ text: cue.label[locale], start: cue.startSeconds, end: cue.endSeconds });
    }
    for (const group of groups) {
      const cjk = (group.text.match(/[\u3400-\u9fff]/gu) || []).length;
      const words = (group.text.replace(/[\u3400-\u9fff]/gu, ' ').match(/[\p{L}\p{N}]+(?:[-+:=][\p{L}\p{N}]+)*/gu) || []).length;
      const minimum = Math.max(1.2, .4 + words / 3 + cjk / 7);
      assert(group.end - group.start + .001 >= minimum, `${locale} caption needs ${minimum.toFixed(2)}s: ${group.text}`);
    }
  }
}

export function assertSourceTimeline(pts, label = 'native source') {
  assert(Array.isArray(pts) && pts.length > 1, `${label}: multiple decoded frames required`);
  for (const [index, time] of pts.entries()) {
    assert(Number.isFinite(time) && time >= 0, `${label}: finite nonnegative timestamps`);
    assert(index === 0 || time > pts[index - 1], `${label}: source timestamps strictly increase`);
  }
}

export function assertContinuousInterval({ startSeconds, endSeconds, playbackRate = 1 }, durationSeconds) {
  assert(Number.isFinite(startSeconds) && startSeconds >= 0, 'native interval: finite nonnegative start');
  assert(Number.isFinite(endSeconds) && endSeconds > startSeconds && endSeconds <= durationSeconds + .001, 'native interval: one valid source interval');
  assert.equal(playbackRate, 1, 'native interval: natural 1× timing only');
}

export function assertNoFabricatedMotion(value) {
  for (const key of ['pointer', 'keys', 'holdMs', 'stages', 'frames', 'segments', 'interpolation', 'syntheticCursor']) {
    assert(!Object.hasOwn(value, key), `native continuous evidence forbids ${key}`);
  }
}

export function assertCue(cue, crop, durationSeconds) {
  assertNoFabricatedMotion(cue);
  assert(Number.isFinite(cue.startSeconds) && cue.startSeconds >= 0, 'native cue starts inside excerpt');
  assert(Number.isFinite(cue.endSeconds) && cue.endSeconds > cue.startSeconds && cue.endSeconds <= durationSeconds + .001, 'native cue ends inside excerpt');
  assert.deepEqual(Object.keys(cue.label).sort(), ['en', 'ru', 'zh'], 'native cue has three localized labels');
  for (const text of Object.values(cue.label)) assert(typeof text === 'string' && text.trim() && text.length <= 96, 'native cue is concise');
  assert(Array.isArray(cue.highlights), 'native cue outlines are explicit');
  for (const outline of cue.highlights) {
    assertRectangle(outline, 'native cue outline');
    assert(containsRectangle(crop, outline), 'native cue marks retained actual UI only');
  }
}

// Ordinary CFR rounding may retain the source's terminal instant. Keep only
// the final caption inclusive there; adjacent cues must never overlap.
export function cueIsActive(cue, timeSeconds, durationSeconds) {
  const finalEndpoint = Math.abs(cue.endSeconds - durationSeconds) <= 1e-9;
  return timeSeconds >= cue.startSeconds && (timeSeconds < cue.endSeconds
    || (finalEndpoint && timeSeconds <= cue.endSeconds));
}

// A stroke is a narrow disclosed footprint, never permission to replace the
// text/control inside a rectangle. Coordinates are local to the native bitmap.
export function strokeMasks(highlights, transform, margin = 6) {
  return highlights.map((outline) => ({
    left: (outline.left - transform.crop.left) * transform.scaleX,
    top: (outline.top - transform.crop.top) * transform.scaleY,
    width: outline.width * transform.scaleX, height: outline.height * transform.scaleY, margin,
  }));
}

export function insideStrokeMask(x, y, mask) {
  return x >= mask.left - mask.margin && x <= mask.left + mask.width + mask.margin
    && y >= mask.top - mask.margin && y <= mask.top + mask.height + mask.margin
    && (x <= mask.left + mask.margin || x >= mask.left + mask.width - mask.margin
      || y <= mask.top + mask.margin || y >= mask.top + mask.height - mask.margin);
}

export function compareNativePixels(expected, actual, { width, height, masks = [], exact = false, maxMeanError = 4, maxTileError = 12, tileSize = 32 } = {}) {
  assert(Number.isInteger(width) && width > 0 && Number.isInteger(height) && height > 0, 'decoded comparison dimensions');
  assert.equal(expected.length, width * height * 3, 'expected decoded RGB size');
  assert.equal(actual.length, expected.length, 'actual decoded RGB size');
  const tiles = new Map();
  let verifiedPixels = 0;
  let absoluteError = 0;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    if (masks.some((mask) => insideStrokeMask(x, y, mask))) continue;
    const offset = (y * width + x) * 3;
    let pixelError = 0;
    for (let channel = 0; channel < 3; channel++) {
      const error = Math.abs(expected[offset + channel] - actual[offset + channel]);
      if (exact) assert.equal(error, 0, 'lossless native poster preserves every pixel outside stroke footprints');
      pixelError += error;
    }
    absoluteError += pixelError;
    verifiedPixels++;
    const key = `${Math.floor(x / tileSize)},${Math.floor(y / tileSize)}`;
    const tile = tiles.get(key) || { error: 0, pixels: 0 };
    tile.error += pixelError;
    tile.pixels++;
    tiles.set(key, tile);
  }
  assert(verifiedPixels >= width * height * .75, 'editorial strokes cannot obscure more than one quarter of native evidence');
  const meanError = absoluteError / (verifiedPixels * 3);
  const worstTileError = Math.max(...[...tiles.values()].map((tile) => tile.error / (tile.pixels * 3)));
  assert(meanError <= maxMeanError, `native video mean RGB error ${meanError.toFixed(3)} exceeds ${maxMeanError}`);
  assert(worstTileError <= maxTileError, `native video local RGB error ${worstTileError.toFixed(3)} exceeds ${maxTileError}`);
  return { verifiedPixels, meanError, worstTileError };
}
