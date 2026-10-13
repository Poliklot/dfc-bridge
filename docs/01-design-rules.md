# Design rules

DFC Bridge adds only the meaning that Figma does not already store. The file itself remains the source of truth for layout, size, style, hierarchy, and component data.


<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/structure-en.svg" alt="The hero frame contains hero-copy with text, hero-actions with two controls, and workshop-art" loading="lazy" width="481" height="691" />
<figcaption>Read the nested frames from outside in: hero owns the copy, actions and artwork; the text and controls have their own meaningful parents. This is a structure diagram, not a comparison of widths or a Figma capture. <a href="../assets/tutorial/diagrams/structure-en.svg">Open full size</a>.</figcaption>
</figure>

The [visual introduction](25-visual-walkthrough.md) shows why these decisions matter to the team.

## 1. Do not repeat Figma

Do not put sizes, gaps, colors, layout direction, or component variants into layer names or tags. Add a tag only when it answers a product question: what page is this, what does it do, or what should be exported?

## 2. Build a clear structure

Use frames and components to express real relationships. A wrapper should have a job: content grouping, layout, clipping, background, or interaction area.

Keep the main flow in native Figma layout. A `GROUP` is not a content container; use it only inside a genuine `[asset]` subtree that transfers as one whole visual. “Opaque” means its internal composition is not rebuilt or checked as content layout. The [wrapper guide](06-wrapper-policy.md) explains which containers to keep.

## 3. Give each root one context

A page root describes one page, state, and prepared width:

```text
home [page=home] [bp=1440] [view=default]
```

Use the same `[page]` and `[view]` for the other widths. A native Figma Section may organize the canvas, but it does not replace the page root or add page meaning.

## 4. Separate content, decoration, and export

- editable text, data, and images remain content;
- `[decor]` marks the specific decorative visual layer, not its surrounding content container;
- `[asset]` marks a visual that is transferred as one resource.

Do not turn editable text into an image just to protect a composition.

## 5. Treat overflow as a decision

Text and data must survive realistic values, localization, and intermediate widths. If content clips, scrolls, truncates, or changes height, the intended behavior must be visible or recorded. See [height and overflow](07-height-and-overflow.md).

## 6. Keep components editable

Use the component from the correct library. A local instance may have page-specific content and action, but do not detach or hide old versions to make the file look complete.

## 7. Keep the method platform-independent

DFC Bridge describes intent, relationships, and constraints. It does not require a specific frontend framework. Implementation-specific details belong in the structured contract or the implementation record.

## Ready to hand over

The structure is ready when a person can find the page, widths, important relationships, actions, content policy, and open decisions without asking the author.
