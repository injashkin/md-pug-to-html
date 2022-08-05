## Описание

Утилита `pug-md-to-html` преобразует файлы с разметкой Markdown в файлы HTML учитывая разметку шаблонизатора Pug.
Утилита ищет все файлы с расширением `.md` в указанном с помощью ключа `-i` каталоге и всех его подкаталогах, отделяет Frontmatter от контента и на основе данных, полученных из Frontmatter, местоположения файлов `.md` и настроек в строке `"pug-md-to-html"` файла `package.json`, генерирует `html` файлы, которые являются готовыми страницами сайта. Список URL адресов к этим страницам, также генерируется автоматически и помещается в файл `link-list.pug` в виде массива объектов. Каждый объект массива содержит три свойства: название статьи, Url адрес и краткое описание. Используя этот массив можно с помощью цикла сгенерировать список ссылок для перехода к этим страницам. Поля из Frontmatter, такие как title, description, created и др. встраиваются в соответствующие места HTML страниц. Файлы, которые не являются `.md`, просто копируются из исходного каталога в каталог `docs/images`, так как, обычно, это файлы изображений.

Markdown Frontmatter - это выделенный тремя дефисами `---` раздел в начале файла markdown, который имеет формат YAML/TOML. Вот пример frontmatter markdown в формате YAML:

```
---
title: Краткий справочник по командам Git
created: 2019-05-20
---

## Полезные команды по работе с Git и Github
```

## Использование

Пример подключения пакета в `package.json`:

```json
"scripts": {
  "pug-md-to-html": "node src/utils/pug-md-to-html -i=content -t=src/pages/article",

}
```

где после `node` указано следующее:

- `src/utils/pug-md-to-html` - путь к данной утилите (`pug-md-to-html`)
- ключ `-i` - путь к каталогу, где находятся файлы markdown
- ключ `-o` - путь к каталогу сборки проекта (по умолчанию `docs`)
- ключ `-t` - путь к каталогу шаблона статьи
- ключ `-d` - путь к каталогу, куда будет сгенерирован файл `linkList.pug` (по умолчанию `src/data`)

Утилита применяется в сборщике [npm-for-frontend](https://github.com/injashkin/npm-for-frontend).

## Пакеты, которые могут быть полезны для разработки

- [markdown-to-pug](https://www.npmjs.com/package/markdown-to-pug) - конвертирует Markdown в Pug

- [markdown-front-matter-json](https://github.com/egavrilov/markdown-front-matter-json) - преобразует Markdown с front-matter в объект JS

- [markdown-it-front-matter](https://www.npmjs.com/package/markdown-it-front-matter)
- [markdown-it-container](https://github.com/markdown-it/markdown-it-container)

- [gray-matter](https://github.com/jonschlinkert/gray-matter) - преобразует Markdown с front-matter в YAML (по умолчанию), но также поддерживает JSON, TOML или Coffee Front-Matter с возможностью установки пользовательских разделителей. Данные может получать из файла и из строки.

- [article-data](https://www.npmjs.com/package/article-data) - преобразует Markdown с front-matter в объект
- [get-md-content](https://github.com/iamstarkov/get-md-content)
- [get-md-date](https://github.com/iamstarkov/get-md-date)
- [get-md-desc](https://github.com/iamstarkov/get-md-desc)
- [get-md-image](https://github.com/iamstarkov/get-md-image)
- [get-md-title](https://github.com/iamstarkov/get-md-title)

- [frontmatter-markdown-to-json](https://www.npmjs.com/package/frontmatter-markdown-to-json)
