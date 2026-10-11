# Editable DFC Bridge workshop

Canonical example material for the [visual introduction](../../docs/25-visual-walkthrough.md), [Russian introduction](../../docs/ru/25-vizualnyj-urok.md) and [Chinese introduction](../../docs/zh/25-visual-walkthrough.md). Native Figma evidence and generated team illustrations are separate assets with separate provenance. No client materials, third-party UI replicas or generated editor screenshots are included.

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

- `screenshots/`: **20 registered real Figma editor captures**, cropped only. QA verified their pixels against the recorded rectangular source crops. Complete report captures remain available alongside introduction details. Assistant captures show a local development build, not a published Community update. A screenshot is recorded evidence only when it is listed in `capture-provenance.json`; referenced filenames alone do not prove a capture.
- `renders/`: PNG exports of real native Figma page roots, **not** editor screenshots. Hero images are rectangular crops from those complete roots, retaining the page's actual fields: **32 px on every side at 1440** and **24 px on every side at 375**. These are pixels inside the image, not CSS padding or a synthetic border. `renders/provenance.json` records source node IDs and source-space subject/crop bounds; the guard compares the crop's decoded pixels exactly with the corresponding full native render.
- `native-nodes.json`: actual exported node properties, hierarchy, content, component-set properties, visual bindings and native instance-source IDs/names; not a replacement transfer contract. A button instance points to its actual variant and also records the owning set. Instance/source relationships do not prove every internal or runtime behavior.
- `check-results.json`: actual local Assistant core results from that export; no full-QA claim. The regression repairs a separate in-memory copy of page 03 by restoring the title and reparenting the actions frame, then checks Ready with zero issues. It does not alter the native diagnostic example.
- `capture-provenance.json`: capture dates, source-frame SHA-256 hashes, source dimensions and rectangular crops. No compositing, redrawn controls or numbered overlays are permitted for native screenshots.
- `diagrams/*-{en,ru,zh}.svg`: explanatory draw.io diagrams. Each SVG embeds its editable draw.io XML; open it in draw.io to edit and re-export it.
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

Current source counts: **30 editable localized SVG diagrams**, **20 registered real captures**, **18 introduction figures per locale**, and **111 explanatory image placements plus 9 decorative mascot placements** across the canonical documentation. Capture count, source assets and repeated page placements describe different things and must not be presented as interchangeable proof.

## Native export and import evidence

The replacement `dfc-bridge-workshop.fig` was exported from the updated native file through **Save local copy**, then imported into a separate QA file through **Figma Home → Import**.

Current archive SHA-256: `2c7bfc560c8684777026470285aa17b1e98aa5dbda97e3f09beb2dd04a721333`.

The separately imported QA file (`yCIbd7pIabjIepkkncPPYl`) retains all five editable pages, 27 variables and three text styles. Its prepared page has two four-variant button sets, their shared label/focus properties, ten linked atlas specimens and six page instances with native source links: two default button instances plus one hidden local modal instance in each of the 1440/375 roots. The hidden modal targets remain invisible; their shared source is visible in Modals. The existing default component IDs and page-instance action/target names were retained.

The real local Development Assistant's page check on imported page 03 reported **two errors, zero drafts and zero warnings**: the title-content difference and the changed actions parent. Only in this separate imported QA copy, the full title was restored and the complete `hero-actions` frame returned to `hero-copy`. Native **Repeat** then displayed **workshop Ready, zero errors/drafts/warnings** for the checked 375/1440 contexts.

The shipped archive and original diagnostic page 03 were **not repaired** by that QA operation. This is native archive/import and source-check evidence, not a complete implementation, full component-source audit or production handoff approval. The preceding revision's archive hash and repair recipe are not carried forward.

No plugin version, release, sharing permission or deployment was changed. This is documentation QA, not a plugin release or proof of a finished frontend/backend implementation.

## Step-by-step corrections — 2026-10-11

The introduction compares two independently captured expanded hero trees side by side. They come from raw page 01 of the separate imported QA copy, before its motion edits. Artwork internals and unrelated sections are not the subject of this comparison. HTML joins two evidence images; it does not pretend they are one editor screenshot.

`motion/` contains two six-second sequences of genuine Chrome Figma editor states: rename `Title mobile` to `hero-title`, then cut the complete `hero-actions` and paste it into the existing `hero-copy`. These are **timed step captures, not continuous screen recordings**. Original PNGs, fixed rectangular crops, holds and hashes are retained in `motion/provenance.json`. `node scripts/build-walkthrough-motion.mjs` regenerates MP4, GIF and posters with Sharp and installed FFmpeg. `npm test` requires `ffprobe` from FFmpeg to verify codec, dimensions, duration and absence of audio.

The browser shows native play/pause controls, no autoplay or looping, and optional downloadable GIFs. Fullscreen inspection supports keyboard closing, focus return, fit and image zoom. Decorative penguins are not media triggers.

Only QA page 01 was changed for these sequences. Native inspection confirmed `hero-title` still contains «Мастерская макетов»: changing identity does not resolve the product-copy decision. Both controls remain inside the moved Auto Layout group, now under `hero-copy`. Cut/paste generated replacement action IDs (`76:2`, children `76:3` and `76:5`); names and relationships, not temporary IDs, are the lesson. The shipped archive, original file and its two diagnostic findings remain unchanged. No new wrapper was invented and these operations do not claim Ready.

Review passes:

1. **Scenario:** removed an unnecessary new-parent operation. Demonstrate existing meaningful ownership; keep copy and identity distinct.
2. **Capture:** widened native fields around the editing control; retained before, input/selection and final states with readable pauses. No fabricated editor or pointer.
3. **Presentation:** verify keyboard viewer, responsive pairs, manual playback, localized captions/downloads and evidence guards. Current automated results are recorded in the task, not inferred from these notes.
