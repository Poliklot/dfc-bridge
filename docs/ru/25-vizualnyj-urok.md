# Зачем нужен DFC Bridge

Посмотрим на макет — desktop и mobile:

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/figma-before-overview.png" width="1600" height="1488" alt="Настоящая страница 01 Figma: готовый внешний вид в двух ширинах, но корни названы desktop и mobile-final-2" loading="eager" />
<figcaption>Выглядит готовым. Что именно передали — пока непонятно.</figcaption>
</figure>

Макет красивый. Но frontend, backend и ИИ всё ещё гадают: что собирать, откуда данные и куда ведут кнопки?

DFC Bridge не диктует дизайн. Помогает передать **решения, а не догадки**. Смотрим на одном макете.

<a class="bridge-lesson-download" href="../../assets/tutorial/dfc-bridge-workshop.fig" download="dfc-bridge-workshop.fig"><span aria-hidden="true">↓</span> Скачать макет <span class="bridge-lesson-download-format">.fig</span></a>

1. Открой Figma.
2. На главной нажми **Import**.
3. Выбери скачанный `.fig`.

## 1. Красиво. Но непонятно

`desktop` и `mobile-final-2`. Это одна страница или разные? Названия не отвечают. Команда начинает додумывать.

Сравним два дерева. Где один и тот же заголовок, где одна и та же кнопка?

<div class="bridge-lesson-pair bridge-lesson-tree-pair">
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/tree-desktop.png" width="472" height="464" alt="Настоящее раскрытое дерево слоёв Figma на desktop: Heading и Button" loading="lazy" />
<figcaption>Desktop: <code>Heading</code> / <code>Button</code>.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/tree-mobile.png" width="472" height="432" alt="Настоящее раскрытое дерево слоёв Figma на mobile: Title mobile и Button copy" loading="lazy" />
<figcaption>Mobile: <code>Title mobile</code> / <code>Button copy</code>.</figcaption>
</figure>
</div>

Два решения «чтобы на мобильном было красивее»:

- «Мастерская понятных макетов» → «Мастерская макетов». Поменяли текст, не перенос строки.
- Весь `hero-actions` вынесли из `hero-copy` в `hero`, после картинки. Поменяли родителя, не просто порядок.

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<aside class="bridge-lesson-comment">
<p><strong>Frontend:</strong> Короче текст, кнопки под картинкой — можно.</p>
<img class="bridge-lesson-penguin" src="../../assets/tutorial/illustrations/handoff-penguin-frontend-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<img src="../../assets/tutorial/screenshots/figma-broken-comparison.png" width="1600" height="1488" alt="Исходные desktop и mobile-final-2: полный и сокращённый заголовки, кнопки до и после иллюстрации" loading="lazy" />
<figcaption>На мобильном пропало слово «понятных», кнопки уехали под картинку.</figcaption>
</figure>

Но нужно согласовать вариант текста и описать перенос. Здесь этого нет: frontend и ИИ гадают.

## 2. Связали экраны

Договорились: одна страница `workshop`, маршрут `/workshop`, вид `default`, ширины 1440 и 375. Записали в именах корней:

```text
workshop [page=workshop] [route=/workshop] [bp=1440] [view=default]
workshop [page=workshop] [route=/workshop] [bp=375] [view=default]
```

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/contexts-ru.svg" width="481" height="557" alt="Два корня workshop имеют одну страницу и вид default, но ширины 1440 и 375" loading="lazy" />
<figcaption>Одна страница, один вид, две ширины.</figcaption>
</figure>

Frontend знает, что собирать. ИИ не ищет «самый final». Теги описывают договорённость, не создают раскладку или код.

## 3. Нашли те же элементы

Назвали по роли, не по устройству. Теперь frontend и ИИ могут сопоставить элементы:

| Было на 1440 / 375 | Стало на обеих ширинах |
| --- | --- |
| `Heading` / `Title mobile` | `hero-title` |
| `Button` / `Button copy` | `contact-button` |

Здесь выбрали общий `hero-title` и вернули `hero-actions` в `hero-copy`, перед `workshop-art`. Это не единственный путь.

