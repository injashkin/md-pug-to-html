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
    meta(name= 'description' content= data.description)
    link(rel='stylesheet' href='/index.css')
    script(defer src='/index.js')
    title= data.title

  body
    block main
      .content
        .article
          .creationDate= \`Created: \${data.date}\`
          != contentHtml`;

const options = {
  pretty: true,
};

exports.linkList = [];

function compileHtml(templateFile, data, options) {
  const compiledFunction = pug.compileFile(templateFile, options);
  return compiledFunction(data);
}

function splitFileContents(pathFileOfSrc) {
  const obj = {};
  const contentMixed = fs.readFileSync(pathFileOfSrc);

  obj.contentMd = matter(contentMixed).content;
  obj.contentHtml = '';
  obj.data = matter(contentMixed).data;
  return obj;
}

exports.listDir = function (
  sourceDir,
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
        this.listDir(sourceDir, use, pathDirOfSrc, destinationDir, templateDir); // recursion
      } else {
        const pathFileOfSrc = pathFOD;
        const pathDestFile = pathFileOfSrc.replace(sourceDir, destinationDir);
        const pathDestFileObj = path.parse(pathDestFile);
        const dirOut = path.parse(pathDestFile).dir;
        const dirUrl = dirOut.replace(`${destinationDir}${path.sep}`, '');

        mdToPug.mkDir(dirOut);

        if (path.extname(pathFileOfSrc) === '.md') {
          const fileData = splitFileContents(pathFileOfSrc);
          this.addItemToLinkList(fileData, dirUrl);
          fileData.contentHtml = md.render(fileData.contentMd);

          const htmlFromPug = use
            ? compileHtml(
                `${templateDir}${path.sep}mpth-template.pug`,
                fileData,
                options
              )
            : fileData.contentHtml;

          mdToPug.writeFile(
            `${pathDestFileObj.dir}${path.sep}index.html`,
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
  } catch (err) {
    console.log(err);
  }
};

exports.addItemToLinkList = function (fileData, dirUrl) {
  fileData.data.pathFile = `${dirUrl}${path.sep}`;
  this.linkList.push(fileData.data);
};

exports.init = function (opt) {
  const {
    sourceDir,
    use = true,
    destinationDir = 'mpth',
    templateDir = 'mpth',
    dataOutDir = 'mpth',
  } = opt;

  const sourceDir2 = sourceDir;

  if (!fs.existsSync(`${templateDir}${path.sep}mpth-template.pug`)) {
    mdToPug.mkDir(templateDir);

    mdToPug.writeFile(
      `${templateDir}${path.sep}mpth-template.pug`,
      templatePug
    );
  }

  mdToPug.mkDir(dataOutDir);

  this.listDir(sourceDir, use, sourceDir2, destinationDir, templateDir);

  mdToPug.writeFile(
    `${dataOutDir}${path.sep}mpth-data.pug`,
    `- const points = ${JSON.stringify(this.linkList)}`
  );
};

exports.getList = function () {
  return this.linkList;
};
