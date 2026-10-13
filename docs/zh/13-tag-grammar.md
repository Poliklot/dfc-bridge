# DFC Bridge 标签语法

DFC Bridge 标签是写在图层名称中的简短机器可读标记，只补充 Figma 元数据没有表达的产品或交付含义。

把本页作为按需查阅的语法参考，而不是每个图层都要填写的清单。先给元素取稳定名称，再根据要补充的含义选择标签；完整流程见[设计师快速起步](00-designer-quick-start.md)。

## 核心原则

标签如果重复 Figma 中已经保存的信息，就不要添加。

以下技术属性以 Figma 为准：

- 节点类型：文本、图像/矢量、组件实例；
- Auto Layout、约束、尺寸、间距、内边距、对齐和换行；
- 层级：画框、组和组件；
- 定位、剪裁、遮罩；
- 填充、描边、效果；
- 源组件、变体、组件属性。

DFC Bridge 标签只表达产品含义或交付意图。

<a id="句法"></a>

## 语法格式

需要机器读取的具体值使用属性标签：

```text
[property=value]
```

不需要值的视觉意图、交付策略或草稿状态使用布尔标签：

```text
[decor]
[asset]
[link]
[control]
```

图层名称本身就可以作为 Figma 内的稳定标识：

```text
hero-title
product-photo
close-icon
button-group
```

名称必须保持稳定，并使用英文 `kebab-case`。

属性值如果用作标识，也必须使用英文 `kebab-case`。只有定义了其他值格式的标签例外，例如 `[route=/path]`、`[href=https://...]` 或 `[action=modal:target-id]`。

<a id="设计师写的标签"></a>

## 设计师使用的标签

<a id="页面和路线"></a>

### 页面与路径

```text
[page=home]
[route=/]
[bp=1920]
[view=default]
[anchor=faq]
```

```text
home [page=home] [route=/] [bp=1920] [view=default]
faq [anchor=faq]
```

`[page=...]`、`[bp=...]` 和 `[view=...]` 标明页面根的页面、控制宽度和视图，即使路径尚未确定也可以先准备设计。只有真实产品 URL 已知时才添加 `[route=...]` 或 `[route-pattern=...]`：

```text
contacts [page=contacts] [bp=1440] [view=default]
contacts [page=contacts] [route=/contacts] [bp=1440] [view=default]
product-detail [page=product-detail] [route-pattern=/catalog/:slug] [bp=1440] [view=default]
```

不要为了完成清单而编造产品路径。

<a id="分段合同"></a>

### 区块契约

```text
[section=product-slider]
[section=home-hero]
```

`[section=...]` 表示区块组件的稳定键，而不是某个内容块的标题。

如果区块是来自 `Page Sections` 库页面的组件实例，页面上的实例不需要再写标签：

```text
header
reviews
footer
```

此时区块键来自源组件：

```text
Page Sections / header -> section=header
Page Sections / reviews -> section=reviews
Page Sections / footer -> section=footer
```

如果区块只是普通画框，或组件过于通用、无法确定区块身份，则显式添加标签：

```text
catalog [section=product-slider]
related-products [section=product-slider]
recommended-products [section=product-slider]
hero [section=home-hero]
```

不要使用 `Section /` 等前缀；标签或 `Page Sections` 中的源组件已经说明了角色。

### 目标

目标标签写在被打开或激活的对象上；`[action]` 写在触发动作的控件上。例如 `[action=modal:contact-modal]` 对应 `[modal=contact-modal]`。

```text
[modal=contact-modal]
[state=mobile-menu-open]
```

```text
contact-modal [modal=contact-modal]
mobile-menu-open [state=mobile-menu-open]
```

### 链接

已知的导航地址使用 `[href=...]`。它已经足以将图层识别为链接，普通设计示例不需要额外的 `[link=...]`。

```text
[href=/contacts]
[href=/contacts#faq]
[href=#faq]
[href=https://t.me/company]
[href=mailto:sales@example.com]
[href=tel:+12025550123]
```

```text
contacts-link [href=/contacts]
faq-link [href=/contacts#faq]
same-page-faq [href=#faq]
telegram-link [href=https://t.me/company]
email-link [href=mailto:sales@example.com]
phone-link [href=tel:+12025550123]
```

地址尚未确定时，使用布尔草稿标记 `[link]`：

```text
contacts-link [link]
```

`[href=#]` 无效。`#faq` 是真正的同页锚点；`#` 不是未知的 href 占位符。

可选的链接行为：

```text
[open=new-tab]
[a11y-label=Telegram]
```

