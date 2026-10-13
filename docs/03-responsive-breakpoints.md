# Responsive behavior

Responsive design is one page with a clear meaning at more than one width. It is not a set of unrelated desktop and mobile pictures.


<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/identity-en.svg" alt="Names and meaningful parents survive reflow" loading="lazy" width="481" height="613" />
<figcaption>Names and meaningful parents survive reflow. Explanatory diagram. <a href="../assets/tutorial/diagrams/identity-en.svg">Open full size</a>.</figcaption>
</figure>

The [visual introduction](25-visual-walkthrough.md) shows why these decisions matter to the team.

## Start with prepared roots

Give each prepared root the same page and state, changing only the context width:

```text
home [page=home] [bp=1440] [view=default]
home [page=home] [bp=375] [view=default]
```

Choose widths that the team will actually implement. A screenshot width is not automatically a product breakpoint.

## What can change

The following may change when the available space changes:

- size and spacing;
- number of columns;
- order inside the same meaningful parent;
- visibility of optional content;
- a declared presentation, such as table to disclosure list.

The page meaning, content identity, actions, and reading order must remain clear.

## Do not change the data to fit the grid

A narrow layout may show fewer items at once, but it must not silently delete records, alter prices, or use a different meaning. Record pagination, filtering, or a separate request as product behavior.

## Intermediate widths matter

Check widths between the prepared examples, not just the examples themselves. Text, cards, tables, fixed controls, and focus indicators need a defined behavior at those widths too. Prefer content-driven sizing and fluid layout over a collection of device-specific copies.

## Declare a real transformation

When the structure changes, name the source and destination and state what is preserved:

- records and content;
- actions and field relationships;
- selection and open state;
- reading and focus order.

Record this mapping in `responsive.transformations[]` as described in the [transfer contract](04-transfer-contract.md). A name such as `table-mobile` cannot explain what changes or what is preserved.

## Direction and accessibility

If the product supports RTL, localization, zoom, reduced motion, or long content, check those contexts as well. Visual mirroring must not break reading order, keyboard order, action targets, or accessible names.

## Ready to continue

The responsive part is ready when the team can tell what stays the same, what changes, at which condition, and what data or behavior is preserved. See [variation axes](../docs/16-variation-axes.md) for the structured reference.
