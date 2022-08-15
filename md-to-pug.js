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

module.exports.getLinkList = function (obj) {
  linkList.push(obj);
  return linkList;
};
