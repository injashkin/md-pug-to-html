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

Read in other languages: [Russian](README.ru.md)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/injashkin/md-pug-to-html">  
    <img src="https://avatars.githubusercontent.com/u/36812603?v=4" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">MdPugToHtml</h3>

  <p align="center">
    Massively converts Markdown files to HTML with the ability to apply Pug templates
    <br />
    <a href="https://github.com/injashkin/md-pug-to-html"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/injashkin/md-pug-to-html">View Demo</a>
    ·
    <a href="https://github.com/injashkin/md-pug-to-html/issues">Report Bug</a>
    ·
    <a href="https://github.com/injashkin/md-pug-to-html/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Installation](#installation)
- [Using CLI](#using-CLI)
  - [The easy way](#the-easy-way)
  - [Advanced way](#advanced-way)
- [Using API](#using-API)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)
- [Additionally](#additionally)

<!-- ABOUT THE PROJECT -->

## About The Project

MdPugToHtml massively converts Markdown files to HTML. You can specify a Pug template by which all Markdown pages will be converted to HTML. Also, MdPugToHtml generates an array of objects, which contains the following data for each created HTML page:

- path to the HTML page file
- HTML page title
- a brief description of the HTML page
- any other data that the user wishes to indicate in their Markdown articles in the Frontmatter section.

This array of objects can be obtained either using the API's `getDataList()` method, or, if the CLI is used, in the `mpth-data.pug` file, which looks something like this:

```pug
- const dataListItems = [
  {
    "pathFile":"article1/index.html",
    "title":"Title of the first article",
    "description":"Brief description of the first article",
    "date":"2022-08-09"
  },
  {
    "pathFile":"article2/index.html",
    "title":"Title of the second article",
    "description":"Brief description of the second article",
    "date":"2019-12-19"
  },
  ...
]
```

MdPugToHtml recursively traverses all subdirectories in the specified directory, finds Markdown files and converts them to HTML pages. At the same time, the Pug template can be used, according to which the pages will be transformed. The converted pages are then placed in the specified output directory. The structure of the source directory is completely preserved in the output directory.

Markdown files may contain Frontmatter data. Frontmatter is a section at the beginning of the file, highlighted on both sides with three hyphens `---`. Frontmatter can be written in any of the YAML/TOML/JSON formats. Here is an example of how the Frontmatter is written in the YAML format in the Markdown file:

```YAML
---
title: A quick guide to Git commands
create: 2019-05-20
---

## Useful commands for working with Git and Github
```

The need for the MdPugToHtml converter arose when creating a static page collector [npm-for-frontend](https://github.com/injashkin/npm-for-frontend), but MdPugToHtml can be used independently.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![gray-matter][gray-matter]][graymatter-url]
- [![markdown-it][markdown-it]][markdownit-url]
- [![Node.js][nodejs.org]][nodejs-url]
- [![Pug][pug.js]][pug-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

```
npm i -D md-pug-to-html
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Using CLI

### The easy way

This method allows you to easily convert the entire directory with Markdown files into HTML files. And, additionally, get an HTML file with a list of links to HTML files.

Open a terminal, create a directory, for example, `my-site`, and navigate to it:

```
mkdir my-site
cd my-site
```

Create a `package.json` file, to do this, enter the following command in the terminal:

```
npm init -y
```

Install MdPugToHtml:

```
npm i -D md-pug-to-html
```

In the `package.json` file, configure MdPugToHtml:

```json
"scripts": {
  "start": "md-pug-to-html /home/my/content",
}
```

Where `/home/my/content` is the path to the directory where the Markdown files are located.

Now run MdPugToHtml. To do this, run the command from the `my-site` directory in the terminal:

```
npm run start
```

As a result, the `mpth` directory will be created, in which you will find HTML pages converted from Markdown files.

Also, three files will be created:

- `mpth/index.html`, which contains a list of links to the created Html files. If you open this file in a browser, you can view the created pages from the browser by clicking on the links.

- `mpth/mpth-data.pug`, which contains an array of objects. This array can be used, for example, to create a list of links to articles in blog format. How to do this, see [Advanced way](#advanced-way).

- `mpth/mpth-template.pug`, which contains the Pu template. It is this template that uses the MdPugToHtml converter to create HTML pages, if template conversion is allowed. You can change the template and run the `npm run start` command again. The articles will be reformatted according to the new template.

### Advanced way

Below is the information for MdPugToHtml CLI

```
Usage: md-pug-to-html [options] <dir>

Massively compiles HTML pages from Markdown files using a Pug template

Arguments:
  dir                   the directory from which to get the .md files

Options:
  -V, --version         output the version number
  -n, --no-use          don't use the article template
  -o, --out [dir]       project build directory (default: "mpth")
  -t, --template [dir]  catalog of the article template (default: "mpth")
  -d, --data [dir]      the output directory of the data file (default: "mpth")
  -h, --help            display help for command

```

Below is an example of how you can use MdPugToHtml CLI with custom options. Open a terminal, create a directory, for example, `my-site`, and navigate to it:

```
mkdir my-site
cd my-site
```

Create a `package.json` file, to do this, enter the following command in the terminal:

```
npm init -y
```

Install MdPugToHtml:

```
npm i -D md-pug-to-html
```

In the root directory of the project, create a directory in which you want to post articles. Let it be the `content` directory, and in it create a couple of subdirectories `article1` and `article2`. In each of these two directories, create one file named `index.md `.

Copy the following to the `content/article1/index.md` file:

```
---
title: Article one
description: Brief description of the first article
create: 2022-08-10
---

## Title h2 in the first article
```

Copy the following to the `content/article2/index.md` file:

```
---
title: Article two
description: Brief description of the second article
create: 2022-08-11
---

## Title h2 in the second article
```

Now, in the root directory of the project, create the `src` directory, and in it the `article` directory, where you can create the `mpth-template.pug` file with its own template. Or if you skip this step, MdPugToHtml will create this file with the following contents:

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

In the `package.json` file, configure MdPugToHtml with the necessary options:

```json
"scripts": {
  "start": "md-pug-to-html content -o dist -t src/article -d src/data",
}
```

where :

- `content` - path to the directory where the markdown files are located
- option `-o` sets the path to the `dist` directory where the finished project build will be
- option `-t` sets the path to the directory `src/article`, which will have a Pug template named `mpth-template.pug`
- option `-d` sets the path to the directory `src/data`, where the file `mpth-data.pug` will be generated

From the root directory of the project in the terminal, run the command:

```
npm run start
```

As a result, MdPugToHtml will do the following:

- creates the `dist` directory (if it was missing)

- recursively traverses the subdirectories `article1` and `article2` in the `content` directory and finds files in them `index.md `.

- converts files `index.md ` to pages `index.html ` in accordance with the template `src/article/mpth-template.pug` and will place these pages in the `dist` directory while preserving the entire structure of the subdirectories of the `content` directory, i.e. the `article1` and `article2` subdirectories will be created in the `dist` directory.

To file `docs/article1/index.html` the following will be compiled:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Brief description of the first article" />
    <title>Article one</title>
  </head>
  <body>
    <div class="content">
      <div class="article">
        <div class="creationDate">Created: Aug 10 2022</div>
        <h2>Title h2 in the first article</h2>
      </div>
    </div>
  </body>
</html>
```

To file `docs/article2/index.html` the following will be compiled:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Brief description of the second article"
    />
    <title>Article two</title>
  </head>
  <body>
    <div class="content">
      <div class="article">
        <div class="creationDate">Created: Aug 11 2022</div>
        <h2>Title h2 in the second article</h2>
      </div>
    </div>
  </body>
</html>
```

- MdPugToHtml will generate a file `src/data/mpth-data.pug`, which will contain an array of objects called `dataListItems`. Each array object has properties:
  - `pathFile` - path to the file `index.html` articles
  - `title` - article title
  - `description` - brief description of the article
  - `date` - date of creation of the article
  - may contain any other data

The file `src/data/mpth-data.pug` can be used to create a list of links to articles in blog format. Below is an example of how this can be used.

Create a page template where a list of articles will be displayed. To do this, create a file `list.pug` in the `src` directory, and copy the following into it:

```pug
block variables

  include ./data/mpth-data.pug

doctype html
html(lang= 'en')
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

In `package.json` file, add a line marked with a `+`:

```json
"scripts": {
  "start": "md-pug-to-html content -o dist -t src/article -d src/data",
+ "pug": "pug --pretty src/list.pug -o dist",
}
```

Install `pug-cli`, to do this, run the following command from the root directory of the project in the terminal:

```
npm i -D pug-cle
```

After installation, run `pug-cli`:

```
npm run pug
```

A file will be created `dist/list.html ` the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
</html>
<div class="content">
  <div class="creationDate"></div>
  <ul class="list__box">
    <li>
      <a class="list__item" href="article1/">Article one</a>
      <p>Brief description of the first article</p>
    </li>
    <li>
      <a class="list__item" href="article2/">Article two</a>
      <p>Brief description of the second article</p>
    </li>
  </ul>
</div>
```

If you open this file in a browser, you will see a list of links to articles with a brief description:

![list of links](readme/list-of-links.png)

Clicking on the link will take you to the selected article.

## Using API

```js
const mpth = require('md-pug-to-html');

const options = {
  sourceDir: 'content',
  templateDir: 'src/article',
};

// Initialization
mpth.init(options);

// List of created pages
const list = mpth.getList();
```

In `options` you can specify:

- `sourceDir` - directory with Markdown articles (required)
- `templateDir` - directory with a template for article pages (by default, it will be generated)
- `destinationDir` - usually, this is the project's build directory (by default `destinationDir: 'mpth'`)
- `dataOutDir` - the directory where the `mpth-data.pug` file will be stored (by default `dataOutDir: 'mpth',`)

`init()` starts the MdPugToHtml converter and creates all the files specified in the paragraph [Using CLI](#using-CLI).

`getDataList()` returns an array of `dataListItems`

For more information, see [Using CLI](#using-CLI).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/injashkin/md-pug-to-html/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

You can make any contribution to the project. How to do this, read in [CONTRIBUTING](CONTRIBUTING.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Igor Jashkin - injashkin@gmail.com - https://t.me/jashkin

Project Link: https://github.com/injashkin/md-pug-to-html

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [This README is based on the Best-README-Template template](https://github.com/othneildrew/Best-README-Template)

- [A project from John Gruber, the creator of Markdown](https://daringfireball.net/projects/markdown/)

- [An interesting project about Markdown](https://www.markdownguide.org)

## Additionally

Packages that may be useful:

- [markdown-to-pug](https://www.npmjs.com/package/markdown-to-pug) - converts Markdown to Pug

- [markdown-front-matter-json](https://github.com/egavrilov/markdown-front-matter-json) - converts a Markdown containing a frontmatter to a JS object

- [markdown-it-front-matter](https://www.npmjs.com/package/markdown-it-front-matter)
- [markdown-it-container](https://github.com/markdown-it/markdown-it-container)

- [gray-matter](https://github.com/jonschlinkert/gray-matter) - converts Markdown containing frontmatter to YAML (by default), but also supports JSON, HTML or Coffee FrontMatter with the ability to set custom delimiters. Data can be received from a file and from a string.

- [article-data](https://www.npmjs.com/package/article-data) - converts a Markdown containing a frontmatter to an object
- [get-md-content](https://github.com/iamstarkov/get-md-content)
- [get-md-date](https://github.com/iamstarkov/get-md-date)
- [get-md-desc](https://github.com/iamstarkov/get-md-desc)
- [get-md-image](https://github.com/iamstarkov/get-md-image)
- [get-md-title](https://github.com/iamstarkov/get-md-title)

- [frontmatter-markdown-to-json](https://www.npmjs.com/package/frontmatter-markdown-to-json)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
