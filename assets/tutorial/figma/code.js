/* MIT. A fixed, disposable teaching file, not a validator or a new DFC grammar. */
(async () => {
  const pageNames = ['01 · До разметки', '02 · Подготовленная страница', '03 · Два расхождения', '04 · Секция в старом макете', '05 · Состояния и компоненты'];
  const ink = '#202124', muted = '#596472', paper = '#FFFFFF', blue = '#006BB6', tint = '#F1F4F7', line = '#C8D0D9';
  const rgb = hex => ({ r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255 });
  const paint = hex => [{ type: 'SOLID', color: rgb(hex) }];
  const snapshot = async node => {
    const out = { id: node.id, name: node.name, type: node.type };
    for (const key of ['x', 'y', 'width', 'height', 'visible', 'layoutMode', 'layoutPositioning', 'isMask', 'characters', 'fontName', 'textAutoResize', 'clipsContent', 'primaryAxisSizingMode', 'counterAxisSizingMode', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'itemSpacing', 'constraints', 'fills', 'strokes', 'strokeWeight', 'strokeAlign', 'cornerRadius', 'boundVariables', 'componentPropertyReferences']) {
      if (key in node) out[key] = node[key];
    }
    if (node.type === 'INSTANCE') {
      const component = await node.getMainComponentAsync();
      if (component) {
        out.mainComponentId = component.id; out.mainComponentName = component.name;
        if (component.parent?.type === 'COMPONENT_SET') {
          out.mainComponentSetId = component.parent.id; out.mainComponentSetName = component.parent.name;
        }
      }
      out.componentProperties = node.componentProperties;
    }
    if (node.type === 'INSTANCE' || node.type === 'COMPONENT') {
      if (node.variantProperties) out.variantProperties = node.variantProperties;
    }
    if (node.type === 'COMPONENT_SET' || (node.type === 'COMPONENT' && node.parent?.type !== 'COMPONENT_SET')) {
      out.componentPropertyDefinitions = node.componentPropertyDefinitions;
    }
    if ('children' in node) out.children = await Promise.all(node.children.map(snapshot));
    return out;
  };

  if (figma.command === 'export') {
    const pages = [];
    for (const page of figma.root.children) {
      if (!pageNames.includes(page.name)) continue;
      await page.loadAsync();
      pages.push(await snapshot(page));
    }
    if (pages.length !== pageNames.length) throw new Error('Сначала создайте учебный макет. Экспорт не изменяет файл.');
    const native = JSON.stringify({ schemaVersion: 1, methodology: 'DFC Bridge', purpose: 'teaching-evidence-not-a-contract', pages }, null, 2);
    figma.showUI(`<html lang="ru"><body style="font:14px system-ui;padding:16px"><h2>Настоящие данные Figma</h2><p>JSON содержит фактические имена, типы, иерархию, текст и нативную раскладку. PNG — рендеры слоёв, не скриншоты интерфейса редактора.</p><button id="json">Скачать native-nodes.json</button><p><select id="node"></select> <button id="png">Скачать PNG выбранного корня</button></p><p id="status" role="status"></p><script>
      const download=(name,bytes,type)=>{const url=URL.createObjectURL(new Blob([bytes],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
      let data;onmessage=e=>{const m=e.data.pluginMessage;if(!m)return;if(m.type==='data'){data=m.native;for(const n of m.nodes){const o=document.createElement('option');o.value=n.id;o.textContent=n.label;document.getElementById('node').append(o);}}if(m.type==='png'){download(m.name,new Uint8Array(m.bytes),'image/png');document.getElementById('status').textContent='PNG экспортирован из Figma.';}if(m.type==='error')document.getElementById('status').textContent=m.message;};
      document.getElementById('json').onclick=()=>download('native-nodes.json',data,'application/json');document.getElementById('png').onclick=()=>parent.postMessage({pluginMessage:{type:'png',id:document.getElementById('node').value}},'*');
    </script></body></html>`, { width: 620, height: 300 });
    const nodes = pages.flatMap(page => page.children.filter(node => node.type !== 'COMPONENT').map(node => ({ id: node.id, label: `${page.name} / ${node.name}` })));
    figma.ui.postMessage({ type: 'data', native, nodes });
    figma.ui.onmessage = async message => {
      try {
        if (message.type !== 'png' || !nodes.some(node => node.id === message.id)) return;
        const node = await figma.getNodeByIdAsync(message.id);
        if (!node || !('exportAsync' in node)) throw new Error('Корень больше не существует.');
        const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 1 } });
        figma.ui.postMessage({ type: 'png', name: `figma-${node.id.replace(':', '-')}.png`, bytes });
      } catch (error) { figma.ui.postMessage({ type: 'error', message: String(error.message || error) }); }
    };
    return;
  }

  // Never overwrite somebody's design, and never duplicate a partially built file.
  for (const page of figma.root.children) {
    await page.loadAsync();
    if (page.children.length) throw new Error('Создание разрешено только в пустом файле. Откройте новый Design file; существующие слои не изменены.');
  }
  const fonts = await figma.listAvailableFontsAsync();
  const family = ['Golos Text', 'Inter'].find(name => fonts.some(font => font.fontName.family === name && font.fontName.style === 'Regular'));
  if (!family) throw new Error('Нужен доступный шрифт Golos Text или Inter. Слои ещё не созданы.');
  const regular = { family, style: 'Regular' };
  const strong = fonts.find(font => font.fontName.family === family && font.fontName.style === 'Bold')?.fontName || regular;
  await Promise.all([figma.loadFontAsync(regular), figma.loadFontAsync(strong)]);
  const pages = pageNames.map((name, index) => {
    const page = index === 0 ? figma.root.children[0] : figma.createPage();
    page.name = name;
    page.backgrounds = paint('#F1F4F7');
    return page;
  });
  function frame(parent, name, width, direction = 'VERTICAL', background = paper, padding = 24, gap = 20) {
    const node = figma.createFrame(); parent.appendChild(node); node.name = name;
    node.layoutMode = direction; node.resize(width, 100);
    node.primaryAxisSizingMode = direction === 'VERTICAL' ? 'AUTO' : 'FIXED';
    node.counterAxisSizingMode = direction === 'VERTICAL' ? 'FIXED' : 'AUTO';
    node.paddingTop = node.paddingBottom = node.paddingLeft = node.paddingRight = padding;
    node.itemSpacing = gap; node.fills = paint(background); node.clipsContent = false;
    return node;
  }
  function text(parent, name, value, size = 18, color = ink, bold = false, width = parent.width - parent.paddingLeft - parent.paddingRight) {
    const node = figma.createText(); parent.appendChild(node); node.name = name;
    node.fontName = bold ? strong : regular; node.fontSize = size;
    node.lineHeight = { unit: 'PERCENT', value: 140 }; node.fills = paint(color);
    node.characters = value; node.textAutoResize = 'HEIGHT'; node.resize(Math.max(1, width), node.height);
    return node;
  }
  function button(parent, name, label, width = 236, secondary = false) {
    const node = frame(parent, name, width, 'HORIZONTAL', secondary ? paper : blue, 16, 0);
    node.cornerRadius = 4; node.strokes = paint(secondary ? '#C8D0D9' : blue); node.strokeWeight = 1;
    node.counterAxisAlignItems = 'CENTER';
    const labelNode = text(node, 'button-label', label, 16, secondary ? ink : paper, true, width - 32);
    labelNode.lineHeight = { unit: 'PERCENT', value: 150 };
    return node;
  }
  function artRect(parent, name, x, y, width, height, fill, stroke = null) {
    const node = figma.createRectangle(); parent.appendChild(node); node.name = name;
    node.resize(width, height); node.x = x; node.y = y; node.fills = paint(fill);
    if (stroke) { node.strokes = paint(stroke); node.strokeWeight = 1; }
    return node;
  }
  function artText(parent, name, characters, x, y, width, size, font = regular, color = ink) {
    const node = figma.createText(); parent.appendChild(node); node.name = name;
    node.fontName = font; node.fontSize = size;
    node.lineHeight = { unit: 'PERCENT', value: 115 }; node.fills = paint(color);
    node.characters = characters; node.textAutoResize = 'HEIGHT'; node.resize(width, node.height);
    node.x = x; node.y = y;
    return node;
  }
  function redrawArt(node, width) {
    node.resize(width, width < 500 ? 208 : 264);
    node.fills = paint('#E9EEF3'); node.cornerRadius = 4; node.clipsContent = false;
    artRect(node, 'type-sheet', 28, 34, 200, 174, paper, line);
    artText(node, 'type-specimen', 'Aa', 48, 51, 164, 54, strong);
    artRect(node, 'type-rule', 48, 123, 148, 2, ink);
    artRect(node, 'type-line-1', 48, 143, 124, 5, line);
    artRect(node, 'type-line-2', 48, 158, 152, 5, line);
    artRect(node, 'layout-sheet', 210, 12, 236, 196, paper, line);
    artRect(node, 'layout-title', 230, 32, 96, 8, ink);
    artRect(node, 'layout-subtitle', 230, 50, 180, 3, line);
    artRect(node, 'layout-main', 230, 72, 196, 72, '#EDF6FD');
    artRect(node, 'layout-column-1', 242, 84, 84, 48, blue);
    artRect(node, 'layout-column-2', 338, 84, 76, 48, paper, line);
    artRect(node, 'layout-baseline', 230, 163, 196, 2, line);
    artRect(node, 'layout-footer', 230, 182, 128, 5, ink);
    artRect(node, 'scale-sheet', 428, 50, 168, 142, paper, line);
    artText(node, 'scale-specimen', '1440\n375', 448, 67, 128, 30, strong, blue);
    for (let i = 0; i < 7; i++) artRect(node, `measure-tick-${i}`, 448 + i * 18, 158, 1, i % 2 ? 7 : 13, ink);
    const output = figma.group([...node.children], node); output.name = 'exported-artwork';
    const scale = Math.min((width - 32) / 620, (node.height - 32) / 224);
    output.rescale(scale); output.x = (width - output.width) / 2; output.y = (node.height - output.height) / 2;
  }

  function artwork(parent, width) {
    const node = figma.createFrame(); parent.appendChild(node);
    node.name = 'workshop-art [decor] [asset]'; redrawArt(node, width); return node;
  }
  function hero(parent, width) {
    const narrow = width < 500;
    const node = frame(parent, 'hero [section=workshop-hero]', width, 'VERTICAL', paper, 0, narrow ? 24 : 32);
    const copy = frame(node, 'hero-copy', width, 'VERTICAL', paper, 0, narrow ? 18 : 24);
    const title = text(copy, 'hero-title', 'Мастерская понятных макетов', narrow ? 34 : (width < 1000 ? 52 : 72), ink, true, Math.min(width, 920));
    title.lineHeight = { unit: 'PERCENT', value: 112 };
    const description = text(copy, 'hero-description', 'Проектируем сайты для небольших команд: от первого экрана до каталога, который удобно развивать.', narrow ? 18 : 22, muted, false, Math.min(width, 720));
    description.lineHeight = { unit: 'PERCENT', value: 145 };
    const actions = frame(node, 'hero-actions', width, narrow ? 'VERTICAL' : 'HORIZONTAL', paper, 0, 12);
    button(actions, 'contact-button [action=modal:contact-modal]', 'Обсудить проект', narrow ? width : 236);
    button(actions, 'faq-link [href=#faq]', 'Читать ответы', narrow ? width : 236, true);
    artwork(node, width); return node;
  }
  function prepared(page, width, view = 'default') {
    const narrow = width < 500, padding = narrow ? 24 : 64, inner = width - padding * 2;
    const root = frame(page, `workshop [page=workshop] [route=/workshop] [bp=${width}] [view=${view}]`, width, 'VERTICAL', paper, padding, narrow ? 40 : 56);
    const header = frame(root, 'header', inner, 'VERTICAL', paper, 0, 8);
    const brand = text(header, 'brand-name', 'Мастерская', narrow ? 22 : 28, ink, true); brand.lineHeight = { unit: 'PERCENT', value: 120 };
    text(header, 'page-note', 'Учебный файл DFC Bridge', 14, muted);
    if (view === 'default') hero(root, inner);
    else {
      const empty = frame(root, 'empty-results [section=workshop-results]', inner, 'VERTICAL', tint, 32, 16);
      const title = text(empty, 'empty-title', 'Пока нет проектов', 30, ink, true); title.lineHeight = { unit: 'PERCENT', value: 120 };
      const description = text(empty, 'empty-description', 'Это другое состояние страницы, а не мобильный вариант.', 18, muted); description.lineHeight = { unit: 'PERCENT', value: 150 };
    }
    if (view === 'default') {
      const projects = frame(root, 'projects [section=workshop-projects]', inner, 'VERTICAL', paper, 0, 24);
      const heading = text(projects, 'projects-title', 'Примеры задач', narrow ? 24 : 32, ink, true); heading.lineHeight = { unit: 'PERCENT', value: 125 };
      const grid = frame(projects, 'project-grid [collection=projects]', inner, narrow ? 'VERTICAL' : 'HORIZONTAL', paper, 0, 24);
      for (const [id, title, description] of [
        ['landing', 'Сайт керамической мастерской', 'История мастера, коллекция работ и понятный путь к заказу. Два учебных проекта — без вымышленных клиентов.'],
        ['catalog', 'Каталог образцов для мастерской авторской мебели и предметов интерьера', 'Материалы, размеры и варианты отделки. Длинные названия остаются целиком, даже когда карточка становится узкой.']
      ]) {
        const cardWidth = narrow ? inner : (inner - 24) / 2;
        const card = frame(grid, `project-card-${id} [item=project]`, cardWidth, 'VERTICAL', tint, 24, 16); card.cornerRadius = 4;
        const titleNode = text(card, `project-${id}-title`, title, narrow ? 22 : 26, ink, true); titleNode.lineHeight = { unit: 'PERCENT', value: 125 };
        const descriptionNode = text(card, `project-${id}-description`, description, 17, muted); descriptionNode.lineHeight = { unit: 'PERCENT', value: 150 };
      }
    }
    const faq = frame(root, 'faq [section=workshop-faq] [anchor=faq]', inner, 'VERTICAL', tint, narrow ? 24 : 32, 16); faq.cornerRadius = 4;
    const faqTitle = text(faq, 'faq-title', 'Что передаём разработчику?', narrow ? 24 : 30, ink, true); faqTitle.lineHeight = { unit: 'PERCENT', value: 125 };
    const faqDescription = text(faq, 'faq-description', 'Редактируемый текст, понятную структуру и настоящие цели действий. Длинный ответ переносится автоматически; блок растёт по содержимому.', 18, muted, false, Math.min(inner - faq.paddingLeft * 2, 880)); faqDescription.lineHeight = { unit: 'PERCENT', value: 150 };
    const footer = frame(root, 'footer', inner, 'VERTICAL', paper, 0, 0);
    text(footer, 'email-link [href=mailto:hello@example.com]', 'hello@example.com', 16, blue);
    const modal = frame(root, 'contact-modal [modal=contact-modal]', Math.min(420, inner), 'VERTICAL', paper, 24, 16);
    text(modal, 'modal-title', 'Обсудим задачу', 24, ink, true);
    text(modal, 'modal-description', 'Напишите нам: hello@example.com', 16, muted);
    modal.visible = false; return root;
  }
  // Correct contexts are deliberately authored, not inferred from screenshot size.
  const after = [prepared(pages[1], 1440), prepared(pages[1], 375)];
  after.forEach((root, index) => {
    root.x = index ? 1656 : 120; root.y = 160;
    // The copy owns its text and actions at both widths. A narrower direction
    // is responsive reflow; another meaningful parent is a different fact.
    root.findOne(node => node.name === 'hero-copy').appendChild(root.findOne(node => node.name === 'hero-actions'));
  });

  function addNarrowDiscrepancies(root) {
    root.findOne(node => node.name === 'hero-title').characters = 'Мастерская макетов';
    // Move the complete actions frame AFTER art and OUT of hero-copy. Merely
    // reordering siblings inside one owner would not be this teaching error.
    root.findOne(node => node.name === 'hero [section=workshop-hero]').appendChild(root.findOne(node => node.name === 'hero-actions'));
  }

  after.forEach((root, index) => {
    const before = root.clone(); pages[0].appendChild(before); before.x = root.x; before.y = root.y;
    if (index) addNarrowDiscrepancies(before);
    before.name = index ? 'mobile-final-2' : 'desktop';
    for (const child of before.findAll()) child.name = child.name.replace(/\s*\[[^\]]+\]/g, '');
    before.findOne(node => node.name === 'hero').name = 'Frame 42';
    before.findOne(node => node.name === 'hero-title').name = index ? 'Title mobile' : 'Heading';
    before.findOne(node => node.name === 'contact-button').name = index ? 'Button copy' : 'Button';
  });
  after.forEach((root, index) => {
    const broken = root.clone(); pages[2].appendChild(broken); broken.x = root.x; broken.y = root.y;
    if (!index) return;
    addNarrowDiscrepancies(broken);
  });

  // Introduce library ownership only AFTER cloning the standalone source and
  // inconsistent example. Page 01 does not start with a hidden shared library.
  const collection = figma.variables.createVariableCollection('Workshop foundations');
  const mode = collection.modes[0].modeId;
  collection.renameMode(mode, 'Default');
  function variable(name, type, value, scopes) {
    const result = figma.variables.createVariable(name, collection, type);
    result.scopes = scopes; result.setValueForMode(mode, value);
    result.setVariableCodeSyntax('WEB', `var(--workshop-${name.replaceAll('/', '-')})`);
    return result;
  }
  function color(name, value, scopes) {
    const primitive = variable(`primitive/${name}`, 'COLOR', { ...rgb(value), a: 1 }, []);
    return variable(`color/${name}`, 'COLOR', { type: 'VARIABLE_ALIAS', id: primitive.id }, scopes);
  }
  const colors = {
    brand: color('brand', blue, ['FRAME_FILL', 'STROKE_COLOR']),
    surface: color('surface', paper, ['FRAME_FILL', 'TEXT_FILL']),
    ink: color('ink', ink, ['TEXT_FILL']),
    muted: color('muted', muted, ['TEXT_FILL']),
    border: color('border', line, ['STROKE_COLOR']),
    brandHover: color('brand-hover', '#005B9C', ['FRAME_FILL', 'STROKE_COLOR']),
    brandPressed: color('brand-pressed', '#004A80', ['FRAME_FILL', 'STROKE_COLOR']),
    secondaryHover: color('secondary-hover', tint, ['FRAME_FILL']),
    secondaryPressed: color('secondary-pressed', '#E4EAF0', ['FRAME_FILL']),
    disabledSurface: color('disabled-surface', '#DFE5EB', ['FRAME_FILL', 'STROKE_COLOR']),
    disabledInk: color('disabled-ink', '#687583', ['TEXT_FILL']),
  };
  const controlSpace = variable('space/control', 'FLOAT', 16, ['GAP']);
  const panelSpace = variable('space/panel', 'FLOAT', 24, ['GAP']);
  const controlRadius = variable('radius/control', 'FLOAT', 4, ['CORNER_RADIUS']);
  const focusRadius = variable('radius/focus', 'FLOAT', 8, ['CORNER_RADIUS']);
  const focusStroke = variable('space/focus-ring', 'FLOAT', 2, ['STROKE_FLOAT']);
  function bindPaint(node, field, value) {
    node[field] = node[field].map(paint => paint.type === 'SOLID' ? figma.variables.setBoundVariableForPaint(paint, 'color', value) : paint);
  }
  function textStyle(name, fontName, fontSize, lineHeight) {
    const style = figma.createTextStyle(); style.name = name;
    style.fontName = fontName; style.fontSize = fontSize; style.lineHeight = { unit: 'PERCENT', value: lineHeight };
    return style;
  }
  const labelStyle = textStyle('Workshop/Button label', strong, 16, 150);
  const modalTitleStyle = textStyle('Workshop/Modal title', strong, 24, 140);
  const modalBodyStyle = textStyle('Workshop/Modal body', regular, 16, 140);
  // Native variants own pointer/availability styling. Keyboard focus is an
  // independent Boolean, so it can coexist with hover or pressed.
  const sources = frame(pages[1], 'Button sources', 632, 'VERTICAL', paper, 24, 32);
  sources.x = 3040; sources.y = 160;
  text(sources, 'sources-title', 'Исходные компоненты кнопок', 24, ink, true);
  const buttonStates = ['default', 'hover', 'pressed', 'disabled'];
  const buttonFamilies = ['contact-button [action=modal:contact-modal]', 'faq-link [href=#faq]'].map((name, index) => {
    const clone = after[0].findOne(node => node.name === name).clone(); sources.appendChild(clone);
    const component = figma.createComponentFromNode(clone);
    component.description = 'Общий вид кнопки. Действие задаётся на экземпляре страницы; это образцы вида, не реализация реакции.';
    for (const field of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']) component.setBoundVariable(field, controlSpace);
    for (const field of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) component.setBoundVariable(field, controlRadius);
    const label = component.children.find(node => node.type === 'TEXT');
    label.textStyleId = labelStyle.id;
    label.textAutoResize = 'HEIGHT'; label.resize(component.width - 32, label.height); label.layoutSizingHorizontal = 'FILL';
    const labelProperty = component.addComponentProperty('Label', 'TEXT', label.characters);
    label.componentPropertyReferences = { ...label.componentPropertyReferences, characters: labelProperty };
    const variants = buttonStates.map((state, stateIndex) => {
      const variant = stateIndex ? component.clone() : component;
      if (stateIndex) sources.appendChild(variant);
      variant.name = `State=${state}`;
      const fill = state === 'disabled' ? colors.disabledSurface : index
        ? (state === 'hover' ? colors.secondaryHover : state === 'pressed' ? colors.secondaryPressed : colors.surface)
        : (state === 'hover' ? colors.brandHover : state === 'pressed' ? colors.brandPressed : colors.brand);
      const stroke = index ? colors.border : fill;
      bindPaint(variant, 'fills', fill); bindPaint(variant, 'strokes', stroke);
      bindPaint(variant.children.find(node => node.type === 'TEXT'), 'fills', state === 'disabled' ? colors.disabledInk : index ? colors.ink : colors.surface);
      return variant;
    });
    const family = figma.combineAsVariants(variants, sources);
    family.name = index ? 'button-secondary' : 'button-primary';
    family.description = 'State: default, hover, pressed, disabled. Focus visible — отдельное свойство; фокус не заменяет состояние. Здесь показан внешний вид, не runtime-поведение.';
    family.layoutMode = 'VERTICAL'; family.primaryAxisSizingMode = 'AUTO'; family.counterAxisSizingMode = 'AUTO';
    family.paddingTop = family.paddingBottom = family.paddingLeft = family.paddingRight = 16;
    family.itemSpacing = 24; family.fills = []; family.clipsContent = false;
    const focusProperty = family.addComponentProperty('Focus visible', 'BOOLEAN', false);
    for (const variant of variants) {
      const ring = figma.createRectangle(); variant.appendChild(ring); ring.name = 'focus-ring';
      ring.layoutPositioning = 'ABSOLUTE'; ring.resize(variant.width + 8, variant.height + 8); ring.x = ring.y = -4;
      ring.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
      ring.fills = []; ring.strokes = paint(blue); ring.strokeAlign = 'OUTSIDE'; ring.strokeWeight = 2; ring.cornerRadius = 8;
      ring.setBoundVariable('strokeWeight', focusStroke);
      for (const field of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) ring.setBoundVariable(field, focusRadius);
      bindPaint(ring, 'strokes', colors.brand);
      ring.visible = false; ring.componentPropertyReferences = { visible: focusProperty };
    }
    return { family, variants, focusProperty };
  });
  const buttonMasters = buttonFamilies.map(({ variants }) => variants[0]);
  const kit = frame(pages[1], 'UI Kit', 760, 'VERTICAL', paper, 32, 20);
  kit.x = 2140; kit.y = 160; kit.clipsContent = false;
  text(kit, 'kit-title', 'UI-kit · состояния кнопок', 28, ink, true);
  text(kit, 'kit-purpose', 'Внешний вид общий. Действие — у экземпляра на странице.', 18, muted);
  const header = frame(kit, 'button-state-headings', 696, 'HORIZONTAL', paper, 0, 20);
  text(header, 'state-heading', 'Состояние', 14, muted, false, 184);
  text(header, 'primary-heading', 'Primary', 16, ink, true, 236);
  text(header, 'secondary-heading', 'Secondary', 16, ink, true, 236);
  for (const [state, caption, focus] of [
    ['default', 'Обычная', false], ['hover', 'Наведение', false],
    ['default', 'Фокус с клавиатуры', true], ['pressed', 'Нажатие', false], ['disabled', 'Недоступна', false],
  ]) {
    const row = frame(kit, `button-example-${focus ? 'focus' : state}`, 696, 'HORIZONTAL', paper, 0, 20);
    row.counterAxisAlignItems = 'CENTER';
    text(row, 'state-label', caption, 16, muted, false, 184);
    for (const [index, family] of buttonFamilies.entries()) {
      const instance = family.variants[buttonStates.indexOf(state)].createInstance(); row.appendChild(instance);
      instance.name = `${index ? 'secondary' : 'primary'}-${focus ? 'focus' : state}`;
      instance.setProperties({ [family.focusProperty]: focus });
    }
  }
  text(kit, 'focus-note', 'Фокус — отдельный признак: он может сочетаться с наведением и нажатием. Недоступную кнопку нельзя активировать.', 16, muted);
  const modalBoard = frame(pages[1], 'Modals', 560, 'VERTICAL', paper, 32, 20);
  modalBoard.x = 2140; modalBoard.y = kit.y + kit.height + 64;
  text(modalBoard, 'modals-title', 'Modals', 28, ink, true);
  text(modalBoard, 'explanation', 'Общий вид окна. В каждом корне — свой скрытый экземпляр-цель.', 18, muted);
  const modalClone = after[0].findOne(node => node.name === 'contact-modal [modal=contact-modal]').clone();
  modalBoard.appendChild(modalClone);
  const modalMain = figma.createComponentFromNode(modalClone); modalMain.name = 'contact-modal'; modalMain.visible = true;
  modalMain.description = 'Вид контактного окна; локальный экземпляр в корне страницы получает [modal=contact-modal]. Главный компонент не является целью действия страницы.';
  bindPaint(modalMain, 'fills', colors.surface);
  for (const field of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']) modalMain.setBoundVariable(field, panelSpace);
  modalMain.setBoundVariable('itemSpacing', controlSpace);
  for (const child of modalMain.children.filter(node => node.type === 'TEXT')) {
    child.textStyleId = child.name === 'modal-title' ? modalTitleStyle.id : modalBodyStyle.id;
    bindPaint(child, 'fills', child.name === 'modal-title' ? colors.ink : colors.muted);
    child.textAutoResize = 'HEIGHT'; child.resize(modalMain.width - 48, child.height); child.layoutSizingHorizontal = 'FILL';
  }
  for (const root of after) {
    const actions = root.findOne(node => node.name === 'hero-actions');
    for (const [index, old] of [...actions.children].entries()) {
      const instance = buttonMasters[index].createInstance(); actions.insertChild(index, instance);
      instance.name = old.name; instance.resize(old.width, old.height); instance.counterAxisSizingMode = 'AUTO'; old.remove();
    }
    const old = root.children.find(node => node.name === 'contact-modal [modal=contact-modal]');
    const instance = modalMain.createInstance(); root.insertChild(root.children.indexOf(old), instance);
    instance.name = old.name; instance.resize(old.width, old.height);
    instance.counterAxisSizingMode = 'FIXED'; instance.primaryAxisSizingMode = 'AUTO'; instance.visible = false; old.remove();
  }
  const host = figma.createFrame(); pages[3].appendChild(host); host.name = 'legacy-page · вне проверки'; host.resize(1200, 820); host.x = 120; host.y = 160; host.fills = paint('#E9EEF3');
  const section = hero(host, 840); section.x = 48; section.y = 72;
  const external = section.findOne(node => node.name === 'faq-link [href=#faq]'); external.name = 'workshop-link [href=/workshop]';
  external.findOne(node => node.type === 'TEXT').characters = 'Открыть страницу';
  const localModal = frame(section, 'contact-modal [modal=contact-modal]', 360, 'VERTICAL', paper, 20, 8);
  text(localModal, 'modal-title', 'Обсудим задачу', 22, ink, true); localModal.visible = false;

  for (const [index, pair] of [[1440, 'default'], [375, 'default'], [1440, 'empty'], [375, 'empty']].entries()) {
    const root = prepared(pages[4], pair[0], pair[1]); root.x = index % 2 ? 1656 : 120; root.y = index < 2 ? 160 : 2600;
  }
  const componentBoard = frame(pages[4], 'Компонент и два действия экземпляров', 600, 'VERTICAL', paper, 24, 20);
  componentBoard.x = 2180; componentBoard.y = 2600;
  text(componentBoard, 'explanation', 'Общий компонент задаёт вид. Действие относится к экземпляру.', 20, ink, true);
  const buttonFrame = button(componentBoard, 'button', 'Обсудить проект');
  const component = figma.createComponentFromNode(buttonFrame); component.name = 'button';
  component.description = 'Учебный компонент: действие конкретной страницы не принадлежит общему имени кнопки.';
  for (const name of ['contact-button [action=modal:contact-modal]', 'email-link [href=mailto:hello@example.com]']) {
    const instance = component.createInstance(); componentBoard.appendChild(instance); instance.name = name;
  }
  await figma.setCurrentPageAsync(pages[1]);
  figma.currentPage.selection = [after[1]]; figma.viewport.scrollAndZoomIntoView(after);
  figma.closePlugin('Макет создан: 01 — исходный вариант, 02 — подготовленная страница с UI Kit и Modals, 03 — два намеренных расхождения.');
})().catch(error => figma.closePlugin(String(error.message || error)));
