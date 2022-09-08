<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

Читать на других языках: [Английский](README.md)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/injashkin/md-pug-to-html">  
    <img src="https://avatars.githubusercontent.com/u/36812603?v=4" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">MdPugToHtml</h3>

  <p align="center">
    Массово конвертирует файлы Markdown в HTML с возможностью применять шаблоны Pug
    <br />
    <a href="https://github.com/injashkin/md-pug-to-html/blob/main/README.ru.md"><strong>Изучите документацию »</strong></a>
    <br />
    <br />
    <a href="https://github.com/injashkin/md-pug-to-html">Демонстрация</a>
    ·
    <a href="https://github.com/injashkin/md-pug-to-html/issues">Отчет об ошибках</a>
    ·
    <a href="https://github.com/injashkin/md-pug-to-html/issues">Хотелки</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Содержание

- [О проекте](#о-проекте)
- [Установка](#установка)
- [Использование CLI](#использование-CLI)
  - [Простой способ](#простой-способ)
  - [Продвинутый способ](#продвинутый-способ)
- [Использование API](#использование-api)
- [Используемые технологии](#используемые-технологии)
- [Дальнейшее развитие](#дальнейшее-развитие)
- [Участие в проекте](#участие-в-проекте)
- [Лицензия](#лицензия)
- [Контакты](#контакты)
- [Благодарности](#благодарности)
- [Дополнительно](#дополнительно)

<!-- ABOUT THE PROJECT -->

## О проекте

MdPugToHtml массово конвертирует файлы Markdown в файлы HTML. При этом, можно указать шаблон Pug, по которому все страницы Markdown будут преобразованы в HTML.

Также, конвертер MdPugToHtml генерирует массив объектов, в котором для каждой созданной HTML страницы содержатся следующие данные:

- путь к файлу HTML страницы
- заголовок HTML страницы
- краткое описание HTML страницы
- любые другие данные, которые пользователь пожелает указывать в своих статьях Markdown в разделе Frontmatter.

Этот массив объектов можно получить либо с помощью метода `getDataList()` API, либо, если используется CLI, то в файле `mpth-data.pug`, который выглядит примерно так:

```pug
- const dataListItems = [
  {
    "pathFile":"article1/index.html",
    "title":"Заголовок первой статьи",
    "description":"Краткое описание первой статьи",
    "date":"09-08-2022"
  },
  {
    "pathFile":"article2/index.html",
    "title":"Заголовок второй статьи",
    "description":"Краткое описание второй статьи",
    "date":"19-12-2019"
  },
  ...
]
```

Конвертер MdPugToHtml рекурсивно обходит все подкаталоги в указанном каталоге, находит файлы Markdown и конвертирует их в страницы HTML. При этом, может быть задействован шаблон Pug, в соответствии с которым страницы будут преобразованы. Затем отконвертированные страницы помещаются в указанный выходной каталог. В выходном каталоге полностью сохраняется структура исходного каталога.

Файлы Markdown могут содержать данные Frontmatter. Frontmatter - это раздел в начале файла, выделенный с обеих сторон тремя дефисами `---`. Frontmatter может быть написан в любом из форматов YAML/TOML/JSON. Вот пример того, как в файле Markdown записывается Frontmatter в формате YAML:

```YAML
---
title: Краткий справочник по командам Git
create: 20-05-2019
---

## Полезные команды по работе с Git и Github
```

Потребность в конверторе MdPugToHtml возникла при создании сборщика статических страниц [npm-for-frontend](https://github.com/injashkin/npm-for-frontend), но MdPugToHtml может использоваться независимо.

<p align="right">(<a href="#readme-top">в начало</a>)</p>

## Установка

```
npm i -D md-pug-to-html
```

<p align="right">(<a href="#readme-top">в начало</a>)</p>

<!-- USAGE EXAMPLES -->

## Использование CLI

Чтобы все нижеперечисленное работало, у вас на компьютере должен быть установлен Node.js.

Чтобы работала команда `npx` у вас должна быть NPM версии 5.2 или выше.

### Простой способ

Этот способ позволяет, легко отконвертировать весь каталог с файлами Markdown в файлы HTML.

Допустим, у вас есть файлы Markdown, они лежат в каталоге `/home/my/content` и вы хотите, просто, их отконвертировать. Для этого откройте терминал и введите следующую команду:

```
npx -y md-pug-to-html /home/my/content
```

Будет установлен конвертер MdPugToHtml и затем будет выполнено преобразование Markdown файлов. Установка будет произведена только при первом запуске команды. При последующих запусках будет производится только конвертирование.

Откройте каталог из которого вы в терминале запустили команду и вы увидите там каталог `npth`, в котором находятся откомпилированные файлы HTML.

Дополнительно, в каталоге `npth` будут находится три файла:

- `index.html` - содержит список ссылок на созданные файлы Html. Если открыть этот файл в браузере, то можно просматривать созданные страницы из браузера переходя по ссылкам. Вы можете отключить создание файла `index.html` применив с вышеприведенной командой опцию `-I`.

- `mpth-data.pug` - содержит массив объектов с данными о файлах HTML. Этот массив может быть использован, например, для создания списка ссылок на статьи в формате блога. Как это сделать смотри [Продвинутый способ](#продвинутый-способ).

- `mpth-template.pug` - шаблон Pug. Именно этот шаблон используется конвертером MdPugToHtml для создания страниц HTML, если разрешено конвертирование по шаблону. Отключить конвертирование по шаблону можно опцией `-n`. Вы можете изменить шаблон и снова запустить команду `npx md-pug-to-html /home/my/content`. Статьи будут переформатированы в соответствии в новым шаблоном. Если вы напортачили в шаблоне и у вас по каким-то причинам не конвертируются файлы, то удалите шаблон `mpth-template.pug` и перезапустите вышеприведенную команду. Файл шаблона будет создан в первоначальном виде.

### Продвинутый способ

Ниже приведена информация для конвертера MdPugToHtml CLI

```
Использование: md-pug-to-html [options] <dir>

Массово компилирует HTML-страницы из файлов Markdown с использованием шаблона Pug

Аргументы:
  dir                   каталог, из которого нужно получить файлы .md

Опции:
  -V, --version         выводит номер версии
  -n, --no-use          не использовать шаблон статьи
  -I, --no-index        не создавать файл index.html
  -o, --out [dir]       каталог сборки проекта (по умолчанию: "mpth")
  -t, --template [dir]  каталог шаблона статьи (по умолчанию: "mpth")
  -d, --data [dir]      каталог для файла данных (по умолчанию: "mpth")
  -h, --help            отображает эту справку
```

Ниже приведен пример, как можно использовать MdPugToHtml CLI с настраиваемыми опциями. Откройте терминал, создайте каталог, например, `my-site`, и перейдите в него:

```
mkdir my-site
cd my-site
```

Создайте файл `package.json`, для этого в терминале введите следующую команду:

```
npm init -y
```

Установите MdPugToHtml:

```
npm i -D md-pug-to-html
```

В корневом каталоге проекта создайте каталог, в котором вы хотите размещать статьи. Пусть это будет каталог `content`, а в нем создайте пару подкаталогов `article1` и `article2`. В каждом из них создайте файл `index.md`.

В файл `content/article1/index.md` скопируйте следующее:

```
---
title: Статья первая
description: Краткое описание первой статьи
create: 2022-08-10
---

## Заголовок h2 в первой статье
```

В файл `content/article2/index.md` скопируйте следующее:

```
---
title: Статья вторая
description: Краткое описание второй статьи
create: 2022-08-11
---

## Заголовок h2 во второй статье
```

Теперь, в корневом каталоге проекта создайте каталог `src`, а в нем каталог `article`, где вы можете создать файл `mpth-template.pug` со своим шаблоном. Либо если вы пропустите этот шаг, то MdPugToHtml создаст этот файл со следующим содержимым:

```pug
block variables

doctype html
html(lang= 'ru')
  head
    meta(charset= 'utf-8')
    meta(name= 'viewport' content= 'width=device-width, initial-scale=1')
    meta(name= 'description' content= data.description)
    link(rel='stylesheet' href='/index.css')
    script(defer src='/index.js')
    title= data.title

  body
    block main
      .content
        .article
          .creationDate= `Created: ${data.date}`
          != contentHtml
```

В файле `package.json` настройте MdPugToHtml с необходимыми опциями:

```json
"scripts": {
  "start": "md-pug-to-html content -o dist -t src/article -d src/data",
}
```

где :

- `content` - путь к каталогу, в котором находятся файлы markdown
- опция `-o ` задает путь к каталогу `dist`, в котором будет готовая сборка проекта
- опция `-t` задает путь к каталогу `src/article`, в котором будет шаблон Pug с именем `mpth-template.pug`
- опция `-d` задает путь к каталогу `src/data`, куда будет сгенерирован файл `mpth-data.pug`

Из корневого каталога проекта в терминале выполните команду:

```
npm run start
```

В итоге, MdPugToHtml сделает следующее:

- создаст каталог `dist` (если он отсутствовал)

- рекурсивно обойдет в каталоге `content` подкаталоги `article1` и `article2` и найдет в них файлы `index.md`.

- преобразует файлы `index.md` в страницы `index.html` в соответствии с шаблоном `src/article/mpth-template.pug` и поместит эти страницы в каталог `dist` с сохранением всей структуры подкаталогов каталога `content`, т. е. в каталоге `dist` будут созданы подкаталоги `article1` и `article2`.

  В файл `docs/article1/index.html` будет скомпилировано следующее:

  ```html
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Краткое описание первой статьи" />
      <title>Статья первая</title>
    </head>
    <body>
      <div class="content">
        <div class="article">
          <div class="creationDate">Создано: Aug 10 2022</div>
          <h2>Заголовок h2 в первой статье</h2>
        </div>
      </div>
    </body>
  </html>
  ```

  В файл `docs/article2/index.html` будет скомпилировано следующее:

  ```html
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Краткое описание второй статьи" />
      <title>Статья вторая</title>
    </head>
    <body>
      <div class="content">
        <div class="article">
          <div class="creationDate">Создано: Aug 11 2022</div>
          <h2>Заголовок h2 во второй статье</h2>
        </div>
      </div>
    </body>
  </html>
  ```

<a name="dataListItems"></a>

- MdPugToHtml сгенерирует файл `src/data/mpth-data.pug`, который будет содержать массив объектов `dataListItems`. Каждый объект массива имеет свойства:
  - `pathFile` - путь к файлу `index.html` статьи
  - `title` - заголовок статьи
  - `description` - краткое описание статьи
  - `date` - дата создания статьи
  - может содержать любые другие данные

Файл `src/data/mpth-data.pug` может быть использован для создания списка ссылок на статьи в формате блога. Ниже приведен пример того, как это может быть использовано.

Создайте шаблон страницы, где будет выводится список статей. Для этого в каталоге `src` создайте файл `list.pug`, а в него скопируйте следующее:

```pug
block variables

  include ./data/mpth-data.pug

doctype html
html(lang= 'ru')
  head
    meta(charset= 'utf-8')
    meta(name= 'viewport' content= 'width=device-width, initial-scale=1')

block main
  .content
    .creationDate= pageCreated
    ul.list__box
      each item in dataListItems
        li
          a.list__item(href=item.pathFile)= item.title
          p= item.description
```

В файле `package.json` добавьте строку помеченную знаком `+`:

```json
"scripts": {
  "start": "md-pug-to-html content -o dist -t src/article -d src/data",
+ "pug": "pug --pretty src/list.pug -o dist",
}
```

Установите `pug-cli`, для этого из корневого каталога проекта в терминале запустите следующую команду:

```
npm i -D pug-cli
```

После установки запустите `pug-cli`:

```
npm run pug
```

Будет создан файл `dist/list.html` следующего содержания:

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
</html>
<div class="content">
  <div class="creationDate"></div>
  <ul class="list__box">
    <li>
      <a class="list__item" href="article1/">Статья первая</a>
      <p>Краткое описание первой статьи</p>
    </li>
    <li>
      <a class="list__item" href="article2/">Статья вторая</a>
      <p>Краткое описание второй статьи</p>
    </li>
  </ul>
</div>
```

Если открыть данный файл в браузере, то вы увидите список ссылок на статьи с кратким описанием:

![список ссылок](readme/list-of-links-ru.png)

Кликнув по ссылке вы перейдете в выбранную статью.

## Использование API

```js
const mpth = require('md-pug-to-html');

const options = {
  sourceDir: 'content',
  templateDir: 'src/article',
  index: false,
};

// Инициализация
mpth.init(options);

// Список созданных страниц
const list = mpth.getDataList();
```

Используемые методы:

- `init()` запускает конвертер MdPugToHtml и создает все файлы, указанные в параграфе [Использование с помощью CLI](#использование-с-помощью-CLI).
- `getDataList()` возвращает массив <a href="#dataListItems">dataListItems</a>

В `options` можно указать:

- `sourceDir` - каталог со статьями Markdown (обязательно)
- `templateDir` - каталог с шаблоном для страниц статей (по умолчанию `templateDir: 'mpth'`)
- `destinationDir` - обычно, это каталог сборки проекта (по умолчанию `destinationDir: 'mpth'`)
- `dataOutDir` - каталог, где будет хранится файл `mpth-data.pug` (по умолчанию `dataOutDir: 'mpth',`)
- `index` - отключает генерацию файла `index.html` (по умолчанию `index: true`)
- `use` - запрещает использование шаблона для конвертирования статей (по умолчанию `use: true`)

Более подробно читайте в [Использование с помощью CLI](#использование-с-помощью-CLI).

<p align="right">(<a href="#readme-top">в начало</a>)</p>

## Используемые технологии

- [![gray-matter][gray-matter]][graymatter-url]
- [![markdown-it][markdown-it]][markdownit-url]
- [![Node.js][nodejs.org]][nodejs-url]
- [![Pug][pug.js]][pug-url]

<p align="right">(<a href="#readme-top">в начало</a>)</p>

<!-- ROADMAP -->

## Дальнейшее развитие

Полный список предлагаемых улучшений см. в [открытых Issues](https://github.com/injashkin/md-pug-to-html/issues).

<p align="right">(<a href="#readme-top">в начало</a>)</p>

<!-- CONTRIBUTING -->

## Участие в проекте

Вы можете оказать любую помощь проекту. Примите в нем участие или предложите улучшения открыв ишью. Будет ценен любой ваш вклад. Не забудьте добавить проекту звезду! Заранее спасибо!

Если у вас есть идея, которая сделает проект лучше, можете сделать форк репозитория и создать pull request:

1. Сделайте Fork проекта
2. Создайте свою ветку (git checkout -b injashkin/md-pug-to-html)
3. Внесите изменения в код
4. Зафиксируйте ваши изменения (git commit -m 'Добавлено то-то и то-то')
5. Сделайте Push ветки (git push origin injashkin/md-pug-to-html)
6. Сделайте Pull Request

<p align="right">(<a href="#readme-top">в начало</a>)</p>

## Контакты

Игорь Яшкин - injashkin@gmail.com - https://t.me/jashkin

Ссылка на проект: https://github.com/injashkin/md-pug-to-html

<!-- ACKNOWLEDGMENTS -->

## Благодарности

- [Данный README создан по шаблону Best-README-Template](https://github.com/othneildrew/Best-README-Template)

- [Проект от Джона Грубера (JOHN GRUBER) - создателя Markdown](https://daringfireball.net/projects/markdown/)

- [Интересный проект о Markdown](https://www.markdownguide.org)

## Дополнительно

Пакеты, которые могут быть полезны:

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

<p align="right">(<a href="#readme-top">в начало</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/injashkin/md-pug-to-html.svg?style=for-the-badge
[contributors-url]: https://github.com/injashkin/md-pug-to-html/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/injashkin/md-pug-to-html.svg?style=for-the-badge
[forks-url]: https://github.com/injashkin/md-pug-to-html/network/members
[stars-shield]: https://img.shields.io/github/stars/injashkin/md-pug-to-html.svg?style=for-the-badge
[stars-url]: https://github.com/injashkin/md-pug-to-html/stargazers
[issues-shield]: https://img.shields.io/github/issues/injashkin/md-pug-to-html.svg?style=for-the-badge
[issues-url]: https://github.com/injashkin/md-pug-to-html/issues
[license-shield]: https://img.shields.io/github/license/injashkin/md-pug-to-html.svg?style=for-the-badge
[license-url]: https://github.com/injashkin/md-pug-to-html/blob/main/LICENSE.txt
[nodejs.org]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=white
[nodejs-url]: https://nodejs.org/
[pug.js]: https://img.shields.io/badge/Pug-critical?style=for-the-badge&logo=pug&logoColor=white
[pug-url]: https://pugjs.org/
[gray-matter]: https://img.shields.io/badge/GrayMatter-35495E?style=for-the-badge&logo=markdown&logoColor=4FC08D
[graymatter-url]: https://www.npmjs.com/package/gray-matter
[markdown-it]: https://img.shields.io/badge/MarkdownIt-DD0031?style=for-the-badge&logo=markdown&logoColor=white
[markdownit-url]: https://www.npmjs.com/package/markdown-it
