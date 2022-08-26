'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

const pug = require('pug');

const mdToPug = require('./md-to-pug');

const templatePug = `block variables

doctype html
html(lang= 'ru')
  head
    meta(charset= 'utf-8')
    meta(name= 'viewport' content= 'width=device-width, initial-scale=1')
    meta(name= 'description' content= description)
    title= title

  body
    block main
      .content
        .article
          .creationDate= \`Created: \${create}\`
          include from-md.pug`;

const options = {
  pretty: true,
};

exports.linkList = [];

function compileHtml(templateFile, data, options) {
  const compiledFunction = pug.compileFile(templateFile, options);
  return compiledFunction(data);
}

function splitFileContents(pathFileOfSrc, relativeUrlCss, relativeUrlJs) {
  const obj = {};
  const contentMixed = fs.readFileSync(pathFileOfSrc);

  obj.content = matter(contentMixed).content;
  obj.data = matter(contentMixed).data;
  obj.data.stylesheetHref = relativeUrlCss;
  obj.data.scriptSrc = relativeUrlJs;
  return obj;
}

function getRelativeUrl(dirUrl) {
  const num = dirUrl.split(path.sep).length;
  let str = '';
  for (let i = 0; i < num; i++) {
    str = str + '../';
  }
  return str;
}

exports.listDir = function (
  sourceDir,
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
        this.listDir(sourceDir, pathDirOfSrc, destinationDir, templateDir); // рекурсия
      } else {
        const pathFileOfSrc = pathFOD;
        const pathDestFile = pathFileOfSrc.replace(sourceDir, destinationDir);
        const pathDestFileObj = path.parse(pathDestFile);
        const dirOut = path.parse(pathDestFile).dir;
        const dirUrl = dirOut.replace(`${destinationDir}${path.sep}`, '');

        mdToPug.mkDir(dirOut);

        if (path.extname(pathFileOfSrc) === '.md') {
          const relativeUrlCss = getRelativeUrl(dirUrl) + 'index.css';
          const relativeUrlJs = getRelativeUrl(dirUrl) + 'index.js';

          const fileData = splitFileContents(
            pathFileOfSrc,
            relativeUrlCss,
            relativeUrlJs
          );

          this.addItemToLinkList(fileData, dirUrl);

          const htmlFromMd = md.render(fileData.content);

          mdToPug.mkDir(templateDir);
          mdToPug.writeFile(`${templateDir}${path.sep}from-md.pug`, htmlFromMd);

          const htmlFromPug = compileHtml(
            `${templateDir}${path.sep}index.pug`,
            fileData.data,
            options
          );

          mdToPug.writeFile(
            `${pathDestFileObj.dir}${path.sep}index.html`,
            htmlFromPug
          );
        } else {
          // Если файл не с расширением .md, то он просто копируется
          // в каталог статьи
          const pathDestFile = pathFOD.replace(sourceDir, destinationDir);
          fs.copyFileSync(pathFileOfSrc, pathDestFile);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.separateMd = function (srcDir, destDir, templDir, dOutDir) {
  const sourceDir = srcDir;
  const sourceDir2 = sourceDir;
  const destinationDir = destDir;
  const templateDir = templDir;
  const dataOutDir = dOutDir;

  if (!fs.existsSync(`${templateDir}${path.sep}index.pug`)) {
    mdToPug.mkDir(templateDir);

    mdToPug.writeFile(`${templateDir}${path.sep}index.pug`, templatePug);
  }

  mdToPug.mkDir(dataOutDir);

  this.listDir(sourceDir, sourceDir2, destinationDir, templateDir);

  mdToPug.writeFile(
    `${dataOutDir}${path.sep}link-list.pug`,
    `- const points = ${JSON.stringify(this.linkList)}`
  );
};

exports.addItemToLinkList = function (fileData, dirUrl) {
  const { data } = fileData;

  const obj = {
    pathFile: `${dirUrl}${path.sep}index.html`,
    title: data.title,
    description: data.description,
  };

  this.linkList.push(obj);
};

exports.init = function ({
  sourceDir,
  destinationDir = 'docs',
  templateDir = 'src/article',
  dataOutDir = 'src/data',
}) {
  this.separateMd(sourceDir, destinationDir, templateDir, dataOutDir);
};

exports.getList = function () {
  return this.linkList;
};
