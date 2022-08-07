const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const mdToHtml = require('./md-to-pug');

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

function handleFileMd(pathFileOfSrc) {
  const pathDestFile = pathFileOfSrc.replace(sourceDir, destinationDir);
  const pathDestFileObj = path.parse(pathDestFile);
  const dirOut = path.parse(pathDestFile).dir;
  const dirUrl = dirOut.replace(`${destinationDir}${path.sep}`, '');

  mdToHtml.mkDir(dirOut);

  const relativeUrlCss = getRelativeUrl(dirUrl) + 'index.css';
  const relativeUrlJs = getRelativeUrl(dirUrl) + 'index.js';

  const fileContentsObj = splitFileContents(
    pathFileOfSrc,
    relativeUrlCss,
    relativeUrlJs
  );
  mdToHtml.compile(
    pathDestFileObj,
    templateDir,
    dirUrl,
    fileContentsObj,
    dataOutDir
  );
}

function handlerStatus(err, status) {
  const pathFileOrDir = `${this}`;
  if (err) throw err;

  if (status.isDirectory()) {
    const pathDirOfSrc = pathFileOrDir;
    listDir(pathDirOfSrc); // рекурсия
  } else {
    const pathFileOfSrc = pathFileOrDir;
    if (path.extname(pathFileOfSrc) === '.md') {
      handleFileMd(pathFileOfSrc);
    } else {
      /* Если файл не с расширением .md, то он копируется 
      из каталога источника в целевой каталог*/
      const pathDestFile = pathFileOrDir.replace(sourceDir, destinationDir);

      fs.copyFileSync(
        pathFileOfSrc,
        `${destinationDir}${path.sep}images${path.sep}${
          path.parse(pathDestFile).base
        }`
      );
    }
  }
}

function checkStatus(pathFileOrDir) {
  fs.stat(pathFileOrDir, handlerStatus.bind(pathFileOrDir));
}

function parse(filesAndDirs, pathDir) {
  for (let fileOrDir of filesAndDirs) {
    pathFileOrDir = `${pathDir}${path.sep}${fileOrDir}`;
    checkStatus(pathFileOrDir);
  }
}

function listDir(path) {
  fs.readdir(path, (err, filesAndDirs) => {
    if (err) throw err;
    parse(filesAndDirs, path);
  });
}

module.exports.separateMd = function (srcDir, destDir, templDir, dOutDir) {
  sourceDir = srcDir;
  destinationDir = destDir;
  templateDir = templDir;
  dataOutDir = dOutDir;

  mdToHtml.mkDir(`${destinationDir}${path.sep}images`);

  listDir(sourceDir);
};