<div class="bridge-lesson-pair bridge-lesson-motion-pair">
<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../../assets/tutorial/motion/rename-title.mp4" poster="../../assets/tutorial/motion/rename-title.png" width="472" height="528" controls playsinline preload="none" aria-label="Пошаговая запись Figma: переименовали слой Title mobile в hero-title, не меняя текст"><a href="../../assets/tutorial/motion/rename-title.mp4" download="rename-title.mp4">Скачать MP4</a></video>
<figcaption>Пошаговая запись Figma: <code>Title mobile</code> → <code>hero-title</code>. Текст не меняли. <a href="../../assets/tutorial/motion/rename-title.gif" download="rename-title.gif">Скачать GIF</a>.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-motion">
<video src="../../assets/tutorial/motion/move-actions.mp4" poster="../../assets/tutorial/motion/move-actions.png" width="472" height="528" controls playsinline preload="none" aria-label="Пошаговая запись Figma: перенесли весь hero-actions в hero-copy, сохранив обе кнопки"><a href="../../assets/tutorial/motion/move-actions.mp4" download="move-actions.mp4">Скачать MP4</a></video>
<figcaption>Пошаговая запись Figma: весь <code>hero-actions</code> → внутрь <code>hero-copy</code>. <a href="../../assets/tutorial/motion/move-actions.gif" download="move-actions.gif">Скачать GIF</a>.</figcaption>
</figure>
</div>

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/figma-prepared-tree.png" width="752" height="1000" alt="Настоящее дерево подготовленной Figma: hero-actions с contact-button и faq-link находится внутри hero-copy" loading="lazy" />
<figcaption>Текст и действия снова внутри hero-copy.</figcaption>
</figure>

**Другой текст — [согласованный продуктовый вариант](16-osi-variativnosti.md). Другой родитель — [описанная трансформация](03-adaptivy-i-breakpointy.md).** Внутри одного родителя порядок менять можно.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/identity-ru.svg" width="481" height="613" alt="Те же contact-button и faq-link внутри hero-actions: ряд на 1440, колонка на 375" loading="lazy" />
<figcaption>Те же кнопки. Другая раскладка.</figcaption>
</figure>

На desktop кнопки рядом, на mobile — друг под другом. **Разная раскладка — нормально:** меняется Auto Layout, текст и родитель здесь те же.

<div class="bridge-lesson-pair bridge-lesson-heroes">
<figure class="bridge-lesson-figure bridge-lesson-render">
<img src="../../assets/tutorial/renders/hero-1440.png" width="1376" height="692" alt="Нативный кадр подготовленной страницы на 1440 px: полный заголовок и кнопки рядом, с полями вокруг hero" loading="lazy" />
<figcaption>1440 px: кнопки рядом.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-render">
<img src="../../assets/tutorial/renders/hero-375.png" width="375" height="624" alt="Нативный кадр подготовленной страницы на 375 px: полный заголовок и кнопки перед иллюстрацией, с полями страницы" loading="lazy" />
<figcaption>375 px: кнопки друг под другом, перед картинкой.</figcaption>
</figure>
</div>

Заголовок остаётся текстом. `workshop-art [decor] [asset]` — цельной картинкой. Не превращаем весь интерфейс в PNG.

## 4. Собрали библиотеку

`button-primary` и `button-secondary` стали общими компонентами. Правим источник — обновляются экземпляры. Не нужно чинить каждую копию.

В **UI-kit** показали состояния обоих стилей, в **Modals** — общий вид окна. Frontend и ИИ видят образцы, а не придумывают их.

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/figma-kit-modals.png" width="1160" height="1514" alt="Настоящие UI-kit: два стиля кнопок в обычном состоянии, при наведении, фокусе, нажатии и недоступности; рядом Modals с contact-modal" loading="lazy" />
<figcaption>Два стиля, пять примеров состояний. Окно — рядом в Modals.</figcaption>
</figure>

**В библиотеке — вид. На экземпляре страницы — действие.** Одна и та же кнопка в другом месте может делать другое.

- `contact-button [action=modal:contact-modal]` → открыть окно.
- `faq-link [href=#faq]` → перейти к FAQ.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../../assets/tutorial/diagrams/interactions-ru.svg" width="481" height="839" alt="contact-button указывает на локальное окно contact-modal, faq-link — на якорь faq" loading="lazy" />
<figcaption>Кнопка → окно. Ссылка → FAQ.</figcaption>
</figure>

