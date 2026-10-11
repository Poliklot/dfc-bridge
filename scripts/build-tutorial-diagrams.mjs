import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Explanations, not screenshots. Draw.io owns the rendered SVG and embeds the
// complete editable graph. Geometry encodes each concept instead of decorating it.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'assets/tutorial/diagrams');
const drawio = process.env.DRAWIO_BIN || '/Applications/draw.io.app/Contents/MacOS/draw.io';
if (!existsSync(drawio)) throw new Error('Set DRAWIO_BIN to the installed draw.io desktop executable.');
const C = { ink: '#202124', blue: '#006BB6', slate: '#64748B', line: '#B8C1CB', pale: '#F1F4F6', white: '#FFFFFF' };
const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll('\n', '&#xa;');
const languages = {
  en: {
    contexts: ['Two widths of one page', 'Roots share page and view; silhouette widths preserve the actual 1440:375 ratio.', 'Native width'],
    identity: ['The same buttons, rearranged', 'The two connectors track the same named buttons between horizontal and vertical layouts inside hero-actions.', 'Same parent'],
    structure: ['A layout has real parents', 'Text belongs to hero-copy, buttons to hero-actions; both wrappers and the artwork belong to the vertical hero frame.', 'Auto Layout · VERTICAL', 'Hug height', 'Flow'],
    interactions: ['Navigation and interface action', 'The shown href=#faq leads to a position in this page. A modal action opens an overlay in the current interface.', 'Navigate within the page', 'Change the current interface'],
    content: ['The same text needs room', 'A fixed-height card clips the final lines. Hug height keeps all words and pushes its next neighbour down.', 'Fixed height · clipped', 'Hug height · grows', 'Next card', 'A catalogue with long names\nand detailed descriptions\nthat must remain readable\nwhen the available space\ngets narrower.'],
    roles: ['Role and export boundary', 'Editable text, native decorative shapes and one opaque exported visual have different inspection boundaries.', 'Layer', 'Role', 'Transfer', 'Content', 'Decor', 'Native\nTEXT', 'Native\nshapes', 'One\nresource', 'Inside: opaque'],
    axes: ['Page views are not button variants', 'Default and empty each have two width roots. Native component variants and an interface state target are separate.', 'Page views', 'Native variants · example', 'Interface state · example'],
    scope: ['The selected boundary matters', 'The modal resolves inside the selected section. The route edge crosses the boundary and remains Deferred, not missing.', 'Host not checked', 'Selected section', 'Outside selection'],
    'handoff-questions': ['One design, three different concerns', 'Illustrative handoff, not a recorded conversation. Three penguins identify frontend (browser/code), backend (server/data) and AI (a Codex glyph face). Each has a question and a possible misunderstanding, not an actual failure report.', 'One Figma file', 'Frontend', 'One page\nor two?', 'Risk: two unrelated\nscreens', 'Backend', 'Where is the data from?\nHave we agreed?', 'Risk: an invented API\nfrom a card’s appearance', 'AI', 'Where does\nthis button go?', 'Risk: an action\nchosen by guesswork'],
    'handoff-clarified': ['Clear design facts, decisions still open', 'The reference on page 02 has the same page context and a separate local modal target in each width root. The same three penguins connect design facts to remaining responsibilities. Data source and schema still need a decision owner; targets are design intent, not implemented runtime or a readiness report.', 'What is now explicit', 'Design targets in each root.', 'Frontend', 'One page.\nThe same elements.', 'Still: layout between\nthe prepared widths.', 'Backend', 'Source and schema\nare still undecided.', 'Needs a decision\nand its owner.', 'AI', 'Context and targets\nare explicit.', 'Ask about unknowns;\ndo not invent them.'],
  },
  ru: {
    contexts: ['Две ширины одной страницы', 'Корни имеют одинаковые page и view; ширины силуэтов сохраняют настоящее соотношение 1440:375.', 'Нативная ширина'],
    identity: ['Те же кнопки в другой раскладке', 'Линии связывают те же именованные кнопки между горизонтальной и вертикальной раскладками внутри hero-actions.', 'Тот же родитель'],
    structure: ['У раскладки есть настоящие родители', 'Текст принадлежит hero-copy, кнопки — hero-actions; обе обёртки и визуал находятся внутри вертикального hero.', 'Auto Layout · VERTICAL', 'Высота Hug', 'Поток'],
    interactions: ['Переход и действие интерфейса', 'В этом примере href=#faq ведёт к месту на странице. Действие modal открывает окно в текущем интерфейсе.', 'Перейти к месту на странице', 'Изменить текущий интерфейс'],
    content: ['Тем же словам нужно место', 'Фиксированная карточка обрезает последние строки. Высота Hug сохраняет слова и сдвигает соседа вниз.', 'Фиксированная · обрезка', 'Высота Hug · растёт', 'Следующая карточка', 'Каталог с длинными\nназваниями и подробными\nописаниями, которые должны\nоставаться читаемыми\nна узком экране.'],
    roles: ['Роль и граница экспорта', 'Редактируемый текст, нативные декоративные фигуры и единый экспортируемый визуал имеют разные границы проверки.', 'Слой', 'Роль', 'Передача', 'Контент', 'Декор', 'Нативный\nTEXT', 'Нативные\nфигуры', 'Один\nресурс', 'Внутри не проверяем'],
    axes: ['Вид страницы — не вариант кнопки', 'default и empty имеют корни двух ширин. Нативные варианты компонента и цель состояния интерфейса показаны отдельно.', 'Виды страницы', 'Пример нативных вариантов', 'Отдельный пример состояния'],
    scope: ['Важна граница выбора', 'Окно найдено внутри выбранной секции. Связь с маршрутом пересекает границу и остаётся Deferred, а не missing.', 'Окружение не проверено', 'Выбранная секция', 'За границей выбора'],
    'handoff-questions': ['Один макет — разные вопросы участников', 'Условная ситуация передачи, не записанный разговор. Три пингвина обозначают frontend (браузер с кодом), backend (сервер с данными) и ИИ (логотип Codex вместо лица). У каждого есть свой вопрос и возможный риск непонимания, а не отчёт о случившейся ошибке.', 'Один Figma-файл', 'Frontend', 'Одна страница\nили две?', 'Риск: два отдельных\nэкрана', 'Backend', 'Данные откуда?\nУже решили?', 'Риск: выдуманный API\nпо виду карточки', 'ИИ', 'Куда ведёт\nэта кнопка?', 'Риск: действие\nнаугад'],
    'handoff-clarified': ['Явные дизайн-факты и незакрытые решения', 'Образец на странице 02 задаёт один контекст страницы и свою локальную цель окна в каждом корне ширины. Те же три пингвина связывают известные факты с оставшейся работой. Источник и схема данных требуют решения и владельца; дизайн-цели не означают готовую runtime-реализацию или отчёт проверки.', 'Что теперь записано', 'Дизайн-цели в каждом корне.', 'Frontend', 'Одна страница.\nТе же элементы.', 'Ещё: раскладка между\nзаданными ширинами.', 'Backend', 'Источник и схема\nещё не согласованы.', 'Нужны решение\nи его владелец.', 'ИИ', 'Контекст и цели\nзаписаны явно.', 'Неизвестное уточнить,\nа не выдумывать.'],
  },
  zh: {
    contexts: ['同一页面的两种宽度', '两个根节点共用 page 和 view；轮廓宽度保持真实的 1440:375 比例。', '原生宽度'],
    identity: ['同样的按钮，不同的排列', '连线对应横向和纵向布局中的同名按钮；父级始终是 hero-actions。', '父级不变'],
    structure: ['布局中的真实父子关系', '文字属于 hero-copy，按钮属于 hero-actions；两个容器和插图都属于纵向 hero 框架。', 'Auto Layout · VERTICAL', 'Hug 高度', '排列'],
    interactions: ['导航与界面动作', '此示例中的 href=#faq 指向页面中的位置。modal 动作打开当前界面内的模态框。', '前往页面中的位置', '改变当前界面'],
    content: ['相同文字需要足够空间', '固定高度会裁掉末尾文字。Hug 高度保留完整文字并将下一张卡片下移。', '固定高度 · 文字被裁切', 'Hug 高度 · 随内容增长', '下一张卡片', '带有长名称和详细描述的目录，\n应在可用空间变窄时\n仍然保留相同的全部文字，\n自然换行，保持可读，\n而不是删掉最后几行。'],
    roles: ['角色与导出边界', '可编辑文字、原生装饰图形和单一导出视觉具有不同的检查边界。', '图层', '角色', '传递', '内容', '装饰', '原生\nTEXT', '原生\n图形', '一个\n资源', '内部不检查'],
    axes: ['页面视图不是按钮变体', 'default 和 empty 都有两个宽度的根节点。原生组件变体和界面状态目标是独立的。', '页面视图', '原生变体示例', '独立状态示例'],
    scope: ['选择决定检查边界', '模态框在所选区块内解析。路由连线跨越边界，保持 Deferred，而不是 missing。', '宿主未检查', '所选区块', '选择范围外'],
    'handoff-questions': ['同一设计，不同参与者的疑问', '这是交付示意，不是真实对话。三只企鹅分别代表前端（浏览器与代码）、后端（服务器与数据）和 AI（脸部为 Codex 标志）。每个角色有自己的问题与潜在误解，不是在报告已发生的错误。', '一个 Figma 文件', '前端', '一个页面\n还是两个？', '风险：实现成\n两个独立页面', '后端', '数据从哪来？\n已经决定了吗？', '风险：看着卡片\n自行编造 API', 'AI', '这个按钮\n指向哪里？', '风险：凭猜测\n实现动作'],
    'handoff-clarified': ['明确的设计事实，仍需决策的事项', '第 02 页的参考设计具有同一个页面上下文，每种宽度根节点都有自己的本地模态框目标。相同的三只企鹅将已知事实与后续责任对应。数据来源与结构仍需决策及负责人；设计目标不代表运行时已实现或检查已通过。', '现在明确的内容', '每个根节点中的设计目标。', '前端', '同一个页面。\n元素保持对应。', '仍需实现两种宽度\n之间的布局。', '后端', '来源与数据结构\n尚未确定。', '需要明确决策\n及其负责人。', 'AI', '上下文与目标\n已经明确。', '询问缺失的决策，\n不自行猜测。'],
  },
};

