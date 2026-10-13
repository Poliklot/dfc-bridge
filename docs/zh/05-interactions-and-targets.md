# 交互和目标

每个交互图层都应回答两个问题：什么会启动动作，结果会到哪里。


<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/interactions-zh.svg" alt="href=#faq 指向 anchor=faq；action=modal:contact-modal 指向 modal=contact-modal" loading="lazy" width="481" height="839" />
<figcaption>分别阅读两条路径：href 声明 FAQ 锚点目的地，action 声明在当前界面打开的模态框。这些是意图，不是已连接的 Figma 原型，也不证明导航、模态框焦点或关闭行为已实现。 <a href="../../assets/tutorial/diagrams/interactions-zh.svg">查看原图</a>。</figcaption>
</figure>

[图解入门](25-visual-walkthrough.md)说明这些决策为什么对团队重要。

## 链接使用 `href`

使用 `[href]` 表示页面跳转、锚点、邮件、电话或其他地址：

```text
catalog-link [href=/catalog]
faq-link [href=#faq]
email-link [href=mailto:sales@example.com]
```

只有在目标确实未知且已记录时才使用 `[link]`。不要用 `[href=#]` 作为占位符。

## 控件使用 `action`

当当前界面发生变化时使用 `[action]`：

```text
filter-button [action=state:filters-open]
contact-button [action=modal:contact-modal]
```

这里的 `contact-modal` 是目标标识，对应图层带有 `[modal=contact-modal]`。已确定的目标必须存在于声明范围内；未解决的决定则记录为有负责人的问题。动作本身尚未知时，使用 `[control]`，不要编造动作目标。同一个共享按钮组件可以在不同页面位置执行不同动作。

## 字段使用 `field`

为字段设置稳定的数据名称，并展示需要的状态：

```text
email-field [field=email] [name=email]
```

组件可以提供视觉样式，但页面仍需说明字段与标签、表单、错误和提交动作的关系。

## 说明重要结果

对于重要交互，请展示或记录：

- 初始状态；
- 事件和目标；
- 相关的加载、成功、空和错误结果；
- 会影响用户的焦点、提示和历史行为。

标签保持简短。复杂状态图记录在结构化契约中；[状态与反应指南](22-state-machines-and-reactions.md)说明如何描述事件、结果和转换。

## 交付前检查

从动作图层一路找到目标。如果必须询问作者才能找到目标，交互还没有准备好。
