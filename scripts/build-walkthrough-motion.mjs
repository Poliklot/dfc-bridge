// Real editor states only: no interpolated pointer, redrawn controls or overlays.
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const assets = resolve(root, 'assets/tutorial');
const motion = resolve(assets, 'motion');
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const temporary = mkdtempSync(resolve(tmpdir(), 'dfc-motion-'));
const clips = [
  { id: 'rename-title', action: 'Title mobile → hero-title. Layer identity only; product text remains unchanged.', prefix: 'rename', holds: [1400, 1000, 600, 1000, 2000] },
  { id: 'move-actions', action: 'Cut the whole hero-actions, select existing hero-copy, paste as its last child. Both controls and Auto Layout retained.', prefix: 'move', holds: [1600, 900, 1100, 2400] },
];
const crop = { left: 40, top: 108, width: 472, height: 528 };
const manifest = {
  schemaVersion: 1, kind: 'native-ui-step-sequence', capturedAt: '2026-10-11',
  fileKey: 'yCIbd7pIabjIepkkncPPYl', pageName: '01 · До разметки',
  captureMethod: 'CUA screenshots of actual Chrome Figma editor states, assembled with explicit holds. Not a continuous screen recording.',
  transform: 'One fixed lossless rectangular crop per clip; held states, no interpolation, synthetic padding, compositing or editor overlays.',
  sourceScope: 'Separate imported QA copy only. Shipped archive and original teaching file unchanged. These actions do not claim Ready.',
  clips: [],
};
try {
  for (const clip of clips) {
    const frames = [];
    const lines = [];
    for (let index = 0; index < clip.holds.length; index++) {
      const sourceFile = `source/${clip.prefix}-${String(index + 1).padStart(2, '0')}.png`;
      const bytes = readFileSync(resolve(motion, sourceFile));
      const { width, height } = await sharp(bytes).metadata();
      const frame = resolve(temporary, `${clip.id}-${index}.png`);
      await sharp(bytes).extract(crop).png().toFile(frame);
      frames.push({ sourceFile, sha256: hash(bytes), width, height, holdMs: clip.holds[index] });
      lines.push(`file '${frame}'`, `duration ${clip.holds[index] / 1000}`);
      if (index === 0) writeFileSync(resolve(motion, `${clip.id}.png`), readFileSync(frame));
    }
    lines.push(`file '${resolve(temporary, `${clip.id}-${frames.length - 1}.png`)}'`);
    const list = resolve(temporary, `${clip.id}.txt`);
    writeFileSync(list, lines.join('\n'));
    const durationSeconds = clip.holds.reduce((a, b) => a + b, 0) / 1000;
    const common = ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-t', String(durationSeconds)];
    execFileSync('ffmpeg', [...common, '-vf', 'fps=10', '-an', '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', resolve(motion, `${clip.id}.mp4`)]);
    execFileSync('ffmpeg', [...common, '-filter_complex', 'fps=10,split[a][b];[a]palettegen[p];[b][p]paletteuse', '-an', '-loop', '0', resolve(motion, `${clip.id}.gif`)]);
    manifest.clips.push({ id: clip.id, action: clip.action, crop, frames, output: {
      file: `${clip.id}.mp4`, poster: `${clip.id}.png`, gif: `${clip.id}.gif`,
      sha256: hash(readFileSync(resolve(motion, `${clip.id}.mp4`))),
      posterSha256: hash(readFileSync(resolve(motion, `${clip.id}.png`))),
      gifSha256: hash(readFileSync(resolve(motion, `${clip.id}.gif`))),
      width: crop.width, height: crop.height, durationSeconds,
    }});
  }
  writeFileSync(resolve(motion, 'provenance.json'), JSON.stringify(manifest, null, 2) + '\n');
  const provenancePath = resolve(assets, 'capture-provenance.json');
  const provenance = JSON.parse(readFileSync(provenancePath));
  for (const [id, height] of [['desktop', 464], ['mobile', 432]]) {
    const source = `motion/source/tree-${id}.png`;
    const bytes = readFileSync(resolve(assets, source));
    const dimensions = await sharp(bytes).metadata();
    const treeCrop = { left: 40, top: 108, width: 472, height };
    const file = `screenshots/tree-${id}.png`;
    await sharp(bytes).extract(treeCrop).png().toFile(resolve(assets, file));
    const record = {
      file, kind: 'native-figma-screenshot', capturedAt: '2026-10-11', sourceFrame: `tree-${id}`,
      sourceSha256: hash(bytes), sourceDimensions: { width: dimensions.width, height: dimensions.height },
      crop: treeCrop, interface: 'Figma Design in Chrome', fileKey: manifest.fileKey,
      sourceCaptureFile: source, sourcePageName: manifest.pageName, sourceRevision: 'QA-copy-before-motion-2026-10-11',
      captureNotes: 'Independent native capture. Hero, copy and both controls expanded; artwork internals omitted. HTML pair is not a composited editor screenshot.',
    };
    const old = provenance.captures.findIndex((item) => item.file === file);
    if (old < 0) provenance.captures.push(record); else provenance.captures[old] = record;
  }
  writeFileSync(provenancePath, JSON.stringify(provenance, null, 2) + '\n');
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
