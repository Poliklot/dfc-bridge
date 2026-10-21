# Changelog

All notable changes to the public DFC Bridge methodology, schemas, rule catalog, and documentation are recorded here. The private Figma plugin has its own non-public implementation history; only its public coverage boundary is documented in this repository.

## Unreleased

## [0.12.0] — 2026-10-21

### Added

- Portable, pinned SHA-256 fallback for the native Figma plugin iframe where SubtleCrypto is unavailable; native and fallback digests are checked against the same vectors and fixture. No runtime package installation or network is required.
- Versioned read-only handoff snapshot schema, bounded integrity checks and a deterministic synthetic fixture. The 0.10.0 Assistant candidate reuses its Page/Section checker core through a saved-JSON CLI/JS API; Explorer preserves native packets on import/export. EN/RU/ZH instructions distinguish recorded source preflight, partial scope, unavailable facts and the remaining full developer-package work. Plugin distribution still requires exact-runtime native verification.

## [0.11.8] — 2026-10-21

### Fixed

- Clarified source interaction contracts for unannotated instances: explicit main-component or ComponentSet intent only, local drafts override source defaults, and instance interiors stay atomic. Updated EN/RU/ZH guidance and the 0.9.8 checker coverage boundary; this does not claim a Community publication.

- Parse authored Markdown when extracting titles, descriptions, and article bodies. Compatibility anchors and comments no longer become Chinese descriptions or leave a duplicate H1; anchors and code examples remain intact.

### Changed

- Explain Design Frontend Contract and its optional DFC Bridge Assistant companion on the EN/RU/ZH home and review pages, with consistent metadata and public source links. The methodology can be used without a plugin; source checks do not certify a running application.

### Added

- Minimal JSON-LD linking the public methodology, its creator, documentation pages, and the distinct Figma companion without invented ratings, prices, or publication versions.
- Markdown extraction regression tests, built-page metadata and JSON-LD checks, and browser checks for official identities and Chinese compatibility anchors.

### Compatibility

- Methodology 0.11.8 and catalog 0.5.1 preserve tag grammar, rule IDs, severities, schema identities, locale routes and plugin commands. Page/Section Check retain 42/26 rule IDs while the documented source-interaction coverage expands. This release does not distribute a Figma plugin build.

## [0.11.7] — 2026-10-13

### Changed

- Simplified the homepage, quick starts, and repository introductions around a familiar design decision before introducing tags or the full contract, consistently across English, Russian, and Chinese.
- Reviewed the 84 localized authored pages and corrected task order, prerequisites, examples, next steps, and translation errors where needed. Clarified page versus selected-section scope and the distinction between source checks, implementation QA, and delivery readiness.
- Reworked seven tutorial scenarios in all three locales using continuous native Figma recordings at original speed: four operations were re-recorded on 13 October; three retain their 12 October sources and are not presented as newly captured or newly certified against the recording-hold standard.
- Reframed and localized MP4/GIF/poster outputs, added three lossless detail crops, and extended the media viewer with video zoom so native interface details can be inspected on narrow screens.
- Replaced four English-only overview graphics with editable EN/RU/ZH infographics for evidence ownership, data presentation, motion alternatives and delivery/reverification. Corrected diagram captions across the guides and examples so they explain the actual relationships without implying runtime approval. Historical asset URLs remain available as compatibility exports.

### Added

- A canonical media-production runbook with exact selection and recording steps, provenance, readability checks, and rejection criteria; a shared editorial review sequence for future documentation changes.
- Recorder, provenance, media-integrity, and browser regression checks; stricter three-locale contract-example and literal-tag checks to catch translated syntax and incomplete localized rule records.

### Security

- Updated transitive `http-cache-semantics` to 4.3.0 and scoped `postcss-nested@6.2.0` to patched `postcss-selector-parser@7.1.6`, addressing GHSA-ch52-4w7c-c8xp and GHSA-rj75-hqrm-r3gf without downgrading Starlight. The parser override passes all 69 upstream nesting tests; dependency audit reports zero vulnerabilities.

### Fixed

