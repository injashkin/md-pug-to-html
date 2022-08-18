const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
let md2pug = new (require('markdown-to-pug'))();
const pug = require('pug');

const mdToPug = require('./md-to-pug');

const options = {
  pretty: true,
};

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

function listDir(pathDir) {
  fs.readdir(pathDir, function (err, filesAndDirs) {
    if (err) throw err;

    for (let fileOrDir of filesAndDirs) {
      let pathFileOrDir = `${pathDir}${path.sep}${fileOrDir}`;
      fs.stat(pathFileOrDir, function (err, status) {
        const pathFOD = pathFileOrDir;
        if (err) throw err;

        if (status.isDirectory()) {
          const pathDirOfSrc = pathFOD;
          listDir(pathDirOfSrc); // рекурсия
        } else {
          const pathFileOfSrc = pathFOD;
          if (path.extname(pathFileOfSrc) === '.md') {
            const pathDestFile = pathFileOfSrc.replace(
              sourceDir,
              destinationDir
            );
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

            const linkList = mdToPug.addItemToLinkList(fileData, dirUrl);

            mdToPug.mkDir(dataOutDir);

            // Данный набор команд можно выполнить один раз
            // после заполнения массива
            // --------------
            mdToPug.writeFile(
              `${dataOutDir}${path.sep}link-list.pug`,
              `- const points = ${JSON.stringify(linkList)}`
            );
            // --------------

            const { content } = fileData;

            const pugFromMd = md2pug.render(content);
            mdToPug.mkDir(templateDir);
            mdToPug.writeFile(
              `${templateDir}${path.sep}from-md.pug`,
              pugFromMd
            );

            const { data } = fileData;

            const htmlFromPug = compileHtml(
              `${templateDir}${path.sep}index.pug`,
              data,
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
      });
    }
  });
}

module.exports.separateMd = function (srcDir, destDir, templDir, dOutDir) {
  sourceDir = srcDir;
  destinationDir = destDir;
  templateDir = templDir;
  dataOutDir = dOutDir;

  mdToPug.mkDir(`${destinationDir}${path.sep}images`);

  listDir(sourceDir);
};
