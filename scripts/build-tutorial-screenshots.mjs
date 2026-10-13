import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Detail crops are derivatives of retained, registered native screenshots.
// Never redraw, resize, composite or restamp the source capture's date.
const tutorial = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/tutorial');
const manifest = JSON.parse(readFileSync(resolve(tutorial, 'capture-provenance.json')));
const captures = new Map(manifest.captures.map((capture) => [capture.file, capture]));
const checkOnly = process.argv.includes('--check');
let checked = 0;
for (const capture of captures.values()) {
  if (!capture.derivedFromCapture) continue;
  const source = captures.get(capture.derivedFromCapture);
  assert(source && source !== capture, `${capture.file}: registered native source required`);
  assert(!source.derivedFromCapture, 'crop directly from a retained capture, not a chain of edited derivatives');
  assert.equal(capture.sourceCaptureFile, source.file, 'immediate source is the registered screenshot');
  for (const field of ['capturedAt', 'sourceFrame', 'interface', 'fileKey', 'sourcePageName', 'sourceRevision', 'teachingFileSha256', 'reusedEvidence']) {
    assert.equal(capture[field], source[field], `${capture.file}: inherit ${field}, do not claim new capture evidence`);
  }
  const sourcePath = resolve(tutorial, source.file);
  const outputPath = resolve(tutorial, capture.file);
  assert(sourcePath.startsWith(`${tutorial}${sep}`) && outputPath.startsWith(`${tutorial}${sep}`), 'source and output stay in tutorial assets');
  const bytes = readFileSync(sourcePath);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), capture.sourceSha256, `${capture.file}: source changed; review before rebuilding`);
  const meta = await sharp(bytes).metadata();
  assert.deepEqual(capture.sourceDimensions, { width: meta.width, height: meta.height });
  const crop = capture.crop;
  assert(Object.values(crop).every(Number.isInteger) && crop.left >= 0 && crop.top >= 0 && crop.width > 0 && crop.height > 0
    && crop.left + crop.width <= meta.width && crop.top + crop.height <= meta.height, 'positive in-bounds source rectangle');
  const result = sharp(bytes).extract(crop);
  if (checkOnly) {
    const outputMeta = await sharp(outputPath).metadata();
    assert.equal(outputMeta.width, crop.width);
    assert.equal(outputMeta.height, crop.height);
    assert((await result.ensureAlpha().raw().toBuffer()).equals(await sharp(outputPath).ensureAlpha().raw().toBuffer()), `${capture.file}: exact source pixels, no overlays or upscaling`);
  } else {
    await result.png().toFile(outputPath);
  }
  checked += 1;
}
assert(checked > 0, 'at least one registered detail crop');
console.log(`${checkOnly ? 'Verified' : 'Built'} ${checked} lossless native screenshot detail crops.`);
