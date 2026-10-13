# DFC Bridge на примерах

Используйте эти короткие рецепты, когда вопрос по макету уже понятен. Каждый пример показывает одну проблему, одно исправление и короткую причину. Выберите пример под текущую задачу; читать их по порядку необязательно.

[Визуальный экскурс о смысле передачи](../docs/ru/25-vizualnyj-urok.md): вопросы команды, причины решений и настоящие снимки Figma.

## 1. Страница и ширины

**Проблема:** в файле есть несвязанные корни `desktop` и `mobile-final-2`.

**Используйте:**

```text
home [page=home] [route=/] [bp=1440] [view=default]
home [page=home] [route=/] [bp=375] [view=default]
```

Одинаковые `[page]` и `[view]` связывают подготовленные ширины. `[bp]` записывает ширину каждого корня.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/contexts-ru.svg" alt="Корни с нативными ширинами 1440 и 375 имеют общие workshop и default" loading="lazy" width="481" height="557" />
<figcaption>Отдельная иллюстрация на workshop, не снимок примера home выше. Сначала прочитайте общие page и view, затем два значения bp. Они задают ширины одного вида страницы. URL задаётся отдельно через route; bp обозначает подготовленную нативную ширину, не порог CSS-медиазапроса. <a href="../assets/tutorial/diagrams/contexts-ru.svg">Открыть в полном размере</a>.</figcaption>
</figure>

## 2. Одно имя на разных ширинах

**Проблема:** `hero-title-mobile` выглядит как новый элемент.

**Используйте:**

```text
hero-title
```

Размер и положение могут измениться. Стабильное имя помогает узнать тот же логический элемент.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/identity-ru.svg" alt="Линии сопоставляют contact-button и faq-link в двух рамках hero-actions" loading="lazy" width="481" height="613" />
<figcaption>Отдельная иллюстрация с двумя элементами управления, не изображение hero-title выше. Проследите линии до одноимённых элементов на обеих ширинах. Имя задаёт соответствие, а не неизменную позицию. Здесь оба элемента также сохраняют родителя hero-actions; смену смыслового родителя нужно объявить как преобразование. <a href="../assets/tutorial/diagrams/identity-ru.svg">Открыть в полном размере</a>.</figcaption>
</figure>

## 3. Секция страницы

Используйте `[section]` для секции, собранной прямо на странице:

```text
product-results [section=product-results]
  product-grid [collection=products]
```

Экземпляр из библиотеки `Page Sections` уже имеет исходный компонент. Не повторяйте ключ секции, если локальный фрейм не является её границей.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/structure-ru.svg" alt="Внутри hero: hero-copy с текстом, hero-actions с двумя элементами управления и workshop-art" loading="lazy" width="481" height="691" />
<figcaption>Отдельная иллюстрация секции hero, не дерева product-results выше. Читайте вложенные рамки снаружи внутрь: hero содержит текстовую группу, действия и визуал; текст и элементы управления имеют смысловых родителей. Это схема структуры, не сравнение ширин и не снимок Figma. <a href="../assets/tutorial/diagrams/structure-ru.svg">Открыть в полном размере</a>.</figcaption>
</figure>

## 4. Ссылка или действие

Используйте `[href]` для перехода и `[action]` для изменения текущего интерфейса:

```text
catalog-link [href=/catalog]
filter-button [action=state:filters-open]
```

Не используйте фальшивый `href` для кнопки и фальшивое действие для обычной ссылки.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/interactions-ru.svg" alt="href=#faq указывает на anchor=faq, action=modal:contact-modal — на modal=contact-modal" loading="lazy" width="481" height="839" />
<figcaption>Отдельная иллюстрация с якорем и окном, не примером маршрута и состояния выше. Читайте два пути отдельно: href задаёт переход к якорю FAQ, action — открытие окна в текущем интерфейсе. Это объявленные намерения, не настроенный прототип Figma и не доказательство работы перехода, фокуса или закрытия окна. <a href="../assets/tutorial/diagrams/interactions-ru.svg">Открыть в полном размере</a>.</figcaption>
</figure>

## 5. Кнопка и модальное окно

Действие ссылается на стабильный идентификатор модального окна:

```text
contact-button [action=modal:contact-modal]

contact-modal [modal=contact-modal]
  modal-title
  close-button
```

Одна и та же кнопка из `UI Kit` может выполнять разные действия в разных местах. Действие задаётся экземпляру на странице, а не общему имени компонента.

