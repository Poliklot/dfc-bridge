# 为何用 DFC Bridge

先看设计：

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/figma-before-overview.png" width="1600" height="1488" alt="真实 Figma 页面 01：两种宽度的完整视觉设计，根节点名为 desktop 和 mobile-final-2" loading="eager" />
<figcaption>交付对象不明。</figcaption>
</figure>

设计漂亮。前端、后端、AI 在猜：做什么，数据哪来，按钮去哪？

DFC Bridge 不规定设计。交付**决定，不是猜测**。

<a class="bridge-lesson-download" href="../../assets/tutorial/dfc-bridge-workshop.fig" download="dfc-bridge-workshop.fig"><span aria-hidden="true">↓</span> 下载设计 <span class="bridge-lesson-download-format">.fig</span></a>

1. 打开 Figma。
2. 首页点 **Import**。
3. 选择下载的 `.fig`。

## 1. 好看，但不清楚

`desktop`、`mobile-final-2`：同一页面？名称没说。

看这两棵树：哪个标题、哪个按钮是同一元素？

<div class="bridge-lesson-pair bridge-lesson-tree-pair">
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/tree-desktop.png" width="472" height="464" alt="真实展开的 Figma 桌面版图层树：Heading 和 Button" loading="lazy" />
<figcaption>桌面: <code>Heading</code> / <code>Button</code>.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/tree-mobile.png" width="472" height="432" alt="真实展开的 Figma 移动版图层树：Title mobile 和 Button copy" loading="lazy" />
<figcaption>移动: <code>Title mobile</code> / <code>Button copy</code>.</figcaption>
</figure>
</div>

两项“移动版更好看”的决定：

- 标题删掉 «понятных»（清晰）。改了内容，不是换行。
- 整个 `hero-actions` 从 `hero-copy` 移到 `hero`，放在图后。换了父级，不只是顺序。

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<aside class="bridge-lesson-comment">
<p><strong>前端:</strong> 短文案、图下按钮，都可以。</p>
<img class="bridge-lesson-penguin" src="../../assets/tutorial/illustrations/handoff-penguin-frontend-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<img src="../../assets/tutorial/screenshots/figma-broken-comparison.png" width="1600" height="1488" alt="原始 desktop 和 mobile-final-2：完整与缩短的标题，按钮分别位于插图之前和之后" loading="lazy" />
<figcaption>移动版标题少字，按钮移到图下。</figcaption>
</figure>

但要约定文案变体，说明结构变换。没说，前端与 AI 只能猜。

## 2. 连起两个画面

约定：`workshop` 页面、`/workshop` 路由、`default` 视图，宽度 1440 和 375。记在根节点：

```text
workshop [page=workshop] [route=/workshop] [bp=1440] [view=default]
workshop [page=workshop] [route=/workshop] [bp=375] [view=default]
```

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/contexts-zh.svg" width="481" height="557" alt="两个 workshop 根节点共享页面与 default 视图，宽度分别为1440和375" loading="lazy" />
<figcaption>同一页面、视图，两种宽度。</figcaption>
</figure>

前端知道做什么，AI 不找“最 final”。标签记录约定，不生成布局或代码。

## 3. 找到同一元素

按用途命名，不按设备。前端和 AI 能对应：

| 原名称 1440 / 375 | 两种宽度的新名称 |
| --- | --- |
| `Heading` / `Title mobile` | `hero-title` |
| `Button` / `Button copy` | `contact-button` |

标题统一，`hero-actions` 回到 `hero-copy`，在 `workshop-art` 前。不是唯一办法。

<div class="bridge-lesson-pair bridge-lesson-motion-pair">
<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../../assets/tutorial/motion/rename-title.mp4" poster="../../assets/tutorial/motion/rename-title.png" width="472" height="528" controls playsinline preload="none" aria-label="Figma 分步截图：Title mobile 图层改名为 hero-title，不改文字"><a href="../../assets/tutorial/motion/rename-title.mp4" download="rename-title.mp4">下载 MP4</a></video>
<figcaption>Figma 分步截图：<code>Title mobile</code> → <code>hero-title</code>，不改文字。 <a href="../../assets/tutorial/motion/rename-title.gif" download="rename-title.gif">下载 GIF</a>.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../../assets/tutorial/motion/move-actions.mp4" poster="../../assets/tutorial/motion/move-actions.png" width="472" height="528" controls playsinline preload="none" aria-label="Figma 分步截图：整个 hero-actions 移入 hero-copy，保留两个按钮"><a href="../../assets/tutorial/motion/move-actions.mp4" download="move-actions.mp4">下载 MP4</a></video>
<figcaption>Figma 分步截图：整个 <code>hero-actions</code> → <code>hero-copy</code> 内。 <a href="../../assets/tutorial/motion/move-actions.gif" download="move-actions.gif">下载 GIF</a>.</figcaption>
</figure>
</div>

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/figma-prepared-tree.png" width="752" height="1000" alt="准备好的真实 Figma 树：hero-actions 包含 contact-button 和 faq-link，并位于 hero-copy 内" loading="lazy" />
<figcaption>文字与动作回到同一容器。</figcaption>
</figure>

**不同文案需[约定的产品变体](16-variation-axes.md)，换父级需[声明的响应式变换](03-responsive-breakpoints.md)。** 同一父级可调顺序。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/identity-zh.svg" width="481" height="613" alt="同样的 contact-button 和 faq-link 在 hero-actions 中：1440 横排，375 纵排" loading="lazy" />
<figcaption>同按钮，不同布局。</figcaption>
</figure>