`[link=...]` 只用于需要在图层名称之外显式指定稳定机器 ID 的进阶场景，不用于普通设计示例。

```text
contacts-cta [link=nav-contacts-primary] [href=/contacts]
```

验证器按以下类别识别地址：

- `/path` — 内部路由；
- `#anchor` — 同页锚点；
- `/path#anchor` — 跨页锚点；
- `https://...` — 外部 URL；
- `mailto:` / `tel:` — 外部协议。

<a id="控制和操作"></a>

### 控件与动作

已知的非导航动作使用 `[action=...]`。它已经足以将图层识别为控件或按钮，普通设计示例不需要额外的 `[control=...]`。

```text
[action=modal:contact-modal]
[action=state:mobile-menu-open]
[action=submit:lead-form]
[action=reset:catalog-filters]
[action=none]
```

```text
contact-cta [action=modal:contact-modal]
menu-button [action=state:mobile-menu-open]
lead-submit [action=submit:lead-form]
reset-filters [action=reset:catalog-filters]
disabled-cta [action=none]
```

动作尚未确定时，使用布尔草稿标记 `[control]`：

```text
contact-cta [control]
```

`[control=...]` 只用于需要在图层名称之外显式指定稳定机器 ID 的进阶场景，不用于普通设计示例。

```text
contact-cta [control=contact-cta-primary] [action=modal:contact-modal]
```

允许的动作格式：

```text
[action=modal:target-id]
[action=state:target-id]
[action=submit:form-id]
[action=reset:target-id]
[action=none]
```

<a id="领域"></a>

### 字段

字段需要稳定标识和数据绑定名称。

```text
email [field=email] [name=email]
country [field=country] [name=country]
message [field=message] [name=message]
```

只有无法从 UI Kit 或原生元数据确定字段类型时，才添加 `[field-type=...]`：

```text
country [field=country] [name=country] [field-type=select]
```

<a id="收藏品和重复物品"></a>

### 集合与重复条目

只有需要明确动态列表或重复数据时，才使用集合/条目标签。

```text
products [collection=products]
product-card-oak-chair [item=product]
product-card-wool-lamp [item=product]
```

共用的 `[item=product]` 值表示可重复的角色或类型，不是唯一标识。具体设计实例和运行时记录通过稳定图层名称/`bridgeKey` 以及 `designInstance`/`runtimeData` 映射区分。如果卡片是组件实例，且重复关系从 Figma 结构中已很清楚，就不需要额外标签。

### 视觉意图

内容图片使用稳定图层名称，无需手动添加 `[image=...]`。

```text
product-photo
article-cover
author-avatar
```

`[decor]` 和 `[asset]` 是布尔型的视觉意图或交付策略标签，不是必填的身份标签。它们可以同时出现，不应被报告为“多个身份标签”。

装饰图层使用 `[decor]`。

`[decor]` 的含义是：

- 该层具有装饰性；
- 不是产品内容；
- 在不透明资源之外，它只标记具体的、具有明确意图的绝对定位视觉节点，而不是内容流容器或 `GROUP`；
- 不应进入无障碍树，可以使用 `aria-hidden`；
- 不需要替代文本或内容语义；
- 在不同断点间保留稳定标识，不得无故消失；
- 不会停用对自身、祖先或任意子树的 Auto Layout 或 `GROUP` 检查。

```text
sneg [decor]
snow-bg [decor]
hero-glow [decor]
```

整体导出或使用的视觉资源使用 `[asset]`。

`[asset]` 的含义是：

- 将视觉效果作为一个整体导出或使用；
- 不要从内部层重建它；
- 结构布局检查不再进入其内部组合，即将内部视为“不透明”；
- 资源根在不同断点间仍保留稳定标识，也是父级 Auto Layout 中的一项；
- 切勿标记整个 DFC Bridge 页面根 `[asset]` 以绕过布局检查。

```text
promo-poster [asset]
lab-illustration [asset]
snow-bg [decor] [asset]
```

如果图层已有稳定名称，优先使用无值的布尔形式：

```text
sneg [decor] [asset]
```

标识是 `sneg`；`[decor]` 和 `[asset]` 只补充视觉意图和交付策略。

带值的旧形式仍然有效，但只用于名称不明确或仍为默认名称的后备场景：

```text
Frame 182 [decor=snow-bg]
Group 91 [asset=promo-poster]
```

`[decor=...]` 或 `[asset=...]` 如果带值，该值必须符合英文 `kebab-case`。无值的 `[decor]` 和 `[asset]` 也是有效形式。

### 高度和溢出

