# Why DFC Bridge matters

The design—desktop and mobile:

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../assets/tutorial/screenshots/figma-before-overview.png" width="1600" height="1488" alt="Actual Figma page 01: a finished-looking design at two widths, with roots named desktop and mobile-final-2" loading="eager" />
<figcaption>Looks finished. What was handed over is still unclear.</figcaption>
</figure>

The design looks good. Frontend, backend and AI still guess: what to build, where data comes from and where buttons lead.

DFC Bridge does not dictate design. Hand off **decisions, not guesses**.

<a class="bridge-lesson-download" href="../assets/tutorial/dfc-bridge-workshop.fig" download="dfc-bridge-workshop.fig"><span aria-hidden="true">↓</span> Download the design <span class="bridge-lesson-download-format">.fig</span></a>

1. Open Figma.
2. On the home screen, click **Import**.
3. Choose the downloaded `.fig`.

## 1. Looks good. Still unclear

`desktop` and `mobile-final-2`. One page or different screens? The names do not say. The team fills the gaps.

Compare both trees. Which heading and button are the same element?

<div class="bridge-lesson-pair bridge-lesson-tree-pair">
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../assets/tutorial/screenshots/tree-desktop.png" width="472" height="464" alt="Actual expanded Figma desktop layer tree: Heading and Button" loading="lazy" />
<figcaption>Desktop: <code>Heading</code> / <code>Button</code>.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../assets/tutorial/screenshots/tree-mobile.png" width="472" height="432" alt="Actual expanded Figma mobile layer tree: Title mobile and Button copy" loading="lazy" />
<figcaption>Mobile: <code>Title mobile</code> / <code>Button copy</code>.</figcaption>
</figure>
</div>

Two more “looks better on mobile” decisions:

- «Мастерская понятных макетов» → «Мастерская макетов». Changed content, not line wrapping.
- Moved all of `hero-actions` from `hero-copy` to `hero`, after the image. Changed parent, not just order.

<div class="bridge-lesson-pair bridge-lesson-heroes">
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../assets/tutorial/screenshots/figma-before-hero-desktop.png" width="1184" height="720" alt="Native Figma desktop hero detail: full heading, both controls before the illustration, original root label retained" loading="lazy" />
<figcaption>Desktop: full heading; both controls before the illustration.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<aside class="bridge-lesson-comment">
<p><strong>Frontend:</strong> Shorter text, buttons below the image—allowed.</p>
<img class="bridge-lesson-penguin" src="../assets/tutorial/illustrations/handoff-penguin-frontend-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<img src="../assets/tutorial/screenshots/figma-before-hero-mobile.png" width="344" height="632" alt="Native Figma mobile-final-2 hero detail: shortened heading, both controls after the illustration, original root label retained" loading="lazy" />
<figcaption>Mobile: «понятных» is missing; both controls are below the illustration. <a href="../assets/tutorial/screenshots/figma-before-overview.png">Full source capture</a>.</figcaption>
</figure>
</div>

Agree on the copy variant and describe the move. Here neither is declared: frontend and AI guess.

## 2. Connected the screens

Agreed: one `workshop` page, `/workshop` route, `default` view, widths 1440 and 375. Recorded on the roots:

```text
workshop [page=workshop] [route=/workshop] [bp=1440] [view=default]
workshop [page=workshop] [route=/workshop] [bp=375] [view=default]
```

Separate continuous Figma recordings. Automated character-by-character input and Cut/Paste; the mouse pointer does not follow actions. Captions and highlights are added.

Details: “View fullscreen” below → “Original size”.

<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../assets/tutorial/motion/native/page-metadata-en.mp4" poster="../assets/tutorial/motion/native/page-metadata-en.png" width="802" height="1040" controls playsinline preload="none" aria-label="Declare the workshop page, /workshop route, default view and 375 width"><a href="../assets/tutorial/motion/native/page-metadata-en.mp4" download="page-metadata-en.mp4">Download MP4</a></video>
<figcaption>Separately: linked the roots of one page. <a href="../assets/tutorial/motion/native/page-metadata-en.gif" download="page-metadata-en.gif">GIF</a>.</figcaption>
</figure>

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/contexts-en.svg" width="481" height="557" alt="Two workshop roots share page and default view, with widths 1440 and 375" loading="lazy" />
<figcaption>One page, one view, two widths.</figcaption>
</figure>

Frontend knows what to build. AI stops hunting for the “most final” screen. Tags describe the agreement; they do not create layout or code.

## 3. Found the same elements

Named by role, not device. Frontend and AI can now match elements:

