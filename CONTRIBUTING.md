# Contributing to DFC Bridge

DFC Bridge accepts improvements to the public methodology, documentation, schemas, validator catalog, examples, and site. The Figma plugin implementation is private and is not part of this repository.

## Source of truth

- Author methodology in `docs/*.md` (EN), `docs/ru/*.md` (RU), and `docs/zh/*.md` (ZH).
- Author the example catalog in `examples/README.md`, `examples/README.ru.md`, and `docs/zh/examples/README.md`.
- Register each topic's three localized sources and routes in `validator/site-content.json`.
- Treat `validator/tags.json`, `validator/rules.json`, and `validator/bridge.schema.json` as machine-readable contracts.
- Do not edit generated Markdown under `src/content/docs/`. Run `npm run content:sync` after editing the authored sources.

## Explain a task, not just a rule

Apply this review to the section being changed; do not force every reference page into a tutorial or rewrite coherent prose unnecessarily.

For an introduction, explain the reader's problem before naming the mechanism: show one familiar decision (for example, which modal a button opens), then the smallest notation that records it. Explain brackets before the first tag tree. Keep the first action close to the opening; the full grammar, brand mnemonic, validator counts, and structured contract are references, not entrance requirements. Simplify the explanation, not the rule: retain its conditions, exceptions, and what the example does not prove.

1. **Start with the reader's task and scope.** Say whether the instructions apply to a page, selected section, component source, instance, or implementation. State prerequisites before the first action.
2. **Give a usable sequence.** Explain the problem, show the smallest complete example or exact action, name the visible result to check, and link to the next step. For a UI procedure, include what to select and the actual command; do not skip an intermediate screen.
3. **Keep decisions distinct.** Separate required rules from recommendations and examples. Explain alternatives and their conditions. Native Figma properties, short intent tags, and structured `bridge` fields are different sources; never invent a tag to replace the other two.
4. **Keep claims within their evidence.** A source check does not prove runtime behavior or delivery readiness. State what Ready, Partial, Blocked, and Deferred mean in the relevant scope. Distinguish current features from proposals, local builds from releases, and independent examples from one continuous exercise.
5. **Translate meaning, not syntax.** Update EN/RU/ZH together. Preserve machine keys, tag values, rule IDs, code examples, conditions, exceptions, and validation scope. Read translated paragraphs as instructions: a fluent sentence with a reversed condition is still wrong.
6. **Preserve navigation.** Keep useful headings and incoming anchors. If a misleading heading must change, retain its old anchor explicitly. Link to the exact supporting rule rather than repeating a second, diverging specification.
7. **Review the rendered result.** Read the changed page from its opening through the next-step link, including captions. Check that the text still works without the image and that the image supports, rather than enlarges, the claim. Automated parity, length, and link checks are not editorial approval.

For tutorial screenshots, recordings, captions, and embeds, also follow [the media production runbook](assets/tutorial/MEDIA-PRODUCTION.md). Preserve deliberate teaching errors and rehearse only in disposable copies.

## Local workflow

```bash
nvm use
npm ci
npm run dev
```

Before opening a pull request:

```bash
npm test
npx playwright install chromium
npm run test:e2e
npm audit
```

`npm test` validates schemas and fixtures, localized rule and document parity, Russian terminology, Page/Section Check coverage, canonical and built links, generated-content parity, Astro types, and the production build. It does not certify the clarity of explanations or translations; perform the editorial review above as well.

### Localized interface

Keep route prefixes separate from language tags: Chinese pages use `/zh/`, but Starlight configuration translations and `src/content/i18n/` use the declared BCP-47 tag `zh-CN`. Author missing shared UI strings in the native i18n collection, not in generated HTML or `node_modules`.

Check rendered UI in all three languages, including sidebar group headings, copy-button feedback, screen-reader labels and missing-page recovery. Test language switching on the same article, plus the narrow-screen menu and keyboard close/reopen. A complete dictionary or translated article does not prove that the framework selected the right strings. The single static 404 uses the URL locale when JavaScript is available and exposes all three home links without it.

### Temporary dependency override

Expressive Code currently requires `postcss-nested` 6, whose parser 6 dependency has no fix for GHSA-rj75-hqrm-r3gf. `package.json` therefore overrides only `postcss-nested@6.2.0`'s parser to `7.1.6`. All 69 upstream nesting tests pass with that parser. This intentionally crosses the parser's major version without changing the nesting plugin or downgrading Starlight.

Remove the override when the normal upstream dependency chain selects a patched parser. After changing it, run a clean `npm ci`, `npm test`, browser tests, and `npm audit`; do not force a framework downgrade or lower the audit gate to hide a finding.

## Contract changes

For a new tag, structured field, or rule:

1. explain the user problem and why existing metadata is insufficient;
2. update the schema/registry and a valid fixture or executable case;
3. add EN/RU/ZH documentation and examples;
4. declare automatic, heuristic, or manual validation ownership;
5. state compatibility and migration impact before changing an existing meaning.

Short layer tags are identity and intent anchors. Rich data, responsive transforms, reactions, motion, accessibility, target capabilities, lifecycle evidence, deviations, and open questions belong under structured `bridge` metadata.

## Visuals and accessibility

Prefer editable SVG for diagrams, include a meaningful `<title>` and `<desc>`, and keep a PNG fallback when a downstream surface needs it. Every interactive change must support keyboard operation, visible focus, touch targets, reduced motion, and EN/RU/ZH layouts.

For explanatory infographics, use the [diagram recipe](assets/tutorial/MEDIA-PRODUCTION.md#11-объясняющие-схемы-и-инфографика). Author the relationship in `scripts/build-tutorial-diagrams.mjs`, not separately in exported SVGs. Match the figure to its paragraph: a tree does not demonstrate two widths; a declared action does not demonstrate working runtime behavior. Localize visible labels as well as alt text. Keep the prose useful without the figure and verify the actual rendered figure at 320/390 px, not just its source dimensions.

## Pull request scope

Keep a change internally consistent: documentation, machine-readable truth, examples, localized copy, and tests should land together. Do not expose private plugin source URLs, issue trackers, release feeds, or implementation details.