- Made native-video RGB decoding deterministic across macOS and Linux by using the same scalar FFmpeg conversion for production and verification. Regenerated derived evidence and localized outputs from the unchanged recordings; exact pixel/hash checks remain mandatory.
- Corrected the Chinese sidebar translation keys to `zh-CN`, matching Starlight's declared language rather than the `/zh/` route prefix. All six group headings now use the requested language, including after language switching and in the mobile menu.
- Removed Russian copy-button text from English code examples, translated Chinese heading-link and GitHub-star accessibility labels, and added locale-aware 404 recovery with usable language links without JavaScript.
- Removed an obsolete mobile-menu accessibility shim; the current native popover owns keyboard and expanded-state behavior. Added rendered UI regression checks for all three languages.

### Compatibility

- No changes to tag grammar, schema or contract versions, the 107 rule IDs, or the declared Page Check and selected-section coverage. Example methodology versions now identify 0.11.7; historical fixture and capture dates remain intact.

## 0.11.6 — DFC Bridge

- Adopted **DFC Bridge** (Design Frontend Contract) as the public name across English, Russian and Chinese documentation, the site, diagrams and Assistant media. Spoken Bridge / Бридж remains unchanged.
- Moved the canonical repository and site to `Poliklot/dfc-bridge` and `https://poliklot.github.io/dfc-bridge/`. Existing repository links redirect on GitHub; legacy documentation routes redirect with their query and fragment intact.
- Kept published schema identifiers, the `bridge` contract root, `bridgeKey`, tags and all 107 rule IDs/severities unchanged. Catalog schemas accept both `DFC Bridge` and legacy `BRIDGE`.
- Preserved legacy schema/data/image endpoints on the account Pages site, without introducing a second methodology source.
- Retained upstream dependency security fixes; the complete dependency audit reports zero vulnerabilities.

## [0.11.5] — 2026-08-19

### Changed

- Rebuilt the public entry path around a concise homepage, practical quick start, focused examples, and a shorter designer checklist.
- Simplified navigation and core guidance while keeping advanced contracts, validation, accessibility, motion, data, and lifecycle references available outside the beginner path.
- Applied the same documentation structure and intent across English, Russian, and Chinese, including shorter sidebar labels and localized review paths.
- Replaced the generic homepage placeholder with a design map that shows responsive views and an action-to-modal relationship.

### Added

- Automated concision, heading-parity, and beginner-page checks across all three locales.

## [0.11.4] — 2026-08-19

### Added

- Complete zh-CN localization with manifest-backed coverage for all 27 routes, 43 tags, and 107 rules.
- Strict locale parity checks, shared homepage layer-tree structure, localized metadata, UI copy, and Chinese custom pages.

### Fixed

- Removed the silent English fallback and divergent parallel route lists that previously allowed incomplete Chinese URLs to render mixed-language content.

## [0.11.3] — 2026-08-19

### Changed

- Coverage snapshots now describe BRIDGE Assistant 0.9.3; exact Page Check 42/107 and Section Check 26/107 rule sets and catalog 0.5.0 are unchanged.
- The installable plugin now exposes its package version as a small, low-emphasis label in every visible plugin mode.

## [0.11.2] — 2026-08-19

### Fixed

- Page Check and Check selected section now bind change detection to the exact audited BRIDGE roots instead of treating any change on a large mixed Figma canvas as a stale result.
- A one-off relevant change triggers one automatic fresh read. Only repeated changes inside the audited scope stop the check, with copy that explains that BRIDGE did not edit the file.
- Extracted page facts are cached only when the document revision stays stable throughout traversal, preventing a mid-scan change from leaving stale evidence for the next run.
- Coverage snapshots now describe BRIDGE Assistant 0.9.2; the exact Page Check 42/107 and Section Check 26/107 rule sets and catalog 0.5.0 are unchanged.

## [0.11.1] — 2026-08-18

### Changed

- Native Figma Sections are now canonical transparent canvas organizers for BRIDGE page-root discovery. Responsive roots may sit directly on the Figma page or below one or more native `SECTION` nodes without turning those organizers into product structure.
- Organizer names/tags never become inherited BRIDGE context, while ordinary outer `FRAME`/`GROUP` wrappers remain non-transparent and invalid around page roots.
- Bilingual quick starts, design/responsive rules, checklists, validation pipeline, terminology, hard cases, examples, tag notes, and `routing.page-root-required` now describe the same boundary.
- BRIDGE Assistant 0.9.1 discovers direct and Section-organized roots together, accepts an unambiguous selected organizer, and preserves bounded scanning of unrelated canvas trees. Rule catalog 0.5.0 and exact Page/Section Check rule counts are unchanged.

## [0.11.0] — 2026-08-17

