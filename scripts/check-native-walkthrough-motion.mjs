// Independent verification of retained native excerpts and their derivatives.
// The unavailable local original is documented, never claimed as CI-verified.
import assert from 'node:assert/strict';
import { readFileSync, existsSync, realpathSync, readdirSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import {
  nativeClipIds, assertRectangle, containsRectangle, nativePresentation, captionLines, assertCueReadingTime, assertSourceTimeline,
  assertContinuousInterval, assertNoFabricatedMotion, assertCue, cueIsActive, strokeMasks, compareNativePixels,
} from './native-motion-checks.mjs';

const repository = resolve(import.meta.dirname, '..');
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const fileSha = (file) => sha(readFileSync(file));
const ffmpeg = existsSync('/opt/homebrew/bin/ffmpeg') ? '/opt/homebrew/bin/ffmpeg' : 'ffmpeg';
const ffprobe = existsSync('/opt/homebrew/bin/ffprobe') ? '/opt/homebrew/bin/ffprobe' : 'ffprobe';
const jsonProbe = (file, frames = false) => JSON.parse(execFileSync(ffprobe, [
  '-v', 'error', '-show_streams', '-show_format', ...(frames ? ['-show_frames', '-show_entries', 'frame=best_effort_timestamp_time,width,height,duration_time'] : ['-count_frames']),
  '-of', 'json', file,
], { maxBuffer: 64 * 1024 * 1024 }));

function evidencePath(base, relative) {
  assert(typeof relative === 'string' && relative.trim(), 'native evidence path is explicit');
  const file = resolve(base, relative);
  assert(file.startsWith(base + sep) && existsSync(file), 'native evidence exists inside its declared directory: ' + relative);
  assert(realpathSync(file).startsWith(realpathSync(base) + sep), 'native evidence symlink cannot escape its declared directory');
  return file;
}

function sourceMetadata(info) {
  assert.equal(info.streams.length, 1, 'native excerpt has one video stream and no audio');
  const stream = info.streams[0];
  assert.equal(stream.codec_type, 'video');
  assert.equal(stream.sample_aspect_ratio, '1:1', 'native pixels are square');
  assert.deepEqual([stream.color_range, stream.color_space, stream.color_transfer, stream.color_primaries],
    ['tv', 'bt709', 'bt709', 'bt709'], 'native reference conversion must match the actual excerpt color encoding');
  const frames = info.frames.map((frame, index) => ({
    index, ptsSeconds: Number(frame.best_effort_timestamp_time), width: frame.width, height: frame.height,
    durationSeconds: Number(frame.duration_time) || 0,
  }));
  assertSourceTimeline(frames.map((frame) => frame.ptsSeconds));
  const first = frames[0].ptsSeconds;
  const last = frames.at(-1).ptsSeconds;
  const deltas = frames.slice(1).map((frame, index) => frame.ptsSeconds - frames[index].ptsSeconds).sort((a, b) => a - b);
  const median = deltas[Math.floor(deltas.length / 2)];
  return { frames, metadata: {
    width: stream.width, height: stream.height, codec: stream.codec_name, pixFmt: stream.pix_fmt,
    timeBase: stream.time_base, nominalFrameRate: stream.r_frame_rate,
    firstPtsSeconds: first, lastPtsSeconds: last, durationSeconds: last - first,
    coverageEndSeconds: last + (frames.at(-1).durationSeconds || median) - first,
    decodedFrames: frames.length, framePtsSha256: sha(JSON.stringify(frames.map((frame) => frame.ptsSeconds))),
    minimumFrameIntervalSeconds: deltas[0], medianFrameIntervalSeconds: median, maximumFrameIntervalSeconds: deltas.at(-1),
  } };
}

function decodeRgb(file, filter, width, height) {
  // Match the renderer's scalar conversion: SIMD YUV→RGB rounding differs
  // across CPUs. Keep exact RGB hashes/poster pixels rather than tolerating
  // a platform-dependent reconstruction of the same decoded YUV frame.
  const pixels = execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-cpuflags', '0', '-i', file, '-vf', filter,
    '-frames:v', '1', '-pix_fmt', 'rgb24', '-f', 'rawvideo', 'pipe:1'], { maxBuffer: width * height * 3 + 1024 });
  assert.equal(pixels.length, width * height * 3, 'one complete decoded RGB frame');
  return pixels;
}