| Before at 1440 / 375 | After at both widths |
| --- | --- |
| `Heading` / `Title mobile` | `hero-title` |
| `Button` / `Button copy` | `contact-button` |

Here we chose shared copy and parent. This is not the only way.

<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../assets/tutorial/motion/native/rename-title-en.mp4" poster="../assets/tutorial/motion/native/rename-title-en.png" width="818" height="570" controls playsinline preload="none" aria-label="Rename Title mobile to hero-title without changing product copy"><a href="../assets/tutorial/motion/native/rename-title-en.mp4" download="rename-title-en.mp4">Download MP4</a></video>
<figcaption><code>Title mobile</code> → <code>hero-title</code>. Name, not copy. <a href="../assets/tutorial/motion/native/rename-title-en.gif" download="rename-title-en.gif">GIF</a>.</figcaption>
</figure>

<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../assets/tutorial/motion/native/repair-copy-en.mp4" poster="../assets/tutorial/motion/native/repair-copy-en.png" width="798" height="640" controls playsinline preload="none" aria-label="Restore the full product heading Мастерская понятных макетов"><a href="../assets/tutorial/motion/native/repair-copy-en.mp4" download="repair-copy-en.mp4">Download MP4</a></video>
<figcaption>Restored «Мастерская понятных макетов». <a href="../assets/tutorial/motion/native/repair-copy-en.gif" download="repair-copy-en.gif">GIF</a>.</figcaption>
</figure>

<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../assets/tutorial/motion/native/move-actions-en.mp4" poster="../assets/tutorial/motion/native/move-actions-en.png" width="788" height="780" controls playsinline preload="none" aria-label="Move all of hero-actions into existing hero-copy, retaining both controls and Auto Layout"><a href="../assets/tutorial/motion/native/move-actions-en.mp4" download="move-actions-en.mp4">Download MP4</a></video>
<figcaption>All of <code>hero-actions</code> → <code>hero-copy</code>. Not one button. <a href="../assets/tutorial/motion/native/move-actions-en.gif" download="move-actions-en.gif">GIF</a>.</figcaption>
</figure>

**Different copy needs an [agreed product variant](16-variation-axes.md). A different parent needs a [declared transformation](03-responsive-breakpoints.md).** Reordering within one parent is allowed.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/identity-en.svg" width="481" height="613" alt="The same contact-button and faq-link inside hero-actions: a row at 1440 and a column at 375" loading="lazy" />
<figcaption>Same buttons. Different layout.</figcaption>
</figure>

Desktop buttons sit side by side; mobile buttons stack. **Different layouts are fine:** Auto Layout changes; text and parent stay the same here.

<div class="bridge-lesson-pair bridge-lesson-heroes">
<figure class="bridge-lesson-figure bridge-lesson-render">
<img src="../assets/tutorial/renders/hero-1440.png" width="1376" height="692" alt="Native capture of the prepared page at 1440 px: full heading and buttons side by side, with space around hero" loading="lazy" />
<figcaption>1440 px: buttons side by side.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-render">
<img src="../assets/tutorial/renders/hero-375.png" width="375" height="624" alt="Native capture of the prepared page at 375 px: full heading and buttons before the illustration, with actual page margins" loading="lazy" />
<figcaption>375 px: stacked buttons, before the image.</figcaption>
</figure>
</div>

The heading stays text. `workshop-art [decor] [asset]` stays one image. Do not flatten the interface into PNG.

## 4. Built a shared library

`button-primary` and `button-secondary` became shared components. Edit the source; instances update. No fixing every copy.

**UI-kit** shows both styles’ states; **Modals** holds the shared modal appearance. Frontend and AI see examples, not gaps to fill.

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../assets/tutorial/screenshots/figma-kit-modals.png" width="1160" height="1514" alt="Actual UI-kit: two button styles shown as default, hover, focused, pressed and disabled; Modals with contact-modal beside them" loading="lazy" />
<figcaption>Two styles, five state examples. The modal sits beside them.</figcaption>
</figure>

<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../assets/tutorial/motion/native/button-states-en.mp4" poster="../assets/tutorial/motion/native/button-states-en.png" width="1840" height="634" controls playsinline preload="none" aria-label="State: default → hover, then enable the independent Focus visible property"><a href="../assets/tutorial/motion/native/button-states-en.mp4" download="button-states-en.mp4">Download MP4</a></video>
<figcaption>Default → hover, then independent focus. <a href="../assets/tutorial/motion/native/button-states-en.gif" download="button-states-en.gif">GIF</a>.</figcaption>
</figure>