### Added

- A canonical selected-section adoption contract for applying BRIDGE to new work inside an otherwise legacy host without pretending that the host page is BRIDGE-ready.
- Typed `section` scope metadata, explicit selected-subtree and external-dependency boundaries, a valid multi-context section fixture, and executable scope/tag cases.
- A separate coverage profile for **Check selected section**, including local, selected-variant, deferred, and out-of-scope checks plus `Ready`, `Partial`, and `Blocked` result semantics.
- Bilingual section-scope guidance and a diagram covering opaque assets, atomic instances, traversed decorative layers, and deferred file-level resolution.

### Changed

- Responsive and section-layout catalog wording now applies to explicitly declared audit contexts without adding new rule IDs; the catalog remains version 0.5.0 with 107 rules.
- Incremental adoption, transfer, validation, preflight, designer, and lifecycle guidance now distinguish section-source readiness from page, integration, product, and WCAG readiness.
- A selected section below an inherited opaque `[asset]` boundary is now an explicit blocked scope precondition, while an exact `[section=id] [asset]` root remains a valid opaque whole-visual source with internal layout coverage not applicable.
- BRIDGE Assistant 0.9.0 adds selected-section checking. Its exact emitted-rule unions are recorded separately: Page Check covers 42 catalog rules (40 automatic, 2 heuristic), while Check selected section covers 26 (24 automatic, 2 heuristic; 20 local, 6 selected-variant). This also corrects the earlier Page Check manifest undercount without changing the 107-rule catalog.

## [0.10.0] — 2026-08-14

### Added

- Blocking native Figma Auto Layout rules for BRIDGE page roots, editable section roots, and multi-child content-flow containers.
- A blocking page-root `[asset]` rule, a blocking GROUP-outside-asset rule, and a bilingual Auto Layout gate diagram.
- Explicit source boundaries for opaque assets, exact-node decorative/overlay intent, primitives, and placed component instances.

### Changed

- Rule catalog expanded from 102 to 107 rules and versioned as 0.5.0.
- Page Check 0.8.0 coverage expanded from 24 to 30 rules: 29 automatic and 1 heuristic.
- `[bridge-exception=manual-layout] [reason=...]` now records a proposed deviation without suppressing structural errors; placed INSTANCE source components remain a separate audit boundary.
- Homepage, examples, checklists, validation guidance, tag registry, and transfer documentation now state the strict source-structure contract in English and Russian.

## [0.9.0] — 2026-08-13

### Added

- Contracts for real data and visualization, long-scroll and motion, state machines and reactions, WCAG 2.2 AA accessibility, target capabilities, performance budgets, and the full delivery lifecycle.
- Versioned `bridge` JSON Schema, valid fixture, 43-tag registry, executable tag examples, and explicit methodology coverage manifest.
- Six-channel homepage coverage map, review hub with persistent preflight and report export, filterable tag reference, and rule deep links.
- Five editable SVG infographics with PNG fallbacks and a new social preview.
- Pull-request CI, schema/content/link/build checks, and Playwright + axe coverage for desktop/mobile, keyboard, persistence, filtering, and reduced motion.

### Changed

- Rule catalog expanded from 77 to 102 rules; Page Check remains honestly scoped to 24 rules (23 automatic, 1 heuristic).
- Responsive default remains one logical tree, while structural changes are now represented by declared identity/state/semantics/focus mappings.
- Open questions and deviations are first-class records with scope, owner, status, review point, evidence, mitigation, and fallback.
- Site generation is manifest-driven, atomic, base-path aware, and checks generated/public asset parity.
- Public copy now makes the boundary explicit: the methodology and validator repository are open under MIT; the installable Figma plugin is public, but its implementation is private.

### Fixed

- Canonical homepage examples, exception grammar, plugin links, sitemap language alternates, 404 metadata, contrast, and interactive target sizes.

## [0.8.0] — 2026-07-17

- Added the interactive layer inspector, focused Figma companion workflow, bilingual site, and the original 77-rule catalog.

[0.11.5]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.11.5
[0.11.4]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.11.4
[0.11.3]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.11.3
[0.11.2]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.11.2
[0.11.1]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.11.1
[0.11.0]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.11.0
[0.10.0]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.10.0
[0.9.0]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.9.0
[0.8.0]: https://github.com/Poliklot/bridge-design-methodology/releases/tag/v0.8.0