桌面并排，移动版竖排。**不同布局没问题：**改 Auto Layout，这里的文字与父级不变。

<div class="bridge-lesson-pair bridge-lesson-heroes">
<figure class="bridge-lesson-figure bridge-lesson-render">
<img src="../../assets/tutorial/renders/hero-1440.png" width="1376" height="692" alt="1440 px 准备页面的原生截图：完整标题、并排按钮，hero 四周保留空间" loading="lazy" />
<figcaption>1440 px：按钮并排。</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-render">
<img src="../../assets/tutorial/renders/hero-375.png" width="375" height="624" alt="375 px 准备页面的原生截图：完整标题、插图之前的按钮，保留真实页面边距" loading="lazy" />
<figcaption>375 px：按钮竖排，在图前。</figcaption>
</figure>
</div>

`workshop-art [decor] [asset]` 是图片，标题保留文字。

## 4. 做好组件库

`button-primary` 和 `button-secondary` 成为共用组件。改源头，实例更新。不用逐个改。

**UI-kit** 展示两种样式的状态，**Modals** 管窗口外观。前端和 AI 不用猜。

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/figma-kit-modals.png" width="1160" height="1514" alt="真实 UI-kit：两种按钮样式的默认、悬停、焦点、按下与禁用示例；旁边是包含 contact-modal 的 Modals" loading="lazy" />
<figcaption>两种样式、五个状态。窗口在旁。</figcaption>
</figure>

**组件库管外观，页面实例管动作。** 同款按钮，别处用途可不同。

- `contact-button [action=modal:contact-modal]` → 打开窗口。
- `faq-link [href=#faq]` → 去 FAQ。

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/interactions-zh.svg" width="481" height="839" alt="contact-button 指向本地 contact-modal，faq-link 指向 faq 锚点" loading="lazy" />
<figcaption>按钮 → 窗口。链接 → FAQ。</figcaption>
</figure>

Assistant：动作和目标设在按钮，不在文字上：

<div class="bridge-lesson-pair">
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/assistant-layer-type-local.png" width="906" height="1173" alt="Assistant：按钮类型、模态窗口动作与前往目标控件" loading="lazy" />
<figcaption>动作设在按钮本身。</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<aside class="bridge-lesson-comment">
<p><strong>AI:</strong> 此宽度的目标是 contact-modal。</p>
<img class="bridge-lesson-penguin" src="../../assets/tutorial/illustrations/handoff-penguin-ai-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<img src="../../assets/tutorial/screenshots/assistant-layer-target-local.png" width="906" height="1173" alt="Assistant：contact-button 名称与 375 px 上的 contact-modal 目标" loading="lazy" />
<figcaption>目标设在对应宽度内。</figcaption>
</figure>
</div>

**前往目标**只找图层，不开窗。行为要实现。

<details>
<summary>组件细节</summary>

状态是示例，不是可运行原型。

`State=default/hover/pressed/disabled` 是 Figma 变体，不是 DFC 标签或页面视图。焦点独立：`Focus visible=true` 可与 `hover`、`pressed` 同时出现。

禁用条件与决策负责人写进实现契约。没有加载态：开窗、跳锚点，无异步请求。

各根有隐藏 `[modal=contact-modal]`。Modals 主组件只管外观，不是目标。邮箱窗口，不提交表单。

</details>

来源写进[数据契约](20-data-and-visualization.md)。

## 5. 检查结果

未说明差异的副本：**检查 → 检查页面**。Assistant 找到 `hero-title` 文字、`hero-actions` 父级不同。Auto Layout 开启。

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/assistant-findings-local.png" width="1430" height="1656" alt="真实 Assistant 报告：两项错误，标题文字不同与 hero-actions 的语义父级改变" loading="lazy" />
<figcaption>源设计有错，不是禁止设计选择。</figcaption>
</figure>

**显示图层 → 修正 → 重查。** 页面 02 是此处选择：同一标题、父级和关联组件。

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<aside class="bridge-lesson-comment">
<p><strong>后端:</strong> 卡片仍是示例，数据来源还需确认。</p>
<img class="bridge-lesson-penguin" src="../../assets/tutorial/illustrations/handoff-penguin-backend-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<img src="../../assets/tutorial/screenshots/figma-final-overview.png" width="1560" height="1072" alt="真实 Figma 中准备好的 workshop 根节点，宽度为 1440 和 375 px，旁边是按钮状态 UI-kit 和 Modals" loading="lazy" />
<figcaption>设计、UI-kit、Modals。</figcaption>
</figure>

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/assistant-ready-result-local.png" width="1430" height="1656" alt="真实完整 Assistant 报告：workshop 就绪，宽度 375 和 1440 px，零计数与检查边界" loading="lazy" />
<figcaption>页面 02：检查范围内无问题。</figcaption>
</figure>

**“就绪”只指检查范围，不是应用完成。**

交付**源文件、资源和约定**。未决问题有负责人。不只一张 PNG 和“都懂了吧”。

## 按需继续

- [交付清单](17-designer-checklist.md)。
- [内容与溢出](07-height-and-overflow.md) — 准备最佳实践。
- [旧设计中的新区块](19-team-adoption.md)。
- [视图与变体](16-variation-axes.md)。
- [无障碍](23-accessibility-profile.md)。

示例。Figma 真截图，Assistant 本地版。企鹅为生成插画，问题为示例。[验证记录](../assets/tutorial/README.md)。
