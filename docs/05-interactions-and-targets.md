# Interactions and targets

Every interactive layer should answer two questions: what starts the interaction, and where does the result go?


<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/interactions-en.svg" alt="Navigation and interface change point to different targets" loading="lazy" width="481" height="839" />
<figcaption>Navigation and interface change point to different targets. Explanatory diagram. <a href="../assets/tutorial/diagrams/interactions-en.svg">Open full size</a>.</figcaption>
</figure>

The [visual introduction](25-visual-walkthrough.md) shows why these decisions matter to the team.

## Links use `href`

Use `[href]` for navigation, an anchor, email, phone, or another address:

```text
catalog-link [href=/catalog]
faq-link [href=#faq]
email-link [href=mailto:sales@example.com]
```

Use `[link]` only when the destination is intentionally not known yet. Do not use `[href=#]` as a placeholder.

## Controls use `action`

Use `[action]` when the current interface changes:

```text
filter-button [action=state:filters-open]
contact-button [action=modal:contact-modal]
```

The target must exist in the declared area or be recorded as an owned open question. The same shared button component can have different actions in different page contexts.

## Fields use `field`

Give a field a stable data name and show its useful states:

```text
email-field [field=email] [name=email]
```

The component can supply the visual pattern; the page must show the relationship to its label, form, error, and submit action.

## Describe the important result

For a meaningful interaction, show or record:

- the initial state;
- the event and target;
- loading, success, empty, and error outcomes when relevant;
- focus, announcement, and history behavior when they affect the user.

Keep tags short. Put a longer state graph in the [reactions guide](22-state-machines-and-reactions.md) or structured contract.

## Check before handoff

Follow the action from its layer to its target. If you cannot find the target without asking the author, the interaction is not ready.