В Assistant выбрали действие и цель на самой кнопке, не на её тексте:

<div class="bridge-lesson-pair">
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/assistant-layer-type-local.png" width="906" height="1173" alt="Assistant: тип Кнопка, действие Модальное окно и переход К цели" loading="lazy" />
<figcaption>Выбрали действие на самой кнопке.</figcaption>
</figure>
<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<aside class="bridge-lesson-comment">
<p><strong>ИИ:</strong> В этой ширине цель — contact-modal.</p>
<img class="bridge-lesson-penguin" src="../../assets/tutorial/illustrations/handoff-penguin-ai-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<img src="../../assets/tutorial/screenshots/assistant-layer-target-local.png" width="906" height="1173" alt="Assistant: имя contact-button и выбранная цель contact-modal на 375 px" loading="lazy" />
<figcaption>Указали цель в нужной ширине.</figcaption>
</figure>
</div>

**К цели** только находит слой, не открывает окно. Само поведение ещё нужно реализовать.

<details>
<summary>Как устроены компоненты</summary>

Обычный, наведение, клавиатурный фокус, нажатие и недоступность — образцы, не работающий прототип.

`State=default/hover/pressed/disabled` — варианты Figma, не DFC-теги или виды страницы. Фокус независим: `Focus visible=true` может сочетаться с `hover` и `pressed`.

Недоступный образец показывает только вид. Условие отключения и его владелец — в контракте реализации. Загрузки нет: здесь окно и якорь, не асинхронный запрос.

В каждом корне — свой скрытый `[modal=contact-modal]`. Главный компонент в Modals — источник вида, не ещё одна цель. Окно с почтой, не форма отправки.

</details>

Источник данных и договорённости фиксируем в [контракте данных](20-dannye-i-vizualizaciya.md).

## 5. Проверили

В копии с неописанными отличиями нажали **Проверить → Проверить страницу**. Assistant нашёл разный текст `hero-title` и другого родителя `hero-actions`. Auto Layout был включён.

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/assistant-findings-local.png" width="1430" height="1656" alt="Настоящий отчёт Assistant: две ошибки, различающийся текст заголовка и изменённый смысловой родитель hero-actions" loading="lazy" />
<figcaption>Две ошибки исходника, не запрет на дизайн.</figcaption>
</figure>

**Показать слой → исправить → Повторить.** На странице 02 — выбранное здесь решение: общий заголовок, общий родитель и связанные компоненты.

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<aside class="bridge-lesson-comment">
<p><strong>Backend:</strong> Карточки пока примеры. Источник данных ещё согласуем.</p>
<img class="bridge-lesson-penguin" src="../../assets/tutorial/illustrations/handoff-penguin-backend-display.png" width="216" height="274" alt="" aria-hidden="true" draggable="false" loading="lazy" />
</aside>
<img src="../../assets/tutorial/screenshots/figma-final-overview.png" width="1560" height="1072" alt="Подготовленные корни workshop на 1440 и 375 px рядом с UI-kit со состояниями кнопок и Modals в настоящей Figma" loading="lazy" />
<figcaption>В итоге: согласованный макет, UI-kit и Modals рядом.</figcaption>
</figure>

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../../assets/tutorial/screenshots/assistant-ready-result-local.png" width="1430" height="1656" alt="Настоящий полный отчёт Assistant: workshop готово, ширины 375 и 1440 px, нулевые счётчики и граница проверки" loading="lazy" />
<figcaption>Страница 02: в проверенной области ошибок нет.</figcaption>
</figure>

**«Готово» — про проверенную область макета, не готовое приложение.**

Передаём **исходник, ресурсы и договорённости**. Незакрытые вопросы — с владельцами. Не один PNG и обещание «там всё понятно».

## Дальше по задаче

- [Чеклист передачи](17-cheklist-dlya-dizaynerov.md).
- [Контент и переполнение](07-vysoty-i-overflow.md) — best practices подготовки.
- [Новая секция в старом макете](19-vnedrenie-v-komandu.md).
- [Виды и варианты](16-osi-variativnosti.md).
- [Доступность](23-profil-dostupnosti.md).

Учебный макет. Скрины — из Figma, Assistant — локальная сборка. Пингвины сгенерированы, вопросы команды — примеры. [Как проверено](../../assets/tutorial/README.md).