class Drawing {
  constructor(width, height, { nativeText = false } = {}) {
    this.width = width; this.height = height; this.nativeText = nativeText; this.cells = []; this.next = 2;
    this.rect(0, 0, width, height, { fill: C.white, stroke: 'none' });
  }
  vertex(value, x, y, w, h, style = '', parent = '1') {
    const id = String(this.next++);
    this.cells.push(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="${parent}"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
    return id;
  }
  rect(x, y, w, h, { fill = C.white, stroke = C.line, sw = 1.5, dash = false, parent = '1', rounded = false } = {}) {
    return this.vertex('', x, y, w, h, `rounded=${rounded ? 1 : 0};arcSize=5;fillColor=${fill};strokeColor=${stroke};strokeWidth=${sw};dashed=${dash ? 1 : 0};`, parent);
  }
  text(value, x, y, w, h = 32, { size = 22, color = C.ink, bold = false, align = 'left', valign = 'middle', parent = '1' } = {}) {
    return this.vertex(value, x, y, w, h, `shape=text;whiteSpace=${this.nativeText ? 'nowrap' : 'wrap'};html=0;fillColor=none;strokeColor=none;fontFamily=Arial;fontSize=${size};fontColor=${color};fontStyle=${bold ? 1 : 0};align=${align};verticalAlign=${valign};spacing=0;overflow=visible;`, parent);
  }
  line(x1, y1, x2, y2, { color = C.line, sw = 1.5, dash = false, arrow = 'none', startArrow = 'none', parent = '1' } = {}) {
    const id = String(this.next++);
    this.cells.push(`<mxCell id="${id}" value="" style="endArrow=${arrow};startArrow=${startArrow};strokeColor=${color};strokeWidth=${sw};dashed=${dash ? 1 : 0};rounded=0;" edge="1" parent="${parent}"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);
  }
  edge(source, target, { color = C.blue, sw = 2, dash = false, parent = '1', points = [], extra = '' } = {}) {
    const waypoints = points.length ? `<Array as="points">${points.map(([x,y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
    this.cells.push(`<mxCell id="${this.next++}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=block;endFill=1;strokeColor=${color};strokeWidth=${sw};dashed=${dash ? 1 : 0};${extra}" edge="1" parent="${parent}" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${waypoints}</mxGeometry></mxCell>`);
  }
  bars(x, y, widths, { gap = 11, height = 3, color = C.line, parent = '1' } = {}) {
    widths.forEach((w, i) => this.rect(x, y + i * gap, w, height, { fill: color, stroke: 'none', parent }));
  }
  xml(name) {
    return `<mxfile host="app.diagrams.net"><diagram name="${name}"><mxGraphModel page="1" pageWidth="${this.width}" pageHeight="${this.height}"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${this.cells.join('')}</root></mxGraphModel></diagram></mxfile>`;
  }
}

function rootSilhouette(d, x, y, w, h, compact = false) {
  const frame = d.rect(x, y, w, h, { stroke: C.ink, sw: 1.5 });
  if (compact) {
    d.bars(8, 13, [24], { height: 3, color: C.ink, parent: frame });
    d.bars(8, 35, [w-16,w-22,w-29], { gap: 7, height: 3, color: C.ink, parent: frame });
    d.bars(8, 66, [w-16,w-16,w-16,w-28], { gap: 7, height: 2, parent: frame });
    d.rect(8, 105, w-16, 18, { fill: C.blue, stroke: 'none', parent: frame });
    d.rect(8, 133, w-16, 18, { stroke: C.blue, parent: frame });
    d.rect(8, 169, w-16, 47, { fill: C.pale, stroke: 'none', parent: frame });
    d.line(14, 208, w-16, 176, { color: C.slate, parent: frame });
    d.bars(8, 239, [w-24], { height: 3, color: C.ink, parent: frame });
    d.rect(8, 255, w-16, 29, { fill: C.pale, stroke: 'none', parent: frame });
    d.bars(13, 263, [w-26,w-35], { gap: 8, height: 2, parent: frame });
    d.bars(8, 306, [w-20,w-29], { gap: 8, height: 2, parent: frame });
    return frame;
  }
  const unit = w / 324;
  d.bars(12*unit, 17*unit, [80*unit], { height: 3, color: C.ink, parent: frame });
  d.bars(12*unit, 44*unit, [246*unit, 211*unit], { gap: 9*unit, height: 4*unit, color: C.ink, parent: frame });
  d.bars(12*unit, 74*unit, [292*unit, 267*unit, 218*unit], { gap: 8*unit, height: 2.5*unit, parent: frame });
  const buttonY = 106*unit;
  d.rect(12*unit, buttonY, 130*unit, 17*unit, { fill: C.blue, stroke: 'none', parent: frame });
  d.rect(154*unit, buttonY, 92*unit, 17*unit, { stroke: C.blue, parent: frame });
  const artY = 145*unit;
  const artHeight = 31*unit;
  d.rect(12*unit, artY, w-24*unit, artHeight, { fill: C.pale, stroke: 'none', parent: frame });
  d.line(22*unit, artY+artHeight-8*unit, w-24*unit, artY+10*unit, { color: C.slate, parent: frame });
  const below = artY+artHeight+18*unit;
  d.bars(12*unit, below, [180*unit, 280*unit, 247*unit], { height: 3*unit, gap: 9*unit, parent: frame });
  return frame;
}

// The requested penguin cast is generated bitmap illustration, not fake UI.
// Each sprite stays an editable native draw.io image cell; the surrounding
// labels, graph and relationships remain editable shapes and native SVG text.
function participantIcon(d, role, x, y, width = 108) {
  if (!['frontend', 'backend', 'ai'].includes(role)) throw new Error(`Unknown participant role: ${role}`);
  const sprite = readFileSync(join(root, 'assets/tutorial/illustrations', `handoff-penguin-${role}-display.png`)).toString('base64');
  // draw.io's data URI deliberately has no semicolon inside the image value.
  // PNG pixels are not changed by adaptiveColors; only graph/text colors adapt.
  return d.vertex('', x, y, width, width * 137 / 108, `shape=image;imageAspect=0;aspect=fixed;image=data:image/png,${sprite};`);
}

// Native callout geometry points at the speaker, not at an adjacent text panel.
// `size` reserves the last 14px for the tail, leaving the text inside the body.
function speechBubble(d, value, x, y, w, h, speakerX, { size = 24, color = C.ink } = {}) {
  const tail = 14;
  const base = 20;
  const position = (speakerX - x - base / 2) / w;
  const position2 = (speakerX - x) / w;
  d.vertex('', x, y, w, h, `shape=callout;rounded=1;arcSize=8;size=${tail};position=${position};position2=${position2};base=${base};fillColor=${C.white};strokeColor=${C.line};strokeWidth=1.5;`);
  d.text(value, x + 14, y + 10, w - 28, h - tail - 20, { size, color, align: 'center' });
}

function participantRows(d, labels, firstLabel, positions, { known = false } = {}) {
  const roles = ['frontend', 'backend', 'ai'];
  for (const [index, y] of positions.entries()) {
    const offset = firstLabel + index * 3;
    const color = known && roles[index] !== 'backend' ? C.blue : C.ink;
    speechBubble(d, labels[offset + 1], 48, y, 384, 90, 102, { color });
    participantIcon(d, roles[index], 48, y + 104);
    d.text(labels[offset], 182, y + 112, 250, 36, { size: 26, bold: true });
    d.text(labels[offset + 2], 182, y + 162, 250, 66, { size: 22, color: C.slate, valign: 'top' });
  }
}

const builders = {
  contexts(L) {
    const d = new Drawing(480, 556, { nativeText: true });
    d.text('[page=workshop]', 24, 16, 432, 34, { size: 26, bold: true, color: C.blue });
    d.text('[view=default]', 24, 55, 432, 32, { size: 24, color: C.blue });
    d.line(24, 103, 456, 103, { color: C.blue, sw: 2 });
    d.text('[bp=1440]', 24, 121, 260, 32, { bold: true });
    d.text('[bp=375]', 330, 121, 126, 32, { bold: true, align: 'right' });
    // The same scale for both native frame widths; silhouette internals are a schematic.
    rootSilhouette(d, 24, 171, 324, 243);
    rootSilhouette(d, 371.625, 171, 84.375, 336, true);
    d.line(24, 437, 348, 437, { color: C.slate, startArrow: 'open', arrow: 'open' });
    d.text('1440 px', 24, 451, 324, 30, { align: 'center', size: 22 });
    d.line(371.625, 523, 456, 523, { color: C.slate, startArrow: 'open', arrow: 'open' });
    d.text('375 px', 340, 531, 116, 24, { align: 'center', size: 20 });
    return d;
  },
  identity(L) {
    const d = new Drawing(480, 612);
    d.text('[bp=1440]', 24, 15, 220, 32, { color: C.slate });
    const wide = d.rect(24, 58, 432, 132, { stroke: C.ink, sw: 2 });
    d.text('hero-actions', 16, 10, 400, 30, { bold: true, parent: wide });
    const a = d.rect(16, 60, 222, 52, { stroke: C.blue, sw: 2, parent: wide });
    d.text('contact-button', 12, 9, 198, 32, { size: 22, color: C.blue, parent: a });
    const b = d.rect(254, 60, 160, 52, { stroke: C.slate, sw: 2, parent: wide });
    d.text('faq-link', 12, 9, 136, 32, { size: 22, parent: b });
    d.text(L[2], 120, 238, 280, 36, { color: C.slate, align: 'center', size: 22 });
    d.text('[bp=375]', 136, 321, 266, 32, { color: C.slate });
    const narrow = d.rect(136, 368, 266, 211, { stroke: C.ink, sw: 2 });
    d.text('hero-actions', 16, 10, 234, 30, { bold: true, parent: narrow });
    const a2 = d.rect(16, 64, 234, 52, { stroke: C.blue, sw: 2, parent: narrow });
    d.text('contact-button', 12, 9, 210, 32, { size: 22, color: C.blue, parent: a2 });
    const b2 = d.rect(16, 137, 234, 52, { stroke: C.slate, sw: 2, parent: narrow });
    d.text('faq-link', 12, 9, 210, 32, { size: 22, parent: b2 });
    d.edge(a, a2, { points: [[72,222],[72,458]], extra: 'exitX=0.5;exitY=1;entryX=0;entryY=0.5;' });
    d.edge(b, b2, { color: C.slate, points: [[436,222],[436,531]], extra: 'exitX=0.5;exitY=1;entryX=1;entryY=0.5;' });
    return d;
  },
  structure(L) {
    const d = new Drawing(480, 690);
    d.text(L[2], 24, 16, 432, 32, { size: 24 });
    const hero = d.rect(24, 64, 432, 565, { stroke: C.ink, sw: 2 });
    d.text('hero', 20, 14, 392, 30, { bold: true, size: 24, parent: hero });
    d.text('[section=workshop-hero]', 20, 49, 392, 30, { size: 22, parent: hero });
    const copy = d.rect(20, 112, 392, 151, { stroke: C.slate, parent: hero });
    d.text('hero-copy', 16, 10, 360, 30, { bold: true, parent: copy });
    d.line(16, 50, 376, 50, { parent: copy });
    d.text('T', 16, 66, 28, 28, { color: C.blue, bold: true, size: 22, parent: copy });
    d.text('hero-title', 58, 64, 304, 30, { parent: copy });
    d.text('T', 16, 106, 28, 28, { color: C.blue, bold: true, size: 22, parent: copy });
    d.text('hero-description', 58, 104, 304, 30, { parent: copy });
    const actions = d.rect(20, 287, 392, 118, { stroke: C.slate, parent: hero });
    d.text('hero-actions', 16, 10, 360, 30, { bold: true, parent: actions });
    const button = d.rect(16, 58, 218, 40, { stroke: C.blue, parent: actions });
    d.text('contact-button', 10, 4, 198, 30, { size: 20, color: C.blue, parent: button });
    const link = d.rect(250, 58, 126, 40, { stroke: C.slate, parent: actions });
    d.text('faq-link', 10, 4, 106, 30, { size: 20, parent: link });
    const art = d.rect(20, 429, 392, 111, { stroke: C.blue, dash: true, parent: hero });
    d.text('workshop-art', 16, 12, 360, 30, { bold: true, parent: art });
    d.text('[decor] [asset]', 16, 51, 360, 32, { color: C.blue, parent: art });
    d.line(240, 328, 240, 349, { color: C.blue, arrow: 'block', sw: 1.5 });
    d.text(L[4], 256, 330, 160, 20, { size: 20, color: C.slate });
    d.line(240, 470, 240, 491, { color: C.blue, arrow: 'block', sw: 1.5 });
    d.line(468, 65, 468, 629, { color: C.slate, arrow: 'open', startArrow: 'open', sw: 1.5 });
    d.text(L[3], 24, 648, 432, 30, { color: C.slate, align: 'right', size: 22 });
    return d;
  },
  interactions(L) {
    const d = new Drawing(480, 838);
    d.text(L[2], 24, 14, 432, 38, { bold: true, size: 24 });
    const page = d.rect(24, 70, 432, 290, { stroke: C.ink });
    d.text('faq-link', 28, 20, 356, 30, { bold: true, color: C.blue, parent: page });
    d.line(28, 49, 114, 49, { color: C.blue, sw: 2, parent: page });
    d.text('[href=#faq]', 28, 54, 356, 30, { color: C.blue, parent: page });
    d.bars(85, 105, [295,262,283], { gap: 16, parent: page });
    const faq = d.rect(72, 185, 336, 82, { fill: C.pale, stroke: 'none', parent: page });
    d.text('faq', 16, 7, 304, 30, { bold: true, parent: faq });
    d.text('[anchor=faq]', 16, 42, 304, 30, { parent: faq });
    d.line(44, 99, 44, 226, { color: C.blue, sw: 2, arrow: 'block', parent: page });
    d.line(34, 18, 15, 18, { color: C.slate, sw: 2, parent: page });
    d.line(15, 18, 15, 92, { color: C.slate, sw: 2, parent: page });
    d.line(15, 92, 34, 92, { color: C.slate, sw: 2, parent: page });
    d.line(15, 185, 15, 267, { color: C.blue, sw: 2, parent: page });
    d.line(15, 185, 34, 185, { color: C.blue, sw: 2, parent: page });
    d.line(15, 267, 34, 267, { color: C.blue, sw: 2, parent: page });
    d.text(L[3], 24, 396, 432, 38, { bold: true, size: 24 });
    const interfaceFrame = d.rect(24, 452, 432, 356, { stroke: C.ink });
    const source = d.rect(24, 20, 272, 44, { stroke: C.blue, sw: 2, parent: interfaceFrame });
    d.text('contact-button', 12, 5, 248, 32, { color: C.blue, bold: true, parent: source });
    d.text('[action=modal:contact-modal]', 24, 77, 384, 34, { color: C.blue, size: 22, parent: interfaceFrame });
    d.bars(24, 142, [130,198,158], { gap: 17, parent: interfaceFrame });
    d.rect(24, 219, 132, 106, { fill: C.pale, stroke: 'none', parent: interfaceFrame });
    const modal = d.rect(155, 169, 252, 155, { stroke: C.ink, sw: 2, parent: interfaceFrame });
    d.text('contact-modal', 16, 12, 220, 30, { bold: true, size: 22, parent: modal });
    d.line(16, 55, 236, 55, { parent: modal });
    d.text('[modal=contact-modal]', 16, 67, 220, 55, { size: 20, parent: modal });
    d.edge(source, modal, { parent: interfaceFrame, points: [[344,42],[344,143]], extra: 'exitX=1;exitY=0.5;entryX=0.75;entryY=0;' });
    return d;
  },
  content(L) {
    const d = new Drawing(480, 702);
    d.text(L[2], 24, 14, 432, 38, { bold: true, size: 24 });
    d.rect(24, 73, 432, 129, { stroke: C.ink, sw: 1.5 });
    d.text(L[5], 44, 85, 388, 168, { size: 23 });
    // Real visible clipping: the mask is an editable draw.io shape, not truncated copy.
    d.rect(25, 202, 430, 58, { stroke: 'none', fill: C.white });
    d.line(24, 202, 456, 202, { color: C.slate, sw: 2, dash: true });
    const next = d.rect(24, 226, 432, 45, { fill: C.pale, stroke: C.line });
    d.text(L[4], 20, 7, 392, 30, { size: 22, parent: next });
    d.line(24, 334, 456, 334, { color: C.line });
    d.text(L[3], 24, 364, 432, 38, { bold: true, size: 24 });
    const growing = d.rect(24, 426, 432, 199, { stroke: C.blue, sw: 2 });
    d.text(L[5], 20, 17, 388, 168, { size: 23, parent: growing });
    const below = d.rect(24, 649, 432, 45, { fill: C.pale, stroke: C.line });
    d.text(L[4], 20, 7, 392, 30, { size: 22, parent: below });
    d.line(11, 427, 11, 625, { color: C.blue, sw: 2, startArrow: 'open', arrow: 'open' });
    return d;
  },
  roles(L) {
    const d = new Drawing(480, 760);
    d.text(L[2], 24, 14, 160, 34, { bold: true, size: 22 });
    d.text(L[3], 203, 14, 108, 34, { bold: true, size: 22 });
    d.text(L[4], 336, 14, 120, 34, { bold: true, size: 22 });
    d.line(24, 59, 456, 59, { color: C.ink, sw: 1.5 });
    d.text('hero-title', 24, 82, 432, 32, { bold: true });
    const textSample = d.rect(24, 134, 158, 98, { stroke: C.blue });
    d.text('T', 12, 15, 50, 50, { size: 42, color: C.blue, parent: textSample });
    d.line(67, 19, 67, 71, { color: C.ink, sw: 2, parent: textSample });
    d.bars(80, 33, [59,48], { gap: 18, height: 4, color: C.ink, parent: textSample });
    for (const [x,y] of [[24,134],[182,134],[24,232],[182,232]]) d.rect(x-3,y-3,6,6,{stroke:C.blue});
    d.text(L[5], 203, 141, 116, 76, { size: 22 });
    d.text(L[7], 336, 141, 120, 76, { size: 22 });
    d.line(24, 264, 456, 264);
    d.text('hero-glow [decor]', 24, 287, 432, 32, { bold: true });
    d.rect(26, 350, 150, 80, { fill: C.pale, stroke: 'none' });
    for(let n=0;n<4;n++) d.line(34+n*27, 418, 64+n*27, 362, {color:C.slate,sw:2});
    d.text(L[6], 203, 348, 116, 78, { size: 22 });
    d.text(L[8], 336, 348, 120, 78, { size: 22 });
    d.line(24, 464, 456, 464);
    d.text('workshop-art', 24, 485, 432, 32, { bold: true });
    d.text('[decor] [asset]', 24, 522, 432, 32, { color: C.blue });
    const asset = d.rect(24, 580, 158, 106, { stroke: C.blue, sw: 2, dash: true });
    d.rect(14, 16, 59, 73, { fill: C.pale, stroke: 'none', parent: asset });
    d.rect(84, 16, 59, 34, { fill: C.slate, stroke: 'none', parent: asset });
    d.line(84, 86, 143, 59, { color: C.ink, sw: 3, parent: asset });
    d.line(14, 87, 73, 20, { color: C.ink, sw: 2, parent: asset });
    d.text(L[6], 203, 591, 116, 78, { size: 22 });
    d.text(L[9], 336, 591, 120, 78, { size: 22, color: C.blue });
    d.text(L[10], 24, 716, 432, 32, { color: C.slate, size: 22 });
    return d;
  },
  axes(L) {
    const d = new Drawing(480, 852);
    d.text('[page=workshop]', 24, 14, 432, 32, { bold: true, color: C.blue, size: 24 });
    d.text('[bp=1440]', 169, 69, 160, 30, { size: 20, align: 'center' });
    d.text('[bp=375]', 344, 69, 112, 30, { size: 20, align: 'center' });
    d.line(24, 111, 456, 111);
    d.text('[view=default]', 24, 168, 146, 55, { size: 20 });
    d.text('[view=empty]', 24, 316, 146, 55, { size: 20 });
    const mini=(x,y,w,empty)=>{
      const f=d.rect(x,y,w,112,{stroke:C.ink});
      d.bars(10,12,[w-20],{height:4,color:C.ink,parent:f});
      if(empty){ d.text('∅',10,35,w-20,46,{size:36,color:C.slate,align:'center',parent:f}); }
      else{ d.bars(10,33,[w-20,w-29,w-20],{gap:10,parent:f});d.rect(10,76,w-20,22,{fill:C.blue,stroke:'none',parent:f}); }
      return f;
    };
    mini(182,135,140,false); mini(365,135,78,false);
    d.line(169,271,456,271);
    mini(182,292,140,true); mini(365,292,78,true);
    d.line(24,430,456,430,{color:C.ink,sw:1.5});
    d.text(L[3],24,454,432,40,{bold:true,size:24});
    for (const [x,y] of [[24,517],[42,517],[24,535],[42,535]]) d.vertex('',x,y,14,14,`rhombus;fillColor=${C.blue};strokeColor=none;`);
    d.text('button',69,518,142,35,{bold:true});
    d.line(212,536,254,536,{color:C.slate});
    d.line(254,516,254,563,{color:C.slate});
    d.line(254,516,272,516,{color:C.slate});
    d.line(254,563,272,563,{color:C.slate});
    const primary=d.rect(272,495,184,42,{stroke:C.ink,fill:C.ink});
    d.text('Type=Primary',12,5,160,32,{color:C.white,size:20,parent:primary});
    const secondary=d.rect(272,547,184,42,{stroke:C.ink});
    d.text('Type=Secondary',12,5,160,32,{size:20,parent:secondary});
    d.line(24,616,456,616,{color:C.ink,sw:1.5});
    d.text(L[4],24,640,432,40,{bold:true,size:24});
    d.text('filter-button',24,701,432,30,{bold:true,size:22,color:C.blue});
    d.text('[action=state:filters-open]',24,736,432,30,{color:C.blue,size:22});
    d.line(35,778,35,813,{color:C.blue,arrow:'block',sw:2});
    d.text('filters-open [state=filters-open]',64,802,392,34,{size:22});
    return d;
  },
  scope(L) {
    const d = new Drawing(480, 894);
    d.text(L[2],24,12,432,36,{color:C.slate,size:24});
    const host=d.rect(24,66,432,657,{stroke:C.line});
    d.text('legacy-page',20,13,392,32,{color:C.slate,parent:host});
    d.bars(20,72,[392,310,350],{gap:13,parent:host});
    const selection=d.rect(20,151,392,406,{stroke:C.blue,sw:2,parent:host});
    d.text('hero',18,13,240,30,{bold:true,size:24,parent:selection});
    d.text('Partial',280,13,94,30,{bold:true,size:22,color:C.blue,parent:selection});
    d.text('[section=workshop-hero]',18,47,356,32,{color:C.blue,size:22,parent:selection});
    const action=d.rect(18,106,356,75,{stroke:C.line,parent:selection});
    d.text('contact-button',12,7,332,30,{bold:true,size:22,parent:action});
    d.text('[action=modal:contact-modal]',12,38,332,30,{size:20,parent:action});
    const modal=d.rect(18,220,356,74,{stroke:C.blue,parent:selection});
    d.text('contact-modal',12,7,332,30,{bold:true,size:22,parent:modal});
    d.text('[modal=contact-modal]',12,38,332,30,{size:20,parent:modal});
    d.edge(action,modal,{parent:selection});
    const link=d.rect(18,326,296,60,{stroke:'none',parent:selection});
    d.text('workshop-link',0,0,296,30,{bold:true,size:22,parent:link});
    d.text('[href=/workshop]',0,30,296,30,{size:22,parent:link});
    d.bars(20,593,[392,350,273],{gap:14,parent:host});
    d.text(L[4],24,754,260,34,{color:C.slate,size:22});
    const route=d.rect(285,799,171,74,{stroke:C.slate,dash:true});
    d.text('/workshop',12,3,147,30,{size:22,parent:route});
    d.text('Deferred',12,35,147,30,{size:22,color:C.slate,parent:route});
    d.edge(link,route,{color:C.slate,dash:true,points:[[468,573],[468,836]],extra:'exitX=1;exitY=0.5;entryX=1;entryY=0.5;'});
    return d;
  },
  'handoff-questions'(L) {
    // Explicit short lines keep text native; only the requested mascots are PNG.
    const d = new Drawing(480, 984, { nativeText: true });
    const file = d.vertex('', 48, 48, 384, 144, `shape=note;size=24;fillColor=${C.white};strokeColor=${C.ink};strokeWidth=1.5;`);
    d.text(L[2], 24, 14, 324, 36, { size: 26, bold: true, parent: file });
    d.text('desktop', 24, 60, 336, 28, { size: 22, color: C.slate, parent: file });
    d.text('mobile-final-2', 24, 94, 336, 28, { size: 22, color: C.slate, parent: file });
    participantRows(d, L, 3, [212, 460, 708]);
    return d;
  },
  'handoff-clarified'(L) {
    const d = new Drawing(480, 1164, { nativeText: true });
    d.text(L[2], 48, 48, 384, 36, { size: 26, bold: true });
    d.text('workshop / default', 48, 92, 384, 28, { size: 24, color: C.blue });
    // Each connector belongs to its own root: these are not global modal links.
    for (const [width, x] of [[1440, 48], [375, 256]]) {
      const context = d.rect(x, 136, 176, 160, { stroke: C.slate });
      d.text(`${width} px`, 12, 12, 152, 28, { size: 22, color: C.slate, parent: context });
      const source = d.text('contact-button', 12, 52, 152, 28, { size: 21, parent: context });
      const target = d.text('contact-modal', 12, 114, 152, 28, { size: 21, color: C.blue, parent: context });
      d.edge(source, target, { parent: context, extra: 'exitX=0.5;exitY=1;entryX=0.5;entryY=0;' });
    }
    d.text(L[3], 48, 314, 384, 40, { size: 22, color: C.slate, valign: 'top' });
    participantRows(d, L, 4, [392, 640, 888], { known: true });
    return d;
  },
};

// Optional concept names let a narrative extension preserve existing exports.
const requested = new Set(process.argv.slice(2));
for (const concept of requested) {
  if (!(concept in builders)) throw new Error(`Unknown tutorial concept: ${concept}`);
}
mkdirSync(output, { recursive: true });
const temporary = mkdtempSync(join(tmpdir(), 'dfc-diagrams-'));
try {
  const exports = [];
  for (const [locale, labels] of Object.entries(languages)) {
    for (const [concept, build] of Object.entries(builders)) {
      if (requested.size && !requested.has(concept)) continue;
      const L = labels[concept];
      const diagram = build(L);
      const source = join(temporary, `${concept}-${locale}.drawio`);
      const target = join(output, `${concept}-${locale}.svg`);
      const staged = join(temporary, `${concept}-${locale}.svg`);
      writeFileSync(source, diagram.xml(`${concept}-${locale}`));
      execFileSync(drawio, ['-x', '-f', 'svg', '-e', '-b', '0', '-o', staged, source], { stdio: 'pipe' });
      const svg = readFileSync(staged, 'utf8').replace(/<!--[\s\S]*?-->/gu, '');
      if (!svg.includes('mxfile') || !svg.includes('<svg')) throw new Error(`Invalid editable export: ${target}`);
      exports.push([target, svg.replace(/(<svg[^>]*>)/u, `$1<title>${esc(L[0])}</title><desc>${esc(L[1])}</desc>`)]);
      console.log(`${concept}-${locale}.svg ${diagram.width}×${diagram.height}`);
    }
  }
  // A failed export must not replace half of the existing localized set.
  for (const [target, svg] of exports) writeFileSync(target, svg);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
