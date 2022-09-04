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
    link(rel='stylesheet' href='/index.css')
    script(defer src='/index.js')
    title= title

  body
    block main
      .content
        .article
          .creationDate= \`Created: \${create}\`
          include mpth-tmp.html`;

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
          mdToPug.writeFile(
            `${templateDir}${path.sep}mpth-tmp.html`,
            htmlFromMd
          );

          const htmlFromPug = use
            ? compileHtml(
                `${templateDir}${path.sep}mpth-template.pug`,
                fileData.data,
                options
              )
            : htmlFromMd;

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
  const { data } = fileData;

  const obj = {
    pathFile: `${dirUrl}${path.sep}`,
    title: data.title,
    description: data.description,
  };

  this.linkList.push(obj);
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
