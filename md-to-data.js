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

const dataList = [];

function writeFile(path, content) {
  try {
    fs.writeFileSync(path, content);
  } catch (err) {
    console.error(err);
  }
}

function mkDir(dir) {
  try {
    if (!fs.existsSync(dir)) {
      return fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
}

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

function listDir(
  sourceDir,
  options,
  use,
  sourceDir2,
  destinationDir,
  templateDir
) {
  try {
    const filesAndDirs = fs.readdirSync(sourceDir2);

    for (let fileOrDir of filesAndDirs) {
      let pathFileOrDir = `${sourceDir2}${path.sep}${fileOrDir}`;

      const status = fs.statSync(pathFileOrDir);
      const pathFOD = pathFileOrDir;

      if (status.isDirectory()) {
        const pathDirOfSrc = pathFOD;
        listDir(
          sourceDir,
          options,
          use,
          pathDirOfSrc,
          destinationDir,
          templateDir
        ); // recursion
      } else {
        const pathFileOfSrc = pathFOD;
        const pathDestFile = pathFileOfSrc.replace(sourceDir, destinationDir);
        const pathDestFileObj = path.parse(pathDestFile);
        const dirOut = path.parse(pathDestFile).dir;
        const dirUrl = dirOut.replace(`${destinationDir}${path.sep}`, '');

        mkDir(dirOut);

        if (path.extname(pathFileOfSrc) === '.md') {
          const fileData = splitFileContents(pathFileOfSrc);

          fileData.dataFrontmatter.pathFile = `${dirUrl}${path.sep}`;

          const contentHtml = md.render(fileData.contentMd);

          if (!fileData.dataFrontmatter.description) {
            const numStart = contentHtml.search('<p>') + 3;
            const numEnd = contentHtml.search('</p>');
            fileData.dataFrontmatter.description = contentHtml.slice(
              numStart,
              numEnd
            );
          }

          dataList.push(fileData.dataFrontmatter);

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

          writeFile(`${pathDestFileObj.dir}${path.sep}index.html`, htmlFromPug);
        } else {
          // If the file is not with the extension .md, then it is simply copied
          // to the article catalog
          const pathDestFile = pathFOD.replace(sourceDir, destinationDir);
          fs.copyFileSync(pathFileOfSrc, pathDestFile);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

exports.getDataList = function () {
  return dataList;
};

const generateIndexFile = (dir, options) => {
  const templatePug = `ul   
  each item in items
    li
      a(href=\`\${item.pathFile}index.html\`)= item.title`;

  const func = pug.compile(templatePug, options);
  const listOfArticles = func({ items: this.getDataList() });
  writeFile(`${dir}${path.sep}index.html`, listOfArticles);
};

exports.init = function (options) {
  const {
    sourceDir,
    use = true,
    index = true,
    destinationDir = 'mpth',
    templateDir = 'mpth',
    dataOutDir = 'mpth',
  } = options;

  const sourceDir2 = sourceDir;
  if (options.pretty === undefined) options.pretty = true;

  if (!fs.existsSync(`${templateDir}${path.sep}mpth-template.pug`)) {
    mkDir(templateDir);

    writeFile(`${templateDir}${path.sep}mpth-template.pug`, templatePug);
  }

  mkDir(dataOutDir);

  listDir(sourceDir, options, use, sourceDir2, destinationDir, templateDir);

  writeFile(
    `${dataOutDir}${path.sep}mpth-data.pug`,
    `- const dataListItems = ${JSON.stringify(dataList)}`
  );

  if (index) {
    generateIndexFile(destinationDir, options);
  }
};
