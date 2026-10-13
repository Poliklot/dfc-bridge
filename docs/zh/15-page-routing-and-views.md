# 页面路由和视图

先确认哪些画框属于同一页面，再记录它的真实地址、可能出现的状态以及链接可以到达的区块。这样，空目录不会变成虚构页面，移动布局也不会变成第二条路由。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/contexts-zh.svg" alt="原生宽度为 1440 和 375 的根节点共用 workshop 和 default" loading="lazy" width="481" height="557" />
<figcaption>先读共同的 page 和 view，再读两个 bp 值：它们是同一页面视图的不同宽度。URL 由 route 另行声明；bp 记录已准备的原生宽度，不是 CSS 媒体查询阈值。 <a href="../../assets/tutorial/diagrams/contexts-zh.svg">查看原图</a>。</figcaption>
</figure>

在[图解入门](25-visual-walkthrough.md)中，两个 `workshop` 根节点属于同一页面、同一视图，只有声明的宽度不同。

## 页面标识和可选路由

页面根节点始终需要稳定的 `[page=...]`。只有确定真实生产 URL 或路由模板后，才添加路由。

已知路由：

```text
contacts [page=contacts] [route=/contacts] [bp=1200]
contacts [page=contacts] [route=/contacts] [bp=320]
```

草稿中尚未确定路由：

```text
contacts [page=contacts] [bp=1200] [view=default]
contacts [page=contacts] [bp=320] [view=default]
```

规则：

- `[page=...]` 是稳定的页面标识。
- `[route=...]` 是生产 URL 路径，不是猜测或占位符。
- `[route-pattern=...]` 是真实的生产路由模板。
- 路由未知时省略它；缺失路由是草稿待办项，不是阻断错误。
- 同一页面的各断点和视图在路由已知时共享该路由。
- 具体路由在站点内唯一；有意使用路由模板的页面应明确声明模板。

## 路由语法

推荐形式：

```text
[route=/]
[route=/contacts]
[route=/catalog]
[route=/catalog/product]
[route-pattern=/catalog/:slug]
```

- `[route=...]` 用于具体生产页面。
- `[route-pattern=...]` 用于真实模板，例如商品详情页。
- 不要为了通过清单而编造路由。
- 除根路径 `/` 外，避免末尾斜杠，除非产品明确要求。
- 契约中的路由区分大小写；建议采用小写 `kebab-case` 路径。

<a id="页面浏览量"></a>

## 页面视图

`[view=...]` 描述页面或数据状态，不是组件的局部 UI 状态。

```text
catalog [page=catalog] [route=/catalog] [bp=1200] [view=default]
catalog [page=catalog] [route=/catalog] [bp=1200] [view=empty]
catalog [page=catalog] [route=/catalog] [bp=1200] [view=loading]
catalog [page=catalog] [route=/catalog] [bp=1200] [view=error]
```

常见视图：

```text
default
empty
loading
error
filtered
not-found
unauthorized
success
```

- 每个页面都应有 `view=default`。
- 动态页面和集合页面应按需要提供空、加载和错误视图。
- 同一页面的所有视图共享 `[page=...]`，路由已知时也共享 `[route=...]`。
- 不同视图可以有不同内容；同一视图的响应式断点不能擅自改变内容。
- 响应式标识、类型、父级、数量和内容只在同一视图内比较。不能把 `view=default` 与 `view=empty` 或 `view=error` 当作互相对应的断点。
- 页面契约共用一套必需断点；每个声明的视图都要在这些断点上有根节点。

## 错误的页面状态建模

不要把页面状态建成虚构页面或路由：

```text
catalog [page=catalog] [route=/catalog] [view=default]
catalog-empty [page=catalog-empty] [route=/catalog-empty]
```

正确做法：

```text
catalog [page=catalog] [route=/catalog] [view=default]
catalog [page=catalog] [route=/catalog] [view=empty]
```

生产路由未知时，保留同一页面标识，省略路由：

```text
catalog [page=catalog] [view=default]
catalog [page=catalog] [view=empty]
```

<a id="截面和锚杆"></a>

## 区块和锚点

可通过链接到达的区块使用 `[section=...]` 和 `[anchor=...]`：

```text
contacts-faq [section=contacts-faq] [anchor=faq]
```

`[section=...]` 指向可复用的区块或组件契约。可读的图层名称仍可反映当前页面的用途：

```text
catalog [section=product-slider]
related-products [section=product-slider]
recommended-products [section=product-slider]
hero [section=home-hero]
```

前三个例子的内容和数据不同，但适配器可以用同一个区块组件实现。`home-hero` 则是页面专属区块的例子。

- 已有 `[section=...]` 时，不要再给图层名添加 `Section /` 前缀。
- 同一页面各断点的 `[section=...]` 保持稳定。
- 不同页面中相同的 `[section=...]` 可以有不同标题、数据和内容。
- 锚点在同一路由或页面标识内唯一。
- 同一区块在各断点中保持相同锚点。
- 锚点属于导航决策，应在设计中确定，而不是留给实现阶段猜测。

## 链接和 href 解析

已知目标时，`href` 是唯一的目标来源，不需要 `[link=...]`：

```text
contacts [href=/contacts]
faq [href=/contacts#faq]
same-page-faq [href=#faq]
telegram [href=https://t.me/company]
```

目标未知时使用 `[link]`：

```text
contacts [link]
```

不要用 `[href=#]` 表示未知目标。`#faq` 是真实的同页锚点，单独的 `#` 无效。

验证器按以下关系查找目标：

```text
href=/contacts      -> page with [route=/contacts]
href=/contacts#faq  -> page [route=/contacts] + section [anchor=faq]
href=#faq           -> current page + section [anchor=faq]
href=https://...    -> external URL, no internal route required
```

如果目标页面尚处于草稿、路由未知，解析可以保留为待办项。一旦声明 `[route=...]`，它就必须是真实生产 URL。

<a id="查看和断点范围"></a>

## 视图和断点的唯一性范围

已知路由的顶层页面根节点按以下组合区分：

```text
page + route + bp + view
```

草稿中路由未知时：

```text
page + bp + view
```

例如：

```text
catalog [page=catalog] [route=/catalog] [bp=1200] [view=default]
catalog [page=catalog] [route=/catalog] [bp=320] [view=default]
catalog [page=catalog] [route=/catalog] [bp=1200] [view=empty]
catalog [page=catalog] [route=/catalog] [bp=320] [view=empty]
```

<a id="验证者规则"></a>

## 验证规则

DFC Bridge 验证器应报告以下情况：

- 页面根节点缺少路由：标记为草稿待办项，而非阻断错误；
- 已声明的路由不是生产 URL 路径；
- 具体路由重复；
- 同一页面标识在不同断点上使用不同的已知路由；
- 某个页面视图缺少必需断点；
- 动态集合页面缺少适用的空、加载或错误视图；
- 用 `[href=#]` 作为未知目标的占位符；
- 路由信息已知，但内部链接的路由不存在；
- 内部链接的锚点不存在；
- 同页锚点链接在当前页面找不到对应区块；
- 同一路由或页面标识内有重复锚点；
- 把页面状态建成独立的虚构路由。
