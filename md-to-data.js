'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
let md2pug = new (require('markdown-to-pug'))();
const pug = require('pug');

const mdToPug = require('./md-to-pug');

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
        if (path.extname(pathFileOfSrc) === '.md') {
          const pathDestFile = pathFileOfSrc.replace(sourceDir, destinationDir);
          const pathDestFileObj = path.parse(pathDestFile);
          const dirOut = path.parse(pathDestFile).dir;
          const dirUrl = dirOut.replace(`${destinationDir}${path.sep}`, '');

          mdToPug.mkDir(dirOut);

          const relativeUrlCss = getRelativeUrl(dirUrl) + 'index.css';
          const relativeUrlJs = getRelativeUrl(dirUrl) + 'index.js';

          const fileData = splitFileContents(
            pathFileOfSrc,
            relativeUrlCss,
            relativeUrlJs
          );

          this.addItemToLinkList(fileData, dirUrl);

          const pugFromMd = md2pug.render(fileData.content);

          mdToPug.mkDir(templateDir);
          mdToPug.writeFile(`${templateDir}${path.sep}from-md.pug`, pugFromMd);

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
          // Если файл не с расширением .md, то он копируется
          // из каталога источника в целевой каталог
          const pathDestFile = pathFOD.replace(sourceDir, destinationDir);

          fs.copyFileSync(
            pathFileOfSrc,
            `${destinationDir}${path.sep}images${path.sep}${
              path.parse(pathDestFile).base
            }`
          );
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

  mdToPug.mkDir(`${destinationDir}${path.sep}images`);
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
  templateDir,
  dataOutDir = 'src/data',
}) {
  this.separateMd(sourceDir, destinationDir, templateDir, dataOutDir);
};

exports.getList = function () {
  return this.linkList;
};
