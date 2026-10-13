# DFC Bridge methodology diagrams

This directory preserves historical image URLs. Active articles use the localized editable SVGs in [`../tutorial/diagrams/`](../tutorial/diagrams/), with a caption explaining the example and its limits.

- `dfc-bridge-coverage-map` — evidence ownership, a scoped source report and separate implementation/runtime QA; not automatic coverage of every topic or a blanket Ready result;
- `data-contract-pipeline` — one declared dataset, matching chart/table values, example states, and the distinction between zero and missing data;
- `motion-scroll-storyboard` — three scenes with example scroll ranges and a reduced-motion alternative in document order;
- `responsive-transformation` — a declared pattern change that preserves identity, state, semantics, actions, and focus;
- `delivery-lifecycle` — design, contract, implementation, QA and release, with changed decisions returning to verification.
- `auto-layout-gate` — the blocking Page Check boundary between manual coordinates and transferable native Auto Layout, including GROUP, absolute-layer, asset, and instance semantics.
- `section-scope-gate` — the selected-section DFC Bridge island inside a legacy page, with traversed, opaque, atomic, deferred, and scope-qualified outcome semantics.

For the four active concepts (`dfc-bridge-coverage-map`, `data-contract-pipeline`, `motion-scroll-storyboard`, `delivery-lifecycle`), `scripts/build-tutorial-diagrams.mjs` is the authored source. It exports EN/RU/ZH editable SVGs under `assets/tutorial/diagrams/` and updates the English SVG/PNG compatibility files here. Do not edit an alias independently. Keep localized `title`, `desc`, visible labels and the embedded draw.io graph together.

`responsive-transformation`, `auto-layout-gate` and `section-scope-gate` are retained, unlocalized historical illustrations, not current article embeds or fresh validation evidence. Their SVGs remain their editable sources. New explanations should use the relevant current tutorial diagram and the canonical rule text, not add these old graphics merely to fill a page.

The diagrams use only the DFC Bridge product palette. Do not introduce gradients, decorative shadows, or status colors that change the meaning of the brand mark.
