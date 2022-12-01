'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const pug = require('pug');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

function getTemplatePug(level) {
  return `block variables

  doctype html
  html(lang= 'ru')
    head
      meta(charset= 'utf-8')
      meta(name= 'viewport' content= 'width=device-width, initial-scale=1')
      meta(name= 'description' content= description)
      link(rel='stylesheet' href=urlCss)
      script(defer src=urlJs)
      title= title

    body
      block main
        .content
          .article
            .creationDate= \`Created: \${create || date}\`
            != contentHtml`;
}

/**
 * Создает файл со списком ссылок на статьи
 * @param {*} options
 */
const generateIndexFile = (options) => {
  const { destinationDir, styles } = options;
  const templatePug = `block variables

  doctype html
  html(lang= 'ru')
    head
      meta(charset= 'utf-8')
      meta(name= 'viewport' content= 'width=device-width, initial-scale=1')
      meta(name= 'description' content= description)
      link(rel='stylesheet' href='${styles}.css')
      script(defer src='index.js')
      title= title

    body
      block main
        ul   
          each item in items
            li
              a(href=\`\${item.pathFile}\index.html\`)= item.title`;

  const func = pug.compile(templatePug, options);
  const listOfArticles = func({ items: this.getDataList() });

  fs.writeFileSync(
    `${destinationDir}${path.sep}mpth-articles.html`,
    listOfArticles
  );
};

let dataList = [];

function compileHtml(templateFile, data2, options) {
  const compiledFunction = pug.compileFile(templateFile, options);
  return compiledFunction(data2);
}

function splitFileContents(pathFileOfSrc) {
  const obj = {};
  const fileContents = fs.readFileSync(pathFileOfSrc);
  obj.contentMd = matter(fileContents).content;
  obj.dataFrontmatter = matter(fileContents).data;
  return obj;
}

/**
 * Получает URL и возвращает уровень вложенности от корня
 * в виде строки "../../../" или "..\\..\\..\\" в
 * зависимости от системы
 * @param {*} url Путь к файлу без его имени
 * @returns Строка вида "../../" или "..\\..\\"
 */
function getNestingFromRoot(url) {
  const arr = url.split(path.sep);
  const lengthArr = arr.length;
  return `..${path.sep}`.repeat(lengthArr);
}

function listDir(options, sourceDir2, list) {
  const { useTemplate, sourceDir, templateDir, destinationDir, styles } =
    options;
  const filesAndDirs = fs.readdirSync(sourceDir2);

  for (let fileOrDir of filesAndDirs) {
    let pathFileOrDir = `${sourceDir2}${path.sep}${fileOrDir}`;

    const status = fs.statSync(pathFileOrDir);
    const pathFOD = pathFileOrDir;

    if (status.isDirectory()) {
      const pathDirOfSrc = pathFOD;
      listDir(options, pathDirOfSrc, list); // recursion
    } else {
      const pathFileOfSrc = pathFOD;

      const pathDestFile = pathFileOfSrc.replace(sourceDir, destinationDir);

      const pathDestFileObj = path.parse(pathDestFile);

      if (pathDestFileObj.name !== 'index' && pathDestFileObj.ext === '.md') {
        pathDestFileObj.dir = `${pathDestFileObj.dir}${path.sep}${pathDestFileObj.name}`;

        fs.mkdirSync(`${pathDestFileObj.dir}`, { recursive: true });
        pathDestFileObj.name = 'index';
      }

      const dirOut = pathDestFileObj.dir;

      const dirUrl = dirOut.replace(destinationDir, '').slice(1);

      fs.mkdirSync(dirOut, { recursive: true });

      if (path.extname(pathFileOfSrc) === '.md') {
        const fileData = splitFileContents(pathFileOfSrc);
        fileData.dataFrontmatter.pathFile =
          dirUrl.length === 0 ? '' : `${dirUrl}${path.sep}`;

        const level = getNestingFromRoot(dirUrl);
        fileData.dataFrontmatter.urlCss = `${level}${styles}.css`;
        fileData.dataFrontmatter.urlJs = `${level}index.js`;

        const contentHtml = md.render(fileData.contentMd);

        if (!fileData.dataFrontmatter.description) {
          const numStart = contentHtml.search('<p>') + 3;
          const numEnd = contentHtml.search('</p>');
          fileData.dataFrontmatter.description = contentHtml.slice(
            numStart,
            numEnd
          );
        }

        list.push(fileData.dataFrontmatter);

        dataList = list;

        const mpthData = {};
        mpthData.contentHtml = contentHtml;

        for (let key in fileData.dataFrontmatter) {
          mpthData[key] = fileData.dataFrontmatter[key];
        }

        const htmlFromPug = useTemplate
          ? compileHtml(
              `${templateDir}${path.sep}mpth-template.pug`,
              mpthData,
              options
            )
          : contentHtml;

        fs.writeFileSync(
          `${pathDestFileObj.dir}${path.sep}${pathDestFileObj.name}.html`,
          htmlFromPug
        );
      } else {
        // If the file is not with the extension .md, then it is simply copied
        // to the article catalog
        const pathDestFile = pathFOD.replace(sourceDir, destinationDir);
        fs.copyFileSync(pathFileOfSrc, pathDestFile);
      }
    }
  }
}

exports.getDataList = function () {
  return dataList;
};

exports.init = function (options = {}) {
  const {
    sourceDir,
    use = true,
    index = true,
    destinationDir = 'mpth',
    templateDir = 'mpth',
    dataOutDir = 'mpth',
    styles = 'github',
  } = options;

  if (!sourceDir) {
    throw new Error(
      'ERROR: The directory from which the .md files can be retrieved is not specified'
    );
  }

  const sourceDir2 = sourceDir;
  options.destinationDir = destinationDir;
  options.templateDir = templateDir;
  options.useTemplate = use;
  options.index = index;
  options.styles = styles;

  fs.mkdirSync(destinationDir, { recursive: true });

  if (options.file) if (options.pretty === undefined) options.pretty = true;

  if (!fs.existsSync(`${templateDir}${path.sep}mpth-template.pug`)) {
    fs.mkdirSync(templateDir, { recursive: true });

    fs.writeFileSync(
      `${templateDir}${path.sep}mpth-template.pug`,
      getTemplatePug('..')
    );
  }

  fs.mkdirSync(dataOutDir, { recursive: true });

  fs.copyFileSync(
    `${__dirname}${path.sep}${styles}.css`,
    `${destinationDir}${path.sep}${styles}.css`
  );

  const list = [];

  listDir(options, sourceDir2, list);

  fs.writeFileSync(
    `${dataOutDir}${path.sep}mpth-data.pug`,
    `- const dataListItems = ${JSON.stringify(dataList)}`
  );

  if (index) {
    generateIndexFile(options);
  }
};
