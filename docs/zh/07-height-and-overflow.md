# 内容和溢出

动态内容应使用它所需的空间。固定高度是产品决定，不是为了匹配一张截图的捷径。


<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/content-zh.svg" alt="长文本换行，卡片增长而不是裁剪" loading="lazy" width="481" height="703" />
<figcaption>长文本换行，卡片增长而不是裁剪. 说明示意图。 <a href="../../assets/tutorial/diagrams/content-zh.svg">查看原图</a>.</figcaption>
</figure>

[图解入门](25-visual-walkthrough.md)说明这些决策为什么对团队重要。

## 优先使用内容驱动的高度

允许文本、数据和列表增长。检查长单词、价格、名称、本地化、错误和空状态。

## 什么时候可以固定高度

当产品需要确定的可视区域、裁剪、媒体框或滚动区域时可以使用。然后决定内容放不下时怎么办。会增高的区块不再是固定高度；如果边界必须不变，就说明内部内容的处理方式：

- 在边界内换行；如果整个区块需要增高，应改用内容驱动的高度；
- 因明确原因裁剪；
- 在指定区域内滚动；
- 截断，但仍能访问完整内容。

不要只为了保持构图而手动换行或制作另一份移动文本。

## 检查边界

确认内容、焦点、错误提示和交互目标不会被意外裁剪。中间宽度请参见[响应式行为](03-responsive-breakpoints.md)。

## 就绪条件

团队应清楚区块在普通、长、空和错误数据下如何表现。