const rgbConversion = 'scale=iw:ih:in_color_matrix=bt709:out_color_matrix=bt709:in_range=tv:out_range=full,format=rgba';
const bitmapFilter = (clip, transform) => `${rgbConversion},crop=${clip.crop.width}:${clip.crop.height}:${clip.crop.left}:${clip.crop.top}:exact=1,scale=${transform.width}:${transform.height}:flags=lanczos`;
const timelineFilter = (clip, capture, transform) => `trim=start=${capture.firstPtsSeconds + clip.trim.startSeconds}:end=${capture.firstPtsSeconds + clip.trim.endSeconds},setpts=PTS-STARTPTS,${bitmapFilter(clip, transform)},setsar=1,fps=30:start_time=0:round=near`;

function auditInputValues(clip) {
  if (!['rename-title', 'repair-copy'].includes(clip.id)) return;
  const values = clip.auditFrames.filter((frame) => frame.phase === 'action' && typeof frame.inputValue === 'string').map((frame) => frame.inputValue);
  assert(values.length >= 3, clip.id + ': at least three reviewed native intermediate input values');
  for (const [index, value] of values.entries()) {
    assert(value.trim(), clip.id + ': intermediate input is nonempty');
    assert(index === 0 || (value.length > values[index - 1].length && value.startsWith(values[index - 1])), clip.id + ': reviewed input grows by actual native insertion');
  }
}