**Appearance in the library. Action on the page instance.** The same button elsewhere can do something different.

- `contact-button [action=modal:contact-modal]` → open the modal.
- `faq-link [href=#faq]` → go to FAQ.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/interactions-en.svg" width="481" height="839" alt="contact-button points to the local contact-modal; faq-link points to the faq anchor" loading="lazy" />
<figcaption>Button → modal. Link → FAQ.</figcaption>
</figure>

<figure class="bridge-lesson-figure bridge-lesson-motion">
<aside class="bridge-lesson-comment">
<p><strong>AI:</strong> At this width, the target is contact-modal.</p>
<img class="bridge-lesson-penguin" src="../assets/tutorial/illustrations/handoff-penguin-ai-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<video src="../assets/tutorial/motion/native/local-action-en.mp4" poster="../assets/tutorial/motion/native/local-action-en.png" width="888" height="930" controls playsinline preload="none" aria-label="Set an action on contact-button and find its hidden local contact-modal target at 375; Show target finds the layer, not an open modal"><a href="../assets/tutorial/motion/native/local-action-en.mp4" download="local-action-en.mp4">Download MP4</a></video>
<figcaption>On the instance: action → target at 375. <a href="../assets/tutorial/motion/native/local-action-en.gif" download="local-action-en.gif">GIF</a>.</figcaption>
</figure>

**Show target** finds the hidden layer; it does not open the modal. Behavior still needs implementation.

<details>
<summary>How the components work</summary>

Examples, not a working prototype.

`State=default/hover/pressed/disabled` are Figma variants, not DFC tags or page views. Focus is independent: `Focus visible=true` can coexist with `hover` and `pressed`.

The disabled condition and owner belong in the implementation contract. No loading state: modal and anchor, not an asynchronous request.

Each root has its own hidden `[modal=contact-modal]`. The main component in Modals is the appearance source, not another target. Email details, not a submission form.

</details>

Record the source and agreements in the [data contract](20-data-and-visualization.md).

## 5. Checked the result

Separate copy: different `hero-title` text and `hero-actions` parent. Auto Layout stays enabled. Repairs are not shown. The clip shows the old report and **Repeat**.

<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../assets/tutorial/motion/native/repeat-check-en.mp4" poster="../assets/tutorial/motion/native/repeat-check-en.png" width="1408" height="710" controls playsinline preload="none" aria-label="Repeat check on a separate workshop copy after repairs not shown: old two-error report to zero, checked 375 and 1440 contexts only"><a href="../assets/tutorial/motion/native/repeat-check-en.mp4" download="repeat-check-en.mp4">Download MP4</a></video>
<figcaption>Repairs off-clip. Repeat: 2 errors → 0. Checked 375/1440 only. <a href="../assets/tutorial/motion/native/repeat-check-en.gif" download="repeat-check-en.gif">GIF</a>.</figcaption>
</figure>

Page 02 shows this solution with UI-kit and Modals.

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<aside class="bridge-lesson-comment">
<p><strong>Backend:</strong> The cards are examples. The data source still needs agreement.</p>
<img class="bridge-lesson-penguin" src="../assets/tutorial/illustrations/handoff-penguin-backend-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<img src="../assets/tutorial/screenshots/figma-final-overview.png" width="1560" height="1072" alt="Prepared workshop roots at 1440 and 375 px beside UI-kit button states and Modals in actual Figma" loading="lazy" />
<figcaption>The result: consistent design, UI-kit and Modals together.</figcaption>
</figure>

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../assets/tutorial/screenshots/assistant-ready-summary-local.png" width="1398" height="396" alt="Header of an earlier local Assistant report for page 02: 375 and 1440 px, zero counters and the source-check boundary" loading="lazy" />
<figcaption>Earlier page-02 report, not the result of the preceding clip or a fresh check of the revised file. <a href="../assets/tutorial/screenshots/assistant-ready-result-local.png">Full historical report</a>.</figcaption>
</figure>

**“Ready” means the checked design scope, not a finished application.**

Hand off **source, assets and agreements**. Open questions have owners. Not one PNG and “it’s all obvious”.

## Next, as needed

- [Handoff checklist](17-designer-checklist.md).
- [Content and overflow](07-height-and-overflow.md) — preparation best practices.
- [New section in an old design](19-team-adoption.md).
- [Views and variants](16-variation-axes.md).
- [Accessibility](23-accessibility-profile.md).

Demo design. Captures from Figma; Assistant is a local build. Penguins are generated; team questions are examples. [Verification notes](../assets/tutorial/README.md).
