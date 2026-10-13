# DFC Bridge 示例

当设计问题已经明确时，使用这些简短示例。每个示例只说明一个问题、一个修正和一个原因。选择与你当前任务相符的示例，不必按顺序阅读。

[交付决策图解入门](../docs/25-visual-walkthrough.md)：团队疑问、决策原因与真实 Figma 截图。

## 1. 页面和宽度

**问题：** 文件中有互不关联的 `desktop` 和 `mobile-final-2` 根图层。

**使用：**

```text
home [page=home] [route=/] [bp=1440] [view=default]
home [page=home] [route=/] [bp=375] [view=default]
```

相同的 `[page]` 和 `[view]` 表示准备好的宽度属于同一页面。`[bp]` 记录每个根图层展示的宽度。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../../assets/tutorial/diagrams/contexts-zh.svg" alt="同一页面与视图的两个原生宽度" loading="lazy" width="481" height="557" />
<figcaption>同一页面与视图的两个原生宽度。 说明示意图。 <a href="../../../assets/tutorial/diagrams/contexts-zh.svg">查看原图</a>.</figcaption>
</figure>

## 2. 不同宽度使用同一个名称

**问题：** `hero-title-mobile` 看起来像一个新元素。

**使用：**

```text
hero-title
```

尺寸或位置可以变化，但稳定名称能让人识别同一个逻辑元素。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../../assets/tutorial/diagrams/identity-zh.svg" alt="重排后保留名称与有意义的父层" loading="lazy" width="481" height="613" />
<figcaption>重排后保留名称与有意义的父层。 说明示意图。 <a href="../../../assets/tutorial/diagrams/identity-zh.svg">查看原图</a>.</figcaption>
</figure>

## 3. 页面区块

直接在页面中制作区块时使用 `[section]`：

```text
product-results [section=product-results]
  product-grid [collection=products]
```

来自 `Page Sections` 库的实例已经有源组件。如果当前图层不是区块边界，就不要重复添加区块键。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../../assets/tutorial/diagrams/structure-zh.svg" alt="区块中包含有意义的文字及动作容器" loading="lazy" width="481" height="691" />
<figcaption>区块中包含有意义的文字及动作容器。 说明示意图。 <a href="../../../assets/tutorial/diagrams/structure-zh.svg">查看原图</a>.</figcaption>
</figure>

## 4. 链接还是动作

使用 `[href]` 表示跳转，使用 `[action]` 表示当前界面发生变化：

```text
catalog-link [href=/catalog]
filter-button [action=state:filters-open]
```

不要给按钮使用假的 `href`，也不要给普通链接使用假的动作。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../../assets/tutorial/diagrams/interactions-zh.svg" alt="导航与界面变化指向不同目标" loading="lazy" width="481" height="839" />
<figcaption>导航与界面变化指向不同目标。 说明示意图。 <a href="../../../assets/tutorial/diagrams/interactions-zh.svg">查看原图</a>.</figcaption>
</figure>

## 5. 按钮和模态窗口

动作指向模态窗口的稳定标识：

```text
contact-button [action=modal:contact-modal]

contact-modal [modal=contact-modal]
  modal-title
  close-button
```

同一个 `UI Kit` 按钮可以在不同位置执行不同动作。动作属于页面中的实例，而不是共享组件的名称。

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../../assets/tutorial/screenshots/assistant-layer-local.png" alt="本地助手：按钮、真实目标与定位操作" loading="lazy" width="906" height="1173" />
<figcaption>本地助手：按钮、真实目标与定位操作。 本地开发版的真实截图，并非已发布界面。 <a href="../../../assets/tutorial/screenshots/assistant-layer-local.png">查看原图</a>.</figcaption>
</figure>

## 6. 有意义的结构

**问题：** 相邻图层只是因为被同时选中才被分在一起。

**使用：**

```text
hero
  hero-copy
    hero-title
    hero-subtitle
  hero-actions
    contact-button
```

每个容器都应有实际作用：内容、布局、裁剪、背景或交互区域。详细规则请看[设计规则](../docs/01-design-rules.md)和[容器规则](../docs/06-wrapper-policy.md)。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../../assets/tutorial/diagrams/structure-zh.svg" alt="有意义的容器而不是随意分组" loading="lazy" width="481" height="691" />
<figcaption>有意义的容器而不是随意分组。 说明示意图。 <a href="../../../assets/tutorial/diagrams/structure-zh.svg">查看原图</a>.</figcaption>
</figure>

## 7. 真实内容

展示可能改变布局的数据：

```text
product-card
  product-title
  product-price
  product-image
```

检查短、长、空、加载和错误状态。不要用一张最终构图图片替代会变化的内容。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../../assets/tutorial/diagrams/content-zh.svg" alt="长文本换行，卡片增长而不是裁剪" loading="lazy" width="481" height="703" />
<figcaption>长文本换行，卡片增长而不是裁剪。 说明示意图。 <a href="../../../assets/tutorial/diagrams/content-zh.svg">查看原图</a>.</figcaption>
</figure>

## 8. 内容、装饰和导出

在准确的视觉图层上使用最短且清晰的规则：

```text
product-image
hero-glow [decor]
campaign-illustration [asset]
```

`[decor]` 表示视觉作用，`[asset]` 表示整个视觉作为一个资源交付。如果两个说明都成立，同一图层可以同时使用两个标签。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../../assets/tutorial/diagrams/roles-zh.svg" alt="可编辑内容、装饰与整体导出的区别" loading="lazy" width="481" height="761" />
<figcaption>可编辑内容、装饰与整体导出的区别。 说明示意图。 <a href="../../../assets/tutorial/diagrams/roles-zh.svg">查看原图</a>.</figcaption>
</figure>

## 如何使用示例目录

找到与你的文件相符的问题，采用最小的适用写法，然后按[设计师清单](../docs/17-designer-checklist.md)检查选定的交付范围。

图层名称不能代替完整的行为说明。[数据](../docs/20-data-and-visualization.md)、[反应](../docs/22-state-machines-and-reactions.md)、[动效](../docs/21-motion-and-scroll.md)和[无障碍](../docs/23-accessibility-profile.md)决策应写入结构化[交付契约](../docs/04-transfer-contract.md)。从仓库中可验证的 `validator/examples/bridge-contract.valid.json` 文件开始。文章中的说明性示例和单个模块片段并不构成完整交付。