export async function checkNativeMotion({ sourceRoot = resolve(repository, 'assets/tutorial/motion'), outputRoot = sourceRoot,
  storyboardPath = resolve(sourceRoot, 'native-storyboard.json'), requireComplete = true } = {}) {
  const storyboardBytes = readFileSync(storyboardPath);
  const storyboard = JSON.parse(storyboardBytes);
  const manifest = JSON.parse(readFileSync(evidencePath(outputRoot, 'native-provenance.json')));
  for (const document of [storyboard, manifest]) {
    assert.equal(document.schemaVersion, 3);
    assert.equal(document.kind, 'annotated-native-continuous-recording');
    assert.equal(document.fileKey, 'yCIbd7pIabjIepkkncPPYl', 'native actions use only the disposable QA copy');
    assert.equal(document.overlayCoordinateSpace, 'source-pixels');
  }
  assert.equal(manifest.storyboardSha256, sha(storyboardBytes), 'native outputs use the reviewed current storyboard');
  const rendererSha256 = sha(Buffer.concat([readFileSync(resolve(repository, 'scripts/build-native-walkthrough-motion.mjs')), readFileSync(resolve(repository, 'scripts/native-motion-checks.mjs'))]));
  assert.equal(manifest.rendererSha256, rendererSha256, 'native derivatives use the reviewed current renderer');
  assert.equal(manifest.capturedAt, storyboard.capturedAt);
  assert.deepEqual(storyboard.locales, ['ru', 'en', 'zh']);
  assert.deepEqual(storyboard.clips.map((clip) => clip.id), nativeClipIds);
  assert.deepEqual(manifest.plannedIds, nativeClipIds);
  assert.deepEqual(manifest.render, storyboard.render);
  const { render } = manifest;
  assert.deepEqual([render.width, render.height, render.fps, render.gifFps, render.crf, render.level], [1920, 1080, 30, 12, 12, '4.1']);
  assert.deepEqual(render.viewport, { left: 64, top: 96, width: 1792, height: 920 });
  assert.equal(new Set(manifest.clips.map((clip) => clip.id)).size, manifest.clips.length);
  assert.deepEqual(manifest.clips.map((clip) => clip.id), nativeClipIds.filter((id) => manifest.clips.some((clip) => clip.id === id)), 'native clips remain in narrative order');
  if (requireComplete) {
    assert.equal(manifest.complete, true, 'all seven continuous actions must pass before publishing');
    assert.deepEqual(manifest.clips.map((clip) => clip.id), nativeClipIds);
    assert(storyboard.clips.every((clip) => clip.approved === true));
  }
  const outputs = new Map();
  const auditProofs = new Set();
  let auditedFrames = 0;
  for (const clip of manifest.clips) {
    const plan = storyboard.clips.find((item) => item.id === clip.id);
    assert.equal(plan.approved, true, clip.id + ': source/crop/timestamps were reviewed');
    assert.equal(clip.kind, storyboard.kind);
    assertNoFabricatedMotion(clip);
    assertNoFabricatedMotion(plan);
    for (const field of ['action', 'evidenceFact', 'sourcePageName', 'sourceInterface', 'trim', 'crop', 'presentationPurpose', 'posterAtSeconds', 'cues']) {
      assert.deepEqual(clip[field], plan[field], clip.id + ': reviewed ' + field);
    }
    assert.match(clip.sourceInterface, /Figma/iu);
    assert.equal(clip.rendererSha256, rendererSha256);
    assert.equal(clip.configurationSha256, sha(JSON.stringify({ rendererSha256, render, clip: plan, sourceSha256: plan.sourceCapture.sha256 })));
    const capture = clip.sourceCapture;
    for (const [field, value] of Object.entries(plan.sourceCapture)) assert.deepEqual(capture[field], value, clip.id + ': source declaration ' + field);
    assert.match(capture.file, /^source\/video\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:webm|mkv|mov|mp4)$/u, 'only retained approved movie excerpts can supply native evidence');
    assert.equal(typeof capture.actionFollowingCursorCaptured, 'boolean', 'action-following pointer availability is explicit, never invented');
    assert.equal(Object.hasOwn(capture, 'cursorCaptured'), false, 'do not imply the parked native pointer is absent');
    assert.deepEqual(Object.keys(capture.origin).sort(), ['ciVerifies', 'endSeconds', 'localOriginalRetained', 'originalSha256', 'startSeconds'], 'original private pathname is not published');
    assert.match(capture.origin.originalSha256, /^[a-f0-9]{64}$/u);
    assert.equal(capture.origin.localOriginalRetained, true);
    assert.equal(capture.origin.ciVerifies, 'excerpt-only', 'CI does not verify the unavailable local original');
    assert(Number.isFinite(capture.origin.startSeconds) && capture.origin.startSeconds >= 0 && Number.isFinite(capture.origin.endSeconds) && capture.origin.endSeconds > capture.origin.startSeconds);
    const sourceFile = evidencePath(sourceRoot, capture.file);
    assert.equal(fileSha(sourceFile), capture.sha256, clip.id + ': reviewed native excerpt is unchanged');
    const source = sourceMetadata(jsonProbe(sourceFile, true));
    for (const [field, value] of Object.entries(source.metadata)) assert.deepEqual(capture[field], value, clip.id + ': actual decoded ' + field);
    assertRectangle(capture.originalFixedCrop, 'documented privacy crop from local original');
    assert.deepEqual([capture.width, capture.height], [capture.originalFixedCrop.width, capture.originalFixedCrop.height], clip.id + ': public excerpt retains only the fixed approved privacy crop');
    assert(typeof clip.presentationPurpose === 'string' && clip.presentationPurpose.trim(), clip.id + ': the fixed presentation crop has a declared evidence purpose');
    assert(capture.coverageEndSeconds <= 120, clip.id + ': publish the short approved excerpt, never the long private original');
    assert(Math.abs(capture.origin.endSeconds - capture.origin.startSeconds - capture.coverageEndSeconds) <= .1, clip.id + ': retained excerpt duration matches documented original range');
    assertRectangle(clip.crop);
    assert(source.frames.every((frame) => containsRectangle({ left: 0, top: 0, width: frame.width, height: frame.height }, clip.crop)), clip.id + ': fixed crop fits every decoded native frame');
    const presentation = nativePresentation(clip.crop, render);
    const transform = presentation.nativeTransform;
    assert.deepEqual(clip.presentation, presentation, clip.id + ': subject-fit dimensions and caption matte');
    assert.deepEqual(clip.nativeTransform, transform, clip.id + ': fixed crop/downsample only');
    assertContinuousInterval(clip.trim, capture.coverageEndSeconds);
    const duration = clip.trim.endSeconds - clip.trim.startSeconds;
    const firstSelected = source.frames.find((frame) => frame.ptsSeconds >= capture.firstPtsSeconds + clip.trim.startSeconds);
    assert.deepEqual(clip.timeline, { speed: 1, continuous: true, frameResampling: 'fps=30:start_time=0:round=near', sourceStartPtsSeconds: firstSelected.ptsSeconds,
      sourceTimeline: 'seconds relative to the first decoded source PTS', addedHolds: false, syntheticPointer: false });
    assert(Number.isFinite(clip.posterAtSeconds) && clip.posterAtSeconds >= 0 && clip.posterAtSeconds < duration);
    assertCueReadingTime(clip.cues);
    let previousCueEnd = 0;
    for (const cue of clip.cues) {
      assertCue(cue, clip.crop, duration);
      assert.equal(cue.startSeconds, previousCueEnd, clip.id + ': editorial cues cover the real trim without gaps or overlaps');
      for (const locale of storyboard.locales) captionLines(cue.label[locale], presentation);
      previousCueEnd = cue.endSeconds;
    }
    assert(Math.abs(clip.cues.at(-1).endSeconds - duration) <= 1e-9, clip.id + ': the final explanation reaches the native endpoint');
    assert.equal(clip.auditFrames.length, plan.auditFrames.length);
    assert(clip.auditFrames.length >= 3 && clip.auditFrames[0].phase === 'before' && clip.auditFrames.at(-1).phase === 'after' && clip.auditFrames.some((frame) => frame.phase === 'action'));
    auditInputValues(clip);
    let previousAuditTime = -1;
    for (const [index, audit] of clip.auditFrames.entries()) {
      for (const [field, value] of Object.entries(plan.auditFrames[index])) assert.deepEqual(audit[field], value, clip.id + ': reviewed audit ' + field);
      assert(audit.timeSeconds > previousAuditTime && audit.timeSeconds >= clip.trim.startSeconds && audit.timeSeconds < clip.trim.endSeconds, clip.id + ': chronological audited real actions');
      previousAuditTime = audit.timeSeconds;
      const frame = source.frames.find((item) => item.ptsSeconds >= capture.firstPtsSeconds + audit.timeSeconds);
      assert.equal(audit.sourceFrameIndex, frame.index);
      assert.equal(audit.sourcePtsSeconds, frame.ptsSeconds);
      const raw = decodeRgb(sourceFile, `select=eq(n\\,${frame.index})`, capture.width, capture.height);
      assert.equal(sha(raw), audit.sourceFrameSha256, clip.id + ': audit is a decoded original excerpt frame');
      const cropped = await sharp(raw, { raw: { width: capture.width, height: capture.height, channels: 3 } }).extract(clip.crop).raw().toBuffer();
      assert.equal(sha(cropped), audit.cropSha256);
      const native = decodeRgb(sourceFile, `select=eq(n\\,${frame.index}),${bitmapFilter(clip, transform)},format=rgb24`, transform.width, transform.height);
      assert.equal(sha(native), audit.nativeBitmapSha256);
      assert.equal(audit.sourceFrameProof, `audit/${clip.id}-${String(index + 1).padStart(2, '0')}.png`);
      assert(!auditProofs.has(audit.sourceFrameProof), 'each native audit proof has one registered meaning');
      auditProofs.add(audit.sourceFrameProof);
      const proofImage = sharp(evidencePath(outputRoot, audit.sourceFrameProof));
      const proofMetadata = await proofImage.metadata();
      assert.deepEqual([proofMetadata.width, proofMetadata.height], [capture.width, capture.height], clip.id + ': audit PNG exposes only the sanitized excerpt');
      const proof = await proofImage.removeAlpha().raw().toBuffer();
      assert(proof.equals(raw), clip.id + ': review PNG is genuinely decoded native evidence, not a recreated editor');
      auditedFrames++;
    }
    assert.notEqual(clip.auditFrames[0].nativeBitmapSha256, clip.auditFrames.at(-1).nativeBitmapSha256, clip.id + ': native result differs from its start');
    if (requireComplete) assert.deepEqual(clip.outputs.map((output) => output.locale), ['ru', 'en', 'zh']);
    // Localized captions do not change the genuine source reference. Decode
    // each audited source instant once; still compare every derivative itself.
    const referenceFrames = new Map();
    const referenceFrame = (frameIndex) => {
      if (!referenceFrames.has(frameIndex)) referenceFrames.set(frameIndex, decodeRgb(sourceFile,
        `${timelineFilter(clip, capture, transform)},select=eq(n\\,${frameIndex}),format=rgb24`, transform.width, transform.height));
      return referenceFrames.get(frameIndex);
    };
    for (const output of clip.outputs) {
      assert.deepEqual([output.file, output.gif, output.poster], [`native/${clip.id}-${output.locale}.mp4`, `native/${clip.id}-${output.locale}.gif`, `native/${clip.id}-${output.locale}.png`]);
      assert(!outputs.has(output.file)); outputs.set(output.file, { clip, output });
      for (const [field, hashField] of [['file', 'sha256'], ['gif', 'gifSha256'], ['poster', 'posterSha256']]) assert.equal(fileSha(evidencePath(outputRoot, output[field])), output[hashField]);
      assert.deepEqual([output.width, output.height, output.fps, output.gifFps, output.crf, output.level], [presentation.width, presentation.height, render.fps, render.gifFps, render.crf, render.level]);
      const encoded = jsonProbe(evidencePath(outputRoot, output.file));
      assert.equal(encoded.streams.length, 1);
      const stream = encoded.streams[0];
      assert.deepEqual([stream.codec_type, stream.codec_name, stream.pix_fmt, stream.width, stream.height, stream.level, stream.r_frame_rate], ['video', 'h264', 'yuv420p', presentation.width, presentation.height, 41, '30/1']);
      assert.deepEqual([stream.color_range, stream.color_space, stream.color_transfer, stream.color_primaries], ['tv', 'bt709', 'bt709', 'bt709']);
      assert.equal(Number(stream.nb_read_frames), output.decodedFrames);
      assert(Math.abs(Number(encoded.format.duration) - output.durationSeconds) <= .001);
      assert(Math.abs(output.durationSeconds - duration) <= .1, clip.id + ': natural source duration, no added holds or speed-up');
      const posterFrame = Math.ceil(clip.posterAtSeconds * render.fps - 1e-9);
      const expectedPoster = referenceFrame(posterFrame);
      const posterImage = sharp(evidencePath(outputRoot, output.poster));
      const posterMeta = await posterImage.metadata();
      assert.deepEqual([posterMeta.width, posterMeta.height], [presentation.width, presentation.height]);
      const actualPoster = await posterImage.extract({ left: transform.left, top: transform.top, width: transform.width, height: transform.height }).removeAlpha().raw().toBuffer();
      const posterTime = posterFrame / render.fps;
      const posterCues = clip.cues.filter((cue) => cueIsActive(cue, posterTime, duration)).flatMap((cue) => cue.highlights);
      compareNativePixels(expectedPoster, actualPoster, { width: transform.width, height: transform.height, masks: strokeMasks(posterCues, transform), exact: true });
      for (const audit of clip.auditFrames) {
        const frameIndex = Math.min(output.decodedFrames - 1, Math.max(0, Math.round((audit.sourcePtsSeconds - firstSelected.ptsSeconds) * render.fps)));
        const time = frameIndex / render.fps;
        const expected = referenceFrame(frameIndex);
        const actual = decodeRgb(evidencePath(outputRoot, output.file), `select=eq(n\\,${frameIndex}),format=rgb24,crop=${transform.width}:${transform.height}:${transform.left}:${transform.top}:exact=1`, transform.width, transform.height);
        const highlights = clip.cues.filter((cue) => cueIsActive(cue, time, duration)).flatMap((cue) => cue.highlights);
        compareNativePixels(expected, actual, { width: transform.width, height: transform.height, masks: strokeMasks(highlights, transform) });
      }
      // Pausing after playback must still show genuine native final pixels and
      // the explanation above them, including a CFR endpoint rounded upward.
      const terminalIndex = output.decodedFrames - 1;
      const terminalTime = terminalIndex / render.fps;
      const terminal = decodeRgb(evidencePath(outputRoot, output.file), `select=eq(n\\,${terminalIndex}),format=rgb24`, presentation.width, presentation.height);
      const terminalImage = sharp(terminal, { raw: { width: presentation.width, height: presentation.height, channels: 3 } });
      const terminalNative = await terminalImage.clone().extract({ left: transform.left, top: transform.top, width: transform.width, height: transform.height }).raw().toBuffer();
      const terminalHighlights = clip.cues.filter((cue) => cueIsActive(cue, terminalTime, duration)).flatMap((cue) => cue.highlights);
      compareNativePixels(referenceFrame(terminalIndex), terminalNative, { width: transform.width, height: transform.height, masks: strokeMasks(terminalHighlights, transform) });
      const terminalCaption = await terminalImage.extract({ left: presentation.caption.left, top: presentation.caption.top, width: presentation.caption.width, height: presentation.caption.height }).raw().toBuffer();
      let captionPixels = 0;
      for (let index = 0; index < terminalCaption.length; index += 3) {
        if (terminalCaption[index] < 120 && terminalCaption[index + 1] < 130 && terminalCaption[index + 2] < 140) captionPixels++;
      }
      assert(captionPixels > 100, clip.id + ': terminal pause retains the editorial explanation in its reserved matte');
      const gif = await sharp(evidencePath(outputRoot, output.gif)).metadata();
      assert.deepEqual([gif.width, gif.height], [presentation.width, presentation.height]);
      assert(gif.pages > 1 && gif.delay.every((delay) => delay > 0));
      assert(Math.abs(gif.delay.reduce((sum, delay) => sum + delay, 0) / 1000 - output.durationSeconds) <= .15);
    }
  }
  const nativeDirectory = resolve(outputRoot, 'native');
  const published = existsSync(nativeDirectory) ? readdirSync(nativeDirectory).filter((file) => /\.(?:mp4|gif|png)$/u.test(file)).map((file) => 'native/' + file).sort() : [];
  const registered = [...outputs.values()].flatMap(({ output }) => [output.file, output.gif, output.poster]).sort();
  assert.deepEqual(published, registered, 'only verified native derivatives appear in their namespace');
  const auditDirectory = resolve(outputRoot, 'audit');
  const proofFiles = existsSync(auditDirectory) ? readdirSync(auditDirectory).map((file) => 'audit/' + file).sort() : [];
  assert.deepEqual(proofFiles, [...auditProofs].sort(), 'only registered sanitized native proofs appear in the audit namespace');
  if (requireComplete) {
    const videoDirectory = resolve(sourceRoot, 'source/video');
    const sourceFiles = readdirSync(videoDirectory).map((file) => 'source/video/' + file).sort();
    assert.deepEqual(sourceFiles, [...new Set(manifest.clips.map((clip) => clip.sourceCapture.file))].sort(), 'publish approved sanitized excerpts only, never the original private capture');
  }
  return { manifest, outputs, auditedFrames };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const arguments_ = process.argv.slice(2);
  const accepted = ['--output-dir', '--storyboard', '--allow-incomplete'];
  assert(arguments_.every((argument, index) => accepted.includes(argument) || ['--output-dir', '--storyboard'].includes(arguments_[index - 1])), 'Use --output-dir <path>, --storyboard <path>, --allow-incomplete only');
  const option = (name) => { const index = arguments_.indexOf(name); return index < 0 ? undefined : arguments_[index + 1]; };
  const result = await checkNativeMotion({ outputRoot: option('--output-dir') && resolve(option('--output-dir')), storyboardPath: option('--storyboard') && resolve(option('--storyboard')), requireComplete: !arguments_.includes('--allow-incomplete') });
  console.log(`Native evidence verified: ${result.manifest.clips.length} continuous actions, ${result.outputs.size} localized videos, ${result.auditedFrames} decoded audit frames. Original-local linkage is documentary; CI verifies excerpts only.`);
}
