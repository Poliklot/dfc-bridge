# Editable DFC Bridge workshop

Canonical example material for the [visual introduction](../../docs/25-visual-walkthrough.md), [Russian introduction](../../docs/ru/25-vizualnyj-urok.md) and [Chinese introduction](../../docs/zh/25-visual-walkthrough.md). Native Figma evidence and generated team illustrations are separate assets with separate provenance. No client materials, third-party UI replicas or generated editor screenshots are included.

Before recording, cropping, translating captions or replacing media, follow the [media production runbook](MEDIA-PRODUCTION.md). It contains exact scenarios, recording steps, provenance rules and separate technical/visual acceptance checks.

## Use the file

The native file contains five pages:

1. **01 · До разметки:** ambiguous names and two deliberate mobile discrepancies.
2. **02 · Подготовленная страница:** the consistent 1440/375 roots, with actual UI Kit and Modals sources beside them.
3. **03 · Два расхождения:** the same two discrepancies with declared identities, retained for diagnosis.
4. **04 · Секция в старом макете:** a selected-section example with a separate host boundary.
5. **05 · Состояния и компоненты:** page views and component/instance examples.

Import `dfc-bridge-workshop.fig` from Figma’s home screen into your own copy. The [native export and import evidence](#native-export-and-import-evidence) records the verified archive and the separate QA copy.

## The two discrepancies and their resolution

The desktop title is **«Мастерская понятных макетов»**. In the initial mobile source it is shortened to **«Мастерская макетов»** to fit the composition. This changes product content, not line wrapping.

Desktop `hero-actions` belongs to `hero-copy`. In the inconsistent mobile source, the entire actions frame is moved out of `hero-copy` and placed directly inside `hero`, after `workshop-art`. **Changing sibling order within the same meaningful parent is allowed; changing that parent is not the same operation.** This example has no declared structural transformation, so the parent change is contract drift. See [responsive behavior](../../docs/03-responsive-breakpoints.md) and [the transfer contract](../../docs/04-transfer-contract.md#same-tree-by-default-transformation-by-declaration).

Auto Layout remains enabled. There is no deliberate missing-Auto-Layout error or extra renamed-button error. Page 02 restores the full title and keeps `hero-actions` inside `hero-copy` at both widths; only the actions' row/column direction changes. Page 03 preserves exactly `content.text-changed-between-breakpoints` and `responsive.parent-changed-across-breakpoints`.

Page 01 uses standalone control frames. The prepared page introduces two native component sets, `button-primary` and `button-secondary`, in **UI Kit · Sources**, and the `contact-modal` main component in **Modals**. The compact **UI Kit** board displays ten linked instances: default, hover, keyboard focus, pressed and disabled for each button style. Each set has four `State` variants (`default`, `hover`, `pressed`, `disabled`) and a separate Boolean `Focus visible`, false by default. Focus can coexist with hover or pressed; it is not a mutually exclusive state. A shared text property owns the label. No loading state is invented for these modal-opening and anchor actions.

Page buttons and local modal targets remain native instances linked to those sources. Each prepared root retains its own hidden `contact-modal [modal=contact-modal]` instance. The visible main component in Modals owns shared appearance; it is not another page action target. Page-specific actions remain on instances, not shared component names. The state atlas specifies appearance, not working keyboard, disabled or prototype behavior; those require implementation and separate verification.

## What the evidence means

- `screenshots/`: **20 registered real Figma editor captures plus 3 lossless detail derivatives**. The details show the desktop hero, mobile hero and earlier page-02 Ready summary; they are not new captures. `scripts/build-tutorial-screenshots.mjs --check` compares those derivatives against the exact registered source rectangles. Original captures kept only outside the repository are not independently reverified by CI. Complete report captures remain available alongside introduction details. Assistant captures show a local development build, not a published Community update. A screenshot is recorded evidence only when it is listed in `capture-provenance.json`; referenced filenames alone do not prove a capture.
- `renders/`: PNG exports of real native Figma page roots, **not** editor screenshots. Hero images are rectangular crops from those complete roots, retaining the page's actual fields: **32 px on every side at 1440** and **24 px on every side at 375**. These are pixels inside the image, not CSS padding or a synthetic border. `renders/provenance.json` records source node IDs and source-space subject/crop bounds; the guard compares the crop's decoded pixels exactly with the corresponding full native render.
- `native-nodes.json`: actual exported node properties, hierarchy, content, component-set properties, visual bindings and native instance-source IDs/names; not a replacement transfer contract. A button instance points to its actual variant and also records the owning set. Instance/source relationships do not prove every internal or runtime behavior.
- `check-results.json`: actual local Assistant core results from that export; no full-QA claim. The regression repairs a separate in-memory copy of page 03 by restoring the title and reparenting the actions frame, then checks Ready with zero issues. It does not alter the native diagnostic example.
- `capture-provenance.json`: capture dates, source-frame SHA-256 hashes, source dimensions and rectangular crops. No compositing, redrawn controls or numbered overlays are permitted for native screenshots.
- `motion/native/`: **seven separate continuous Figma recordings**, each with RU/EN/ZH MP4, GIF and poster derivatives. Automated character-by-character input and Cut/Paste are visible; the mouse pointer does not follow the actions. Captions and stroke-only highlights are added. These are separate operations on QA copies, not one chronological build. See the [active recording evidence](#current-continuous-native-recordings).
- `motion/source/video/`: retained fixed-crop video excerpts, with hashes, original capture intervals and local-original hashes recorded in `motion/native-storyboard.json` and `motion/native-provenance.json`. CI verifies the retained excerpts and their derivatives; it does not independently verify the originals kept outside the repository.
- `motion/*-{ru,en,zh}.*`, `motion/provenance.json` and `motion/source/` PNGs: **historical v2 step sequences**, not continuous recordings. Their synthetic cursor markers and captions are disclosed editorial cues. They remain separate from, and do not certify, the active native recordings.
- `diagrams/*-{en,ru,zh}.svg`: explanatory draw.io diagrams. Each SVG embeds editable draw.io XML for inspection and reuse. For repository changes, edit `scripts/build-tutorial-diagrams.mjs` and regenerate the affected concepts in all three languages; do not patch a single exported SVG.
- `illustrations/`: **generated penguin characters**, not screenshots, observed people or native Figma evidence. Frontend, backend and AI appear only beside relevant evidence. The story uses three compact HTML comments directly above source captures; mascots touch only the empty presentation matte, never the captured interface. Speech is native text, not part of the screenshot pixels. Generation, source reference, master hash and image derivatives are documented in `handoff-penguins-provenance.json`. Their remarks are editorial examples, not real team messages.

## Recreate or refresh deliberately

Prefer importing the verified `.fig`. To rebuild from source, create an **empty** Figma Design file and import `figma/manifest.json` as a Development plugin. Run the build command once. The fixed builder refuses non-empty files; it is not a general importer or validator. It creates the standalone examples before introducing linked page-02 instances, with 27 foundation variables and three text styles for the shared sources. Its asynchronous export command reads the teaching pages without changing them, preserves native instance-source references, and downloads JSON or a selected root’s PNG. It requests no network access.

After changing the native file, export its `.fig` copy, JSON and affected renders together. Re-run the actual Assistant regression against the new export and refresh stored reports. Capture changed UI in real Figma; never redraw findings into a fake plugin window. Copy the four Assistant captures into its repository only after review.

Rebuild all localized diagrams with `node scripts/build-tutorial-diagrams.mjs`. This uses draw.io Desktop to export native diagrams with editable XML embedded in the SVG. Edit the generator rather than patching one locale's exported SVG.

Run `npm run lint:tutorial`, `npm test` and `npm run test:e2e` here. Run `DFC_BRIDGE_METHODOLOGY_DIR=/path/to/dfc-bridge npm test` in the Assistant repository to reproduce the native-data findings and repair regression. Automated checks do not replace native host smoke testing before a plugin release.

## Three review passes for the button-state refresh — 2026-10-09

1. **Component ownership and contract boundary — verified:** checked two native sets with four variants each, one shared label and an independent focus Boolean, ten linked specimens and six unchanged page instances. The focus ring stays outside Auto Layout flow and stretches with the actual 327 px mobile buttons. Guards reject missing/extra variants, detached labels/specimens, in-flow focus and focus enabled by default. The two deliberate discrepancies and page-specific action/target links are preserved. The imported archive was independently audited and passed the native two-finding → repair → Ready inspection below. Ready remains limited to the checked source scope, not runtime behavior or complete accessibility.
2. **Image fields and visual reading — verified:** refreshed three real canvas captures for the state atlas and final overview; their decoded pixels exactly match the recorded source rectangles. The final browser matrix covers **14 states**: RU/EN/ZH × 390/1440 px × light/dark, plus RU at 320 px in both themes, with **238 figure placements** and **14 matching archive downloads**. The kit/final figures were manually read in all twelve locale/width/theme combinations, plus the RU 320 px dark kit. All ten specimens, focus rings, labels and Modals remain intact with genuine canvas fields. Browser presentation insets are separately at least 12 px. No overflow, upscaling, aspect-ratio or intrinsic-dimension errors were found; Axe reported zero serious/critical issues. This checks documentation presentation, not production button accessibility. Unchanged captures retain their actual earlier source revisions rather than being restamped.
3. **Core regression and delivery — verified:** the full canonical `npm test` passes, including **98 built pages**, **84 localized documents** and **107 legacy documents**; all **38 end-to-end browser tests** pass. The full Assistant suite is green against the refreshed native JSON/reports, including exactly two initial findings, the two-fact repair to zero issues, and the negative same-parent-reordering regression. Native/source/render guards and builder syntax checks pass; the exporter smoke test rejects unsafe reads from a variant's property-definition getter. The four unchanged Assistant PNG mirrors remain byte-for-byte identical to their canonical captures. A builder syntax check is not a native rebuild proof.

Current source counts: **42 editable localized SVG diagrams (14 concepts × 3 languages)**, **20 registered real screenshot captures plus 3 lossless detail derivatives** (23 screenshot PNG assets), and **20 introduction figures per locale** (13 images and 7 videos). There are **21 localized video placements** and **9 decorative mascot placements** in the three introductions; editorial posters and mascots are not native screenshot captures. Capture count, derivative count and repeated page placements describe different things and must not be presented as interchangeable proof.

The four advanced concepts—`dfc-bridge-coverage-map`, `data-contract-pipeline`, `motion-scroll-storyboard`, and `delivery-lifecycle`—are localized here alongside the introductory diagrams. Their historical SVG/PNG paths under `assets/diagrams/` remain English compatibility exports of the same generator. Articles use the locale-specific SVG, not those compatibility paths. Explanatory shapes illustrate a contract or review responsibility; they are not native evidence, a validator report, or runtime certification.

## Native export and import evidence

The replacement `dfc-bridge-workshop.fig` was exported from the updated native file through **Save local copy**, then imported into a separate QA file through **Figma Home → Import**.

Current archive SHA-256: `2c7bfc560c8684777026470285aa17b1e98aa5dbda97e3f09beb2dd04a721333`.

The separately imported QA file (`yCIbd7pIabjIepkkncPPYl`) retains all five editable pages, 27 variables and three text styles. Its prepared page has two four-variant button sets, their shared label/focus properties, ten linked atlas specimens and six page instances with native source links: two default button instances plus one hidden local modal instance in each of the 1440/375 roots. The hidden modal targets remain invisible; their shared source is visible in Modals. The existing default component IDs and page-instance action/target names were retained.

The real local Development Assistant's page check on imported page 03 reported **two errors, zero drafts and zero warnings**: the title-content difference and the changed actions parent. Only in this separate imported QA copy, the full title was restored and the complete `hero-actions` frame returned to `hero-copy`. Native **Repeat** then displayed **workshop Ready, zero errors/drafts/warnings** for the checked 375/1440 contexts.

The shipped archive and original diagnostic page 03 were **not repaired** by that QA operation. This is native archive/import and source-check evidence, not a complete implementation, full component-source audit or production handoff approval. The preceding revision's archive hash and repair recipe are not carried forward.

No plugin version, release, sharing permission or deployment was changed. This is documentation QA, not a plugin release or proof of a finished frontend/backend implementation.

## Step-by-step corrections — 2026-10-11

Historical revision, followed by the historical annotated v2 refresh below. This section records the earlier captures and review, not verification of the active native recordings.

The introduction compares two independently captured expanded hero trees side by side. They come from raw page 01 of the separate imported QA copy, before its motion edits. Artwork internals and unrelated sections are not the subject of this comparison. HTML joins two evidence images; it does not pretend they are one editor screenshot.

The earlier unlocalized `rename-title` and `move-actions` were two six-second sequences of genuine Chrome Figma editor states: rename `Title mobile` to `hero-title`, then cut the complete `hero-actions` and paste it into the existing `hero-copy`. These were **timed step captures, not continuous screen recordings**. Their raw PNGs remain in `motion/source/`. The old MP4/GIF/poster outputs, v1 crop bounds, holds, hashes and matching renderer recipe are retained in Git history at `bf04a97`, not in the current published assets. The current `motion/provenance.json` and `scripts/build-walkthrough-motion.mjs` instead bind and rebuild the annotated v2 sequences below; they do not certify or rebuild these historical outputs. Encoded-media checks use `ffprobe` from FFmpeg.

The browser shows native play/pause controls, no autoplay or looping, and optional downloadable GIFs. Fullscreen inspection supports keyboard closing, focus return, fit and image zoom. Decorative penguins are not media triggers.

Only QA page 01 was changed for these sequences. Native inspection confirmed `hero-title` still contains «Мастерская макетов»: changing identity does not resolve the product-copy decision. Both controls remain inside the moved Auto Layout group, now under `hero-copy`. Cut/paste generated replacement action IDs (`76:2`, children `76:3` and `76:5`); names and relationships, not temporary IDs, are the lesson. The shipped archive, original file and its two diagnostic findings remain unchanged. No new wrapper was invented and these operations do not claim Ready.

Review passes:

1. **Scenario:** removed an unnecessary new-parent operation. Demonstrate existing meaningful ownership; keep copy and identity distinct.
2. **Capture:** widened native fields around the editing control; retained before, input/selection and final states with readable pauses. No fabricated editor or pointer.
3. **Presentation:** verify keyboard viewer, responsive pairs, manual playback, localized captions/downloads and evidence guards. Current automated results are recorded in the task, not inferred from these notes.

## Historical annotated v2 refresh — 2026-10-12

Historical source date: **2026-10-12, Europe/Moscow** (2026-10-11 UTC). These real step captures were assembled into annotated clips. They are retained evidence, not the active introduction videos and not continuous recordings.

Each of the seven historical actions has RU/EN/ZH MP4, GIF and poster derivatives named `motion/<id>-<locale>.*`, on a **1280 × 720** editorial canvas:

| Clip | Story stage | What it shows |
| --- | --- | --- |
| `page-metadata` | 2 | Declare `workshop`, `/workshop`, `default` and the 375 width on the page root. |
| `rename-title` | 3 | `Title mobile` → `hero-title`. Identity changes; product copy does not. |
| `repair-copy` | 3 | Restore the full «Мастерская понятных макетов» heading, as the product choice used in this example. |
| `move-actions` | 3 | Move the complete `hero-actions` into existing `hero-copy`, retaining both controls and Auto Layout. |
| `button-states` | 4 | Inspect native button variants and the independent `Focus visible` Boolean. These are appearance examples, not implemented runtime states. |
| `local-action` | 4 | Declare the action on the page instance and find its hidden local `contact-modal` at 375. **Show target** selects the layer; it does not open a modal. |
| `repeat-check` | 5 | Native **Repeat** on a separate recording copy: **2 errors → 0** after repairing copy and parent. Scope is only the declared 375/1440 contexts, not a finished application. |

Native editor panels retain the original capture pixels. Editorial captions, cursor markers and highlights stay visibly distinct; camera cuts select recorded regions rather than fabricate intermediate UI. Original PNGs, crop bounds, cues, holds, source dates and hashes are recorded in `motion/provenance.json`. `node scripts/build-walkthrough-motion.mjs` regenerates the derivatives with Sharp and FFmpeg; `ffprobe` checks encoded dimensions, duration and absence of audio.

The recording work uses separate QA pages **06, 07 and 08**. These working copies are not included in the shipped five-page `.fig`; the archive, original teaching file and preserved diagnostic findings remain unchanged. Page-06 corrections do not by themselves claim Ready. On page 07, the actual local Assistant page check, starting from the selected 375 root `81:166`, found two errors for the declared 375/1440 `default` contexts: heading content and the changed actions parent. Only this recording copy was repaired. Native **Repeat** then displayed Ready with **0 errors, 0 TODOs and 0 warnings**. The preserved before/edit/after captures are that page's own evidence, not an older page-02 report or an in-memory regression.

Page 08 isolates the target demonstration: root `85:31` keeps the visible name `workshop`, `bp=375` and `view=default`, but uses `[page=workshop-recording] [route=/workshop-recording]`. Its `contact-button` (`85:40`) points to the hidden local `contact-modal` (`85:80`). This recording-only namespace avoids competing modal targets in the other QA copies during file-wide destination lookup. It does not change the shipped workshop scope, tag grammar or methodology.

Different mobile copy or parent remains allowed when the product variant or structural transformation is properly agreed and declared. This story demonstrates the simpler shared-copy/shared-parent choice, not a ban on intentional design differences.

Historical review results above do not certify the active native recordings or their current browser presentation.

## Current continuous native recordings

The introduction uses `motion/native/<id>-<locale>.*`: **7 actions × 3 locales, 21 MP4s with 21 GIFs and 21 posters**. Each action retains one continuous native Figma interval at original 1× speed. A documented fixed subject crop inside the retained privacy-cropped excerpt makes the relevant UI larger; each output fits that subject rather than forcing every recording onto a 1920 × 1080 canvas. Native pixels are never upscaled. The per-clip dimensions in `motion/native-provenance.json` are authoritative for MP4, GIF, poster and HTML.

**Capture dates are not render dates:** `page-metadata`, `rename-title` and `repair-copy` retain their 12 October 2026 recordings with tighter crops and revised captions. `move-actions`, `button-states`, `local-action` and `repeat-check` use new native takes from 13 October 2026. The retained 12 October clips are not automatically certified against the new 2-second-before / 3-second-after / caption-reading standard; cropping cannot create missing real pauses. Per-source capture dates and limits remain in the storyboard/provenance.

No interpolated actions, synthetic cursor movement, redrawn controls or assembled screenshot holds are used. A parked native pointer may remain. Captions occupy a separate editorial band, and any stroke-only highlights remain visibly editorial; button specimens and their native focus ring have no editorial outline.

`motion/native-provenance.json` binds the source excerpt, trim, fixed crop, native transform, cues, renderer and derivative hashes. `scripts/build-native-walkthrough-motion.mjs` recreates the outputs; `scripts/check-native-walkthrough-motion.mjs` checks sources, timelines, encoded media, posters and decoded audit frames. The immutable gate checks the current files when it runs; previous pass counts do not certify replacement media. A media pass describes source/derivative integrity, not application readiness, human readability or browser QA.

The operations use separate QA pages in the imported file `yCIbd7pIabjIepkkncPPYl`: **06 · Действия для экскурса** for metadata, name, copy and parent; **08 · Компоненты для экскурса** for button state/focus and the local action; **07 · Проверка для экскурса** for Repeat. They do not form one chronological build. Metadata edits link already-prepared hero roots. Button states demonstrate native appearance properties, not runtime behavior. The local-action clip starts with `contact-button [control]` and no assigned target, chooses the existing hidden local target on that page instance, inspects the generated action tag, then finds the target layer; it does not show a modal preview or a library edit.

In `repeat-check`, the old two-error report predates the repairs. The repairs themselves are **not shown in the clip**. Native **Repeat** refreshes that stale report to zero errors/drafts/notices. The checked `default`, 375 and 1440 scope is already expanded before the click; the clip does not claim to demonstrate expanding it. This proves rechecking in that scope, not the recorded repair actions or a finished application. One fixed crop excludes an unrelated stale toast below the report throughout the new interval; no native UI is locally erased or redrawn. The original teaching file, five-page `.fig`, diagnostic examples and main screenshots/renders remain unchanged.

Different mobile copy or parent remains allowed with an agreed product variant or declared structural transformation. This example chooses shared copy and parent; it does not ban intentional differences.

The browser provides manual native playback, no autoplay or looping, and optional GIF downloads. Fullscreen viewing supports fit, zoom, original size, keyboard closing, focus return and error handling for images and videos. Generated penguins and their team questions remain editorial examples, not native evidence. Browser presentation checks are recorded only after execution; the media gate above does not substitute for them.

**Historical presentation QA, 12 October 2026 — not a pass for the replacement media:** the previous build passed 58 browser tests, including an 18-state locale/width/theme matrix and nine video-zoom cases. Those results belong to the preceding media revision; they do not certify the 13 October replacement assets.

### Verification of the 13 October 2026 refresh

- **Source and derivative integrity:** the native-media gate passed for **7 continuous actions, 21 localized videos and 34 decoded native audit frames**. The **84 localized caption labels** were raster-reviewed using the rendering font stack, with zero text overflow. The three screenshot details pass exact source-rectangle comparison; they remain derivatives of earlier captures, not three new captures.
- **Focused tests and build:** `npm test` passed, including **30 focused unit tests (14 native-motion + 16 recorder)**, asset/provenance checks and the built documentation checks. The local run log is `/tmp/dfc-media-quality-test.log`.
- **Existing browser behavior:** `tests/site.spec.mjs` and `tests/walkthrough-media.spec.mjs` passed **58/58** against the rebuilt local production preview. The local run log is `/tmp/dfc-media-accepted-existing.log`.
- **New playback and geometry tests:** `tests/tutorial-quality.spec.mjs` passed **21/21**: three locale playlists played all **21 MP4s at 1× from start to natural end**, with a real pause/resume and no seeking or rate change; 18 RU/EN/ZH × 1440/390/320 px × light/dark cases checked decoded dimensions, native aspect ratio, no upscaling and no horizontal overflow. The local run log is `/tmp/dfc-media-accepted-quality.log`. This is automated playback proof, **not a claim that a person watched all 21 videos in full**.
- **Final browser visual review:** the stable-capture matrix passed **18/18** and its **90 PNGs** were accepted: desktop hero, mobile hero, `button-states`, `local-action` and `repeat-check` in each of the 18 locale/width/theme combinations. EN and ZH were read in full; RU video figures were reread, and the 12 unchanged RU hero PNGs were verified byte-identical to the already-reviewed copies. The final captures have no loading spinner or fixed-header interference; captions and enlargement buttons stay within their figures. They supersede the early incomplete captures without changing native source pixels. The local log is `/tmp/dfc-media-stable-quality.log`; screenshots are in `/tmp/dfc-media-stable-quality-results/`.
- **Narrow-screen limit:** native video controls remain visible on paused media. At 320/390 px, the wide `button-states` recording does not make every small native label readable inline. Its HTML caption conveys the teaching point; exact labels and focus details require the working enlarged viewer, original size or zoom. This is not an all-details-inline readability claim.

These logs are local review artifacts, not portable CI evidence. Decoded frame/caption review and automated full playback establish different facts; neither alone proves every educational detail is readable throughout every localized clip. The retained `page-metadata`, `rename-title` and `repair-copy` recordings are not newly certified against the 2-second-before / 3-second-after standard. The original teaching file, five-page `.fig` and deliberate diagnostics remain unchanged. The refreshed assets are local and **not deployed**; no plugin release is claimed.
