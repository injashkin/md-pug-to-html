const fs = require('fs');
const path = require('path');
const pug = require('pug');
let md2pug = new (require('markdown-to-pug'))();

let mdToHtml = require('./md-to-pug');

let fileListMd = [];

module.exports.writeFile = function (path, content) {
  try {
    fs.writeFileSync(path, content);
  } catch (err) {
    console.error(err);
  }
};

module.exports.mkDir = function (dir) {
  try {
    if (!fs.existsSync(dir)) {
      return fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
};

function compilePugFromMd(content) {
  return md2pug.render(content);
}

function compileHtml(templateFile, data, options) {
  const compiledFunction = pug.compileFile(templateFile, options);
  return compiledFunction(data);
}

const options = {
  pretty: true,
};

module.exports.compile = function (
  pathDestFileObj,
  templateDir,
  dirUrl,
  fileContentsObj,
  dataOutDir
) {
  const { content, data } = fileContentsObj;

  const obj = {
    pathFile: `${dirUrl}${path.sep}index.html`,
    title: data.title,
    description: data.description,
  };

  fileListMd.push(obj);
  mdToHtml.mkDir(dataOutDir);
  mdToHtml.writeFile(
    `${dataOutDir}${path.sep}link-list.pug`,
    `- const points = ${JSON.stringify(fileListMd)}`
  );

  const pugFromMd = compilePugFromMd(content);
  mdToHtml.mkDir(templateDir);
  mdToHtml.writeFile(`${templateDir}${path.sep}from-md.pug`, pugFromMd);

  const htmlFromPug = compileHtml(
    `${templateDir}${path.sep}index.pug`,
    data,
    options
  );

  mdToHtml.writeFile(
    `${pathDestFileObj.dir}${path.sep}index.html`,
    htmlFromPug
  );
};