仅当无法从 Figma 安全推断行为或动态内容需要显式策略时才使用这些标签。

```text
[height=hug]
[height=fixed]
[height=min]
[height=fill]
[overflow=visible]
[overflow=hidden]
[overflow=scroll]
[overflow=truncate]
[lines=3]
```

```text
description [height=hug]
description [height=fixed] [overflow=truncate] [lines=3]
```

### 例外情况

```text
[bridge-exception=raster-text]
[bridge-exception=overlay]
[bridge-exception=manual-layout]
[bridge-exception=fixed-height]
[bridge-exception=manual-line-break]
[bridge-exception=unsupported-effect]
[bridge-exception=manual-transfer]
[reason=brand-lockup]
```

规则：

- 每项例外都需要 `[reason=...]`；
- `[bridge-exception=manual-line-break]` 只允许用于内容本身需要的换行或已批准的品牌组合，不能用于勉强容纳动态文本；
- `[bridge-exception=overlay] [reason=...]` 只能在具体的绝对定位叠加节点上说明定位意图；
- 具体 `GROUP` 或手动布局容器上的 `[bridge-exception=manual-layout] [reason=...]` 只记录提出的偏差，不会消除页面、区块、容器或 `GROUP` 的结构错误；
- 例外不会使设计变得更好，它们只会使复杂性变得更加明确。

## 标识限制

标识描述逻辑元素，而不是宽度或设备。控制宽度已通过 `[bp=...]` 记录在页面根上。

不正确：

```text
reviews [control=button-reviews-box-768] [action=modal:marketplaces-modal]
```

正确：

```text
reviews [action=modal:marketplaces-modal]
```

用于标识的可选值，如 `[link=...]`、`[control=...]`、`[field=...]`、`[modal=...]`、`[state=...]`、`[section=...]`、集合/条目 ID，以及后备形式 `[decor=...]` / `[asset=...]`，不得带有匹配当前断点的后缀，例如 `-768`、`-375`、`-mobile` 或 `-desktop`。

<a id="figma-中未写的标签"></a>

## 不应写入 Figma 的标签

对于 Figma 设计，请勿使用：

```text
[text=...]
[image=...]
[icon=...]
[container=...]
[layout=...]
[abs]
[component=...]
[to=...]
```

规则：

- `TEXT` 节点从图层名称中获取标识；
- 内容图片从图层名称中获取标识；
- 图标从图层名称或组件元数据中获取标识；
- 页面根、由画框构建的区块，以及含多个内容流子节点的容器使用 Figma 原生 Auto Layout；
- `GROUP` 只允许在不透明的 `[asset]` 子树内；基础图形和叶节点几何不要求自身拥有 Auto Layout；
- 定位由 Figma 保存；
- 组件源、变体和状态来自 UI Kit 组件元数据；
- 导航目的地始终是 `[href=...]`，而不是 `[to=...]`。

## 组件所有权

当 Figma 已经知道源组件时，不要使用 `[component=...]` 标记页面实例。组件源、变体和 UI 状态属于 UI Kit，应从 Figma 组件元数据中提取。

页面上的实例：

```text
contact-cta [action=modal:contact-modal]
```

UI Kit 组件源定义了状态：默认、悬停、焦点、禁用、加载、错误等。

参见[组件与 UI Kit](14-components-and-ui-kit.md)。

## 无效示例

```text
hero-title [text=hero-title]
```

对于 Figma TEXT 节点无效：使用图层名称 `hero-title`。

```text
content [container=content] [layout=stack]
```

不适用于 Figma 结构：使用名为 `content` 的画框，并设置原生 Auto Layout。

```text
Group 91 [decor]
```

在资源子树之外无效：`[decor]` 不会让 `GROUP` 满足布局契约。应换成 Auto Layout 画框；只有整个视觉确实作为一个不透明资源交付时，才使用 `artwork [decor] [asset]`。

```text
legacy-lockup [bridge-exception=manual-layout] [reason=vendor-master-art]
```

例外语法有效，但资源之外的 `GROUP` 仍不能通过结构验证。该阻塞问题需要进入独立的偏差审批阶段。

```text
snow-bg [decor] [abs]
```

无效：`decor` 表达意图，定位来自 Figma。`snow-bg [decor]` 只用于那个具有原生绝对定位的具体视觉节点。

```text
faq [to=anchor:contacts-faq] [href=/contacts#faq]
```

无效：两个目的地。仅使用 `[href=/contacts#faq]`。

```text
unknown-link [href=#]
```

无效：`#` 不是未知的 href 占位符。使用 `unknown-link [link]`。
