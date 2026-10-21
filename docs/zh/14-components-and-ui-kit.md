# 组件和区块

组件库负责保持共享的视觉和行为一致。页面结构说明当前实例的含义以及它在此处执行的动作。


<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/axes-zh.svg" alt="上方是页面视图与宽度矩阵，下方分别是原生按钮变体和状态动作目标" loading="lazy" width="481" height="853" />
<figcaption>分开阅读三个示例：不同宽度的页面视图 default/empty、原生按钮变体 Type=Primary/Secondary，以及指向 filters-open 的动作。组件变体不是页面视图；声明状态目标也不等于实现运行时转换。 <a href="../../assets/tutorial/diagrams/axes-zh.svg">查看原图</a>。</figcaption>
</figure>

[图解入门](25-visual-walkthrough.md)展示了这种分工：共享组件定义按钮外观，页面实例指向当前页面的模态窗口。

## 两个库级别

- `UI Kit` 包含可复用的界面元素：按钮、字段、卡片和控件；
- `Page Sections` 包含具有独立结构和产品职责的大型页面区块。

组件的大小不决定级别，来源和职责才决定。

## 组件和实例

共享组件定义视觉状态和默认行为。页面中的实例提供当前内容、上下文和动作：

```text
contact-button [action=modal:contact-modal]
```

同一个按钮组件可以在不同位置打开不同目标。不要把具体页面动作写进共享组件名称。

对于明确声明为交互控件的来源，在 main component 上添加 `[control]` 或 `[link]`；若具体变体没有自己的交互契约，则可在其 ComponentSet 上声明。这样 Page/Section Check 就能提示未标注本地意图、且动作或地址仍未知的实例。只有实例没有本地交互意图时，才继承来源的默认行为，例如 `[action=none]`；明确的本地草稿仍然需要决定。来源标识不会复制到实例。名称“Button”、外观和文字标签都不是契约。

这项确定性的来源契约检查属于经过测试验证的本地 0.9.8 检查器候选版本，并不表示当前 Community 版本已具备此功能。它只读取来源意图，不遍历实例内部。Ready 仅涵盖声明的来源检查，并非全部交互：无法读取或未分类的来源、实例内容覆盖、原生原型行为及运行时 QA 均不在此检查范围内。在实例上设置当前页面的目标，重新检查，然后单独核对这些边界。

## 区块标识

来自 `Page Sections` 的实例已经有稳定来源。如果本地图层不是区块边界，就不要重复添加 `[section]`。直接在页面制作的区块需要明确键：

```text
checkout-summary [section=checkout-summary]
```

## 保持来源清楚

只要共享组件仍然负责，就使用实例而不是解除关联的副本。让页面专属内容保持可见和可编辑。数据、动作和状态应放在页面或结构化契约中。

## 交付前检查

- 能否找到源组件？
- 页面专属内容是否可见？
- 动作是否属于当前上下文？
- 是否展示了真实状态，而不是隐藏旧图层？

通用的来源规则见[设计规则](01-design-rules.md)。
