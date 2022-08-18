const fs = require('fs');
const path = require('path');
const pug = require('pug');

let linkList = [];

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

module.exports.addItemToLinkList = function (fileData, dirUrl) {
  const { data } = fileData;

  const obj = {
    pathFile: `${dirUrl}${path.sep}index.html`,
    title: data.title,
    description: data.description,
  };

  linkList.push(obj);
  return linkList;
};
