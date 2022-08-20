'use strict';

const fs = require('fs');
const path = require('path');

exports.writeFile = function (path, content) {
  try {
    fs.writeFileSync(path, content);
  } catch (err) {
    console.error(err);
  }
};

exports.mkDir = function (dir) {
  try {
    if (!fs.existsSync(dir)) {
      return fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
};
