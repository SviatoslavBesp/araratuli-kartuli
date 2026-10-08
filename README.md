# araratuli-kartuli

HTML-материалы для изучения грузинского языка (ქართული). Статический сайт без сборки — хостится на GitHub Pages.

## Структура

```
index.html              главная
konspekty/              конспекты (теория)
  index.html            список конспектов
  _template.html        шаблон нового конспекта
  01-alfavit.html
zadaniya/               задания (практика)
  index.html            список заданий
  _template.html        шаблон нового задания
  01-pervye-slova.html
assets/
  style.css             общие стили
  exercise.js           проверка ответов в заданиях
```

## Как добавить материал

1. Скопируйте `_template.html` нужного раздела в файл `NN-nazvanie.html` (номер + латиница через дефис).
2. Заполните содержимое.
3. Добавьте `<li>` со ссылкой в `index.html` этого раздела.

### Разметка заданий

Внутри `<section class="exercise">`; кнопки «Проверить / Показать ответы / Сбросить» появляются сами.

| Тип | Разметка |
| --- | --- |
| Ввод ответа | `<input type="text" data-answer="привет\|здравствуйте">` — варианты через `\|`, регистр и ё/е не важны |
| Выбор варианта | `<label><input type="radio" name="q1" data-correct> ответ</label>` — `name` уникален на странице |
| Самопроверка | `<span class="answer" hidden>ответ</span>` |

Полезные классы: `.ka` — грузинский текст, `.tr` — транслитерация, `.big` — крупно, `.note` — заметка.

## Публикация

Settings → Pages → Source: *Deploy from a branch*, ветка `main`, папка `/ (root)`.
Сайт будет доступен по адресу `https://sviatoslavbesp.github.io/araratuli-kartuli/`.

Локальный просмотр: `python3 -m http.server` и открыть http://localhost:8000.
