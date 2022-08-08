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

<h3 align="center">md-pug-to-html</h3>

  <p align="center">
    Compiles HTML pages from Markdown files based on the Pug template.
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
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>   
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#additionally">Additionally</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

MdPugToHtml uses the Pug template engine to convert Markdown files into HTML pages. These pages are saved in the specified target directory while preserving the full structure of the source directory. Markdown files may contain Frontmatter[1] data. This data will be used as metadata of HTML pages.

The need for MdPugToHtml appeared when creating the project builder [npm-for-frontend](https://github.com/injashkin/npm-for-frontend), but MdPugToHtml can be used independently.

[1] Markdown Frontmatter is a section marked with three hyphens `---` at the beginning of the markdown file, which has the YAML/YAML format. Here is an example of frontmatter markdown in YAML format:

```
---
title: A quick guide to Git commands
created: 2019-05-20
---

## Useful commands for working with Git and Github
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Node.js][nodejs.org]][nodejs-url]
- [![Pug][pug.js]][pug-url]
- [![gray-matter][gray-matter]][graymatter-url]
- [![markdown-to-pug][markdown-to-pug]][markdowntopug-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

```
npm i -D md-pug-to-html
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

In the `package.json` file, configure MdPugToHtml with the necessary parameters:

```json
"scripts": {
  "start": "md-pug-to-html -i=content -t=src/pages/article",
}
```

Parameter values are set using keys:

- key `-i` - path to the directory where the markdown files are located (required)
- key `-o` - path to the project's build directory (default `docs`)
- key `-t` - path to the article template directory (required)
- key `-d` - path to the directory where the `linkList.pug` file will be generated (default `src/data`)

In order for MdPugToHtml to work correctly, at least one markdown file must be present in the `content` directory (specified with the `-i` key) and the `index.pug` template must be present in the `src/pages/article` directory (specified with the `-t` key).

In the terminal, run the command:

```
npm run start
```

As a result, the following events will occur:

- MdPugToHtml will recursively crawl all subdirectories in the 'content` directory and find markdown files.
- MdPugToHtml converts markdown files to files `index.html ` according to the Png template `src/pages/article/index.pug`.
- MdPugToHtml will create a `docs` directory (if it was missing) and put files in it `index.html ` while preserving the entire structure of the subdirectories of the `content` directory.
- MdPugToHtml will generate a file `src/data/linkList.pug`, which will contain an array of objects called `points`. Each array object has properties:
  - `pathFile` - path to the file `index.html`
  - `title` - article title
  - `description` - brief description of the article

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Function 1
- [ ] Function 2
  - [ ] Nested Feature

See the [open issues](https://github.com/injashkin/md-pug-to-html/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

You can provide any assistance to the project. Take part in it or suggest improvements by opening issues. Any contribution you make will be appreciated. Don't forget to add a star to the project! Thank you in advance!

If you have an idea that will make the project better, you can fork the repository and create a pull request:

1. Fork the Project
2. Create your Feature Branch (git checkout -b injashkin/md-pug-to-html)
3. Make changes to the code
4. Commit your Changes (git commit -m 'Добавлено то-то и то-то')
5. Push to the Branch (git push origin injashkin/md-pug-to-html)
6. Open a Pull Request

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
[markdown-to-pug]: https://img.shields.io/badge/MarkdownToPug-DD0031?style=for-the-badge&logo=markdown&logoColor=white
[markdowntopug-url]: https://www.npmjs.com/package/markdown-to-pug
