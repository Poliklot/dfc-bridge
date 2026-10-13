# DFC Bridge examples

Use these short recipes when a design question is concrete. Each example has one problem, one correction, and one reason. Choose the example that matches your current problem; you do not need to read them in order.

[A visual introduction to handoff decisions](../docs/25-visual-walkthrough.md): team questions, reasons and real Figma captures.

## 1. Page and widths

**Problem:** the file has unrelated `desktop` and `mobile-final-2` roots.

**Use:**

```text
home [page=home] [route=/] [bp=1440] [view=default]
home [page=home] [route=/] [bp=375] [view=default]
```

The same `[page]` and `[view]` connect the prepared widths. `[bp]` records the width shown by each root.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/contexts-en.svg" alt="workshop and default are shared by roots with native widths 1440 and 375" loading="lazy" width="481" height="557" />
<figcaption>Separate illustration using workshop, not a screenshot of the home snippet above. Read the shared page and view first, then the two bp values. They identify widths of one page view. A route supplies its URL separately; bp records a prepared native width, not a CSS media-query threshold. <a href="../assets/tutorial/diagrams/contexts-en.svg">Open full size</a>.</figcaption>
</figure>

## 2. One name across widths

**Problem:** `hero-title-mobile` looks like a new element.

**Use:**

```text
hero-title
```

The size or position can change. The stable name keeps the same logical element recognizable.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/identity-en.svg" alt="Lines match contact-button and faq-link between the two hero-actions frames" loading="lazy" width="481" height="613" />
<figcaption>Separate illustration using two buttons, not a rendering of hero-title above. Follow each connector to find the same named control at both widths. Names identify correspondence; they do not freeze position. Here both controls also keep hero-actions as their parent; a different meaningful parent requires a declared transformation. <a href="../assets/tutorial/diagrams/identity-en.svg">Open full size</a>.</figcaption>
</figure>

## 3. A page section

Use `[section]` for a section built directly in the page:

```text
product-results [section=product-results]
  product-grid [collection=products]
```

An instance from the `Page Sections` library already has a source component. Do not repeat the section key unless the local frame really is the section boundary.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/structure-en.svg" alt="The hero frame contains hero-copy with text, hero-actions with two controls, and workshop-art" loading="lazy" width="481" height="691" />
<figcaption>Separate illustration of a hero section, not the product-results tree above. Read the nested frames from outside in: hero owns the copy, actions and artwork; the text and controls have their own meaningful parents. This is a structure diagram, not a comparison of widths or a Figma capture. <a href="../assets/tutorial/diagrams/structure-en.svg">Open full size</a>.</figcaption>
</figure>

## 4. Link or interface action

Use `[href]` when the user navigates and `[action]` when the current interface changes:

```text
catalog-link [href=/catalog]
filter-button [action=state:filters-open]
```

Do not use a fake `href` for a button or a fake action for a normal link.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/interactions-en.svg" alt="href=#faq points to anchor=faq; action=modal:contact-modal points to modal=contact-modal" loading="lazy" width="481" height="839" />
<figcaption>Separate illustration using an anchor and modal, not the route/state example above. Read the two paths separately: href names the FAQ anchor destination; action names the modal to open in the current interface. These are declared intentions, not a wired Figma prototype or proof of working navigation, modal focus or closing behavior. <a href="../assets/tutorial/diagrams/interactions-en.svg">Open full size</a>.</figcaption>
</figure>

## 5. Button and modal

The action points to the modal’s stable identifier:

```text
contact-button [action=modal:contact-modal]

contact-modal [modal=contact-modal]
  modal-title
  close-button
```

The same UI Kit button can have different actions in different contexts. The action belongs to the instance in the page, not to the shared component name.

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../assets/tutorial/screenshots/assistant-layer-local.png" alt="Local Assistant: button, actual modal and jump to destination" loading="lazy" width="906" height="1173" />
<figcaption>Local Assistant: button, actual modal and jump to destination. Real capture of a local development build, not the published UI. <a href="../assets/tutorial/screenshots/assistant-layer-local.png">Open full size</a>.</figcaption>
</figure>

## 6. Meaningful structure

**Problem:** nearby layers are grouped only because they were selected together.

**Use:**

```text
hero
  hero-copy
    hero-title
    hero-subtitle
  hero-actions
    contact-button
```

Each wrapper has a real job: content, layout, clipping, background, or interaction area. Detailed layout policy is in [design rules](../docs/01-design-rules.md) and [wrapper policy](../docs/06-wrapper-policy.md).

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/structure-en.svg" alt="hero-copy groups text; hero-actions groups controls inside hero" loading="lazy" width="481" height="691" />
<figcaption>Expanded structural illustration, not a rendering of the abbreviated tree above. Follow the containment: hero-copy owns related text and hero-actions owns related controls. Each wrapper has a layout job. The diagram shows one meaningful structure, not a good-versus-bad comparison or a rule to add wrappers everywhere. <a href="../assets/tutorial/diagrams/structure-en.svg">Open full size</a>.</figcaption>
</figure>

## 7. Real content

Show the data that can change the layout:

```text
product-card
  product-title
  product-price
  product-image
```

Check short, long, empty, loading, and error states. Do not replace changing content with a picture of the final composition.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/content-en.svg" alt="The upper fixed-height card clips text; the lower Hug-height card retains it and moves the next card down" loading="lazy" width="481" height="703" />
<figcaption>Compare the same text above and below: in this example, Hug height preserves the final lines and moves the next card down. Fixed height, scrolling and truncation are not universally forbidden; each needs an explicit, appropriate overflow policy. <a href="../assets/tutorial/diagrams/content-en.svg">Open full size</a>.</figcaption>
</figure>

## 8. Content, decoration, and export

Use the smallest clear policy on the exact visual layer:

```text
product-image
hero-glow [decor]
campaign-illustration [asset]
```

`[decor]` describes visual purpose. `[asset]` says that the visual is transferred as one resource. A layer can use both when both statements are true.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/roles-en.svg" alt="Editable text, native decoration and one opaque visual are compared by role and transfer boundary" loading="lazy" width="481" height="761" />
<figcaption>Separate illustration with hero-title, hero-glow and workshop-art. Read each row from role to transfer boundary: text stays editable; decor identifies visual purpose; asset transfers one opaque visual. These are separate decisions, so decor and asset can coexist. This illustration does not classify every product image as decoration. <a href="../assets/tutorial/diagrams/roles-en.svg">Open full size</a>.</figcaption>
</figure>

## How to use this catalog

Find the question that matches your file and apply the smallest relevant pattern. Then use the [designer checklist](../docs/17-designer-checklist.md) to review the chosen handoff scope.

Layer names are not the place for an entire behavior specification. When the design needs [data](../docs/20-data-and-visualization.md), [reactions](../docs/22-state-machines-and-reactions.md), [motion](../docs/21-motion-and-scroll.md), or [accessibility](../docs/23-accessibility-profile.md), describe those decisions in the structured [transfer contract](../docs/04-transfer-contract.md). Use the executable `validator/examples/bridge-contract.valid.json` file in the repository as the starting point; the article’s illustrative excerpt and individual module fragments are not a complete handoff.
