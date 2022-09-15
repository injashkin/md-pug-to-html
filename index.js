'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const pug = require('pug');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const templatePug = `block variables

doctype html
html(lang= 'ru')
  head
    meta(charset= 'utf-8')
    meta(name= 'viewport' content= 'width=device-width, initial-scale=1')
    meta(name= 'description' content= description)
    link(rel='stylesheet' href='/index.css')
    script(defer src='/index.js')
    title= title

  body
    block main
      .content
        .article
          .creationDate= \`Created: \${create || date}\`
          != contentHtml`;

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

function listDir(options, sourceDir2, list) {
  const { use, sourceDir, templateDir, destinationDir } = options;

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
      const dirOut = path.parse(pathDestFile).dir;

      const dirUrl = dirOut.replace(destinationDir, '').slice(1);

      fs.mkdirSync(dirOut, { recursive: true });

      if (path.extname(pathFileOfSrc) === '.md') {
        const fileData = splitFileContents(pathFileOfSrc);

        fileData.dataFrontmatter.pathFile =
          dirUrl.length === 0 ? `${dirUrl}` : `${dirUrl}${path.sep}`;

        const contentHtml = md.render(fileData.contentMd);

        if (!fileData.dataFrontmatter.description) {
          const numStart = contentHtml.search('<p>') + 3;
          const numEnd = contentHtml.search('</p>');
          fileData.dataFrontmatter.description = contentHtml.slice(
            numStart,
            numEnd
          );
        }

        fileData.dataFrontmatter.nameFile = pathDestFileObj.name;

        list.push(fileData.dataFrontmatter);
        dataList = list;

        const mpthData = {};
        mpthData.contentHtml = contentHtml;

        for (let key in fileData.dataFrontmatter) {
          mpthData[key] = fileData.dataFrontmatter[key];
        }

        const htmlFromPug = use
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

const generateIndexFile = (options) => {
  const { destinationDir } = options;
  const templatePug = `ul   
  each item in items
    li
      a(href=\`\${item.pathFile}\${item.nameFile}.html\`)= item.title`;

  const func = pug.compile(templatePug, options);
  const listOfArticles = func({ items: this.getDataList() });

  fs.writeFileSync(
    `${destinationDir}${path.sep}mpth-articles.html`,
    listOfArticles
  );
};

exports.init = function (options = {}) {
  const {
    sourceDir,
    use = true,
    index = true,
    destinationDir = 'mpth',
    templateDir = 'mpth',
    dataOutDir = 'mpth',
  } = options;

  if (!sourceDir) {
    throw new Error(
      'ERROR: The directory from which the .md files can be retrieved is not specified'
    );
  }

  const sourceDir2 = sourceDir;
  options.destinationDir = destinationDir;
  options.templateDir = templateDir;
  options.use = use;
  options.index = index;

  if (options.pretty === undefined) options.pretty = true;

  if (!fs.existsSync(`${templateDir}${path.sep}mpth-template.pug`)) {
    fs.mkdirSync(templateDir, { recursive: true });

    fs.writeFileSync(`${templateDir}${path.sep}mpth-template.pug`, templatePug);
  }

  fs.mkdirSync(dataOutDir, { recursive: true });

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
