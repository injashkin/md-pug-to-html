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

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/injashkin/md-pug-to-html">  
    <img src="https://avatars.githubusercontent.com/u/36812603?v=4" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">md-pug-to-html</h3>

  <p align="center">
    Компилирует HTML страницы из файлов Markdown с учетом Pug шаблона.
    <br />
    <a href="https://github.com/injashkin/md-pug-to-html"><strong>Изучите документацию »</strong></a>
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
<details>
  <summary>Содержание</summary>
  <ol>
    <li>
      <a href="#о-проекте">О проекте</a>
      <ul>
        <li><a href="#используемые-технологии">Используемые технологии</a></li>
      </ul>
    </li>
    <li>
      <a href="#быстрый-запуск">Быстрый запуск</a>
      <ul>
        <li><a href="#необходимые-компоненты">Необходимые компоненты</a></li>
        <li><a href="#установка">Установка</a></li>
      </ul>
    </li>
    <li><a href="#использование">Использование</a></li>
    <li><a href="#дальнейшее-развитие">Дальнейшее развитие</a></li>
    <li><a href="#участие-в-проекте">Участие в проекте</a></li>
    <li><a href="#лицензия">Лицензия</a></li>
    <li><a href="#контакты">Контакты</a></li>
    <li><a href="#благодарности">Благодарности</a></li>
    <li><a href="#дополнительно">Дополнительно</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## О проекте

Преобразует файлы Markdown, которые могут содержать данные Frontmatter, в файлы HTML, при этом учитывается разметка, заданная шаблонами Pug.
Утилита ищет все файлы с расширением `.md` в указанном (с помощью ключа `-i`) каталоге и всех его подкаталогах, отделяет Frontmatter от контента и на основе данных, полученных из Frontmatter, местоположения файлов `.md` и настроек в строке `"pug-md-to-html"` файла `package.json`, генерирует `html` файлы, которые являются готовыми страницами сайта. Список URL адресов к этим страницам, также генерируется автоматически и помещается в файл `link-list.pug` в виде массива объектов. Каждый объект массива содержит три свойства: название статьи, Url адрес и краткое описание. Используя этот массив можно с помощью цикла сгенерировать список ссылок для перехода к этим страницам. Поля из Frontmatter, такие как title, description, created и др. встраиваются в соответствующие места HTML страниц. Файлы, которые не являются `.md`, просто копируются из исходного каталога в каталог `docs/images`, так как, обычно, это файлы изображений.

Markdown Frontmatter - это выделенный тремя дефисами `---` раздел в начале файла markdown, который имеет формат YAML/TOML. Вот пример frontmatter markdown в формате YAML:

```
---
title: Краткий справочник по командам Git
created: 2019-05-20
---

## Полезные команды по работе с Git и Github
```

<p align="right">(<a href="#readme-top">в начало</a>)</p>

### Используемые технологии

- [![Node.js][nodejs.org]][nodejs-url]
- [![Pug][pug.js]][pug-url]
- [![gray-matter][gray-matter]][graymatter-url]
- [![markdown-to-pug][markdown-to-pug]][markdowntopug-url]

<p align="right">(<a href="#readme-top">в начало</a>)</p>

## Установка

```sh
npm i -D md-pug-to-html
```

<p align="right">(<a href="#readme-top">в начало</a>)</p>

<!-- USAGE EXAMPLES -->

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

<p align="right">(<a href="#readme-top">в начало</a>)</p>

<!-- ROADMAP -->

## Дальнейшее развитие

- [ ] Функция 1
- [ ] Функция 2
  - [ ] Nested Feature

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
[license-url]: https://github.com/injashkin/md-pug-to-html/blob/master/LICENSE.txt
[nodejs.org]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=white
[nodejs-url]: https://nodejs.org/
[pug.js]: https://img.shields.io/badge/Pug-critical?style=for-the-badge&logo=pug&logoColor=white
[pug-url]: https://pugjs.org/
[gray-matter]: https://img.shields.io/badge/GrayMatter-35495E?style=for-the-badge&logo=markdown&logoColor=4FC08D
[graymatter-url]: https://www.npmjs.com/package/gray-matter
[markdown-to-pug]: https://img.shields.io/badge/MarkdownToPug-DD0031?style=for-the-badge&logo=markdown&logoColor=white
[markdowntopug-url]: https://www.npmjs.com/package/markdown-to-pug