<figure class="bridge-lesson-figure bridge-lesson-screenshot">
<img src="../assets/tutorial/screenshots/assistant-layer-local.png" alt="Локальный помощник: кнопка, настоящая цель и переход к ней" loading="lazy" width="906" height="1173" />
<figcaption>Локальный помощник: кнопка, настоящая цель и переход к ней. Настоящий снимок локальной сборки, не опубликованного интерфейса. <a href="../assets/tutorial/screenshots/assistant-layer-local.png">Открыть в полном размере</a>.</figcaption>
</figure>

## 6. Осмысленная структура

**Проблема:** соседние слои сгруппированы только потому, что их выбрали вместе.

**Используйте:**

```text
hero
  hero-copy
    hero-title
    hero-subtitle
  hero-actions
    contact-button
```

У каждой обёртки должна быть настоящая задача: содержимое, раскладка, обрезка, фон или область взаимодействия. Подробности — в [правилах подготовки макета](../docs/ru/01-pravila-dizajna.md) и [правилах обёрток](../docs/ru/06-politika-obertok.md).

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/structure-ru.svg" alt="hero-copy объединяет текст, hero-actions — элементы управления внутри hero" loading="lazy" width="481" height="691" />
<figcaption>Расширенная схема структуры, не изображение сокращённого дерева выше. Проследите вложенность: hero-copy содержит связанный текст, hero-actions — связанные элементы управления. У каждой обёртки есть задача в раскладке. Показана одна осмысленная структура, не сравнение хорошего и плохого и не требование добавлять обёртки везде. <a href="../assets/tutorial/diagrams/structure-ru.svg">Открыть в полном размере</a>.</figcaption>
</figure>

## 7. Реальный контент

Показывайте данные, которые могут изменить раскладку:

```text
product-card
  product-title
  product-price
  product-image
```

Проверьте короткий, длинный, пустой, загружаемый и ошибочный варианты. Не заменяйте изменяемый контент картинкой готовой композиции.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/content-ru.svg" alt="Верхняя карточка фиксированной высоты обрезает текст; нижняя с высотой Hug сохраняет его и сдвигает соседа" loading="lazy" width="481" height="703" />
<figcaption>Сравните один текст сверху и снизу: в этом примере высота Hug сохраняет последние строки и сдвигает следующую карточку. Фиксированная высота, прокрутка и сокращение не запрещены вообще: для них нужна явная, подходящая политика переполнения. <a href="../assets/tutorial/diagrams/content-ru.svg">Открыть в полном размере</a>.</figcaption>
</figure>

## 8. Контент, декор и экспорт

Используйте самое короткое понятное правило на точном визуальном слое:

```text
product-image
hero-glow [decor]
campaign-illustration [asset]
```

`[decor]` описывает визуальную роль. `[asset]` означает, что визуал передаётся одним ресурсом. Один слой может использовать оба тега, если верны оба утверждения.

<figure class="bridge-lesson-figure bridge-lesson-diagram">
<img src="../assets/tutorial/diagrams/roles-ru.svg" alt="Редактируемый текст, нативный декор и единый непрозрачный визуал сопоставлены по роли и границе передачи" loading="lazy" width="481" height="761" />
<figcaption>Отдельная иллюстрация на hero-title, hero-glow и workshop-art. Читайте каждую строку от роли к границе передачи: текст остаётся редактируемым; метка декора задаёт визуальное назначение; метка ресурса — передачу одним целым. Это разные решения, поэтому метки совместимы. Схема не относит все продуктовые изображения к декору. <a href="../assets/tutorial/diagrams/roles-ru.svg">Открыть в полном размере</a>.</figcaption>
</figure>

## Как пользоваться каталогом

Найдите похожую задачу и примените минимальный подходящий пример. Затем пройдите [чеклист дизайнера](../docs/ru/17-cheklist-dlya-dizaynerov.md) для выбранной области передачи.

Имя слоя не заменяет описание всего поведения. Решения о [данных](../docs/ru/20-dannye-i-vizualizaciya.md), [реакциях](../docs/ru/22-sostoyaniya-i-reakcii.md), [движении](../docs/ru/21-motion-i-scroll.md) и [доступности](../docs/ru/23-profil-dostupnosti.md) записывайте в структурированном [контракте переноса](../docs/ru/04-kontrakt-perenosa.md). Начните с проверяемого файла `validator/examples/bridge-contract.valid.json` в репозитории. Иллюстративный пример в статье и отдельные фрагменты модулей не являются полной передачей.
