const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dirIn = process.argv[2]; // из какой папки нужно всё прочитать
const dirOut = process.argv[3] || dirIn;

//========================================
function mkDir(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
}

function handlerStatus(err, status) {
  const fileAndDirPath = `${this}`;
  if (err) throw err;

  if (status.isDirectory()) {
    const fileDir = fileAndDirPath;
    //console.log(`Папка: ${this}`);
    listDir(fileDir); // рекурсия
  } else {
    const filePath = fileAndDirPath;
    if (path.extname(filePath) === '.md') {
      console.log(`Файл: ${filePath}`);
      const contentMixed = getContentFromFile(filePath);
      const dataJson = separateDataJson(contentMixed);
      const content = separateContent(contentMixed);
    }
  }
}

function checkStatus(pathD) {
  fs.stat(pathD, handlerStatus.bind(pathD));
}

function parse(files, path) {
  let pathD = '';

  for (let file of files) {
    pathD = `${path}/${file}`;
    checkStatus(pathD);
  }
}

function handler(err, files) {
  if (err) throw err;
  parse(files, this);
}

function listDir(pathD) {
  fs.readdir(pathD, handler.bind(pathD));
}

//==========================================

function getFileName(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

function getContentFromFile(filePath) {
  return fs.readFileSync(filePath);
}

function separateDataJson(contentMixed) {
  return matter(contentMixed).data;
}

function separateContent(contentMixed) {
  return matter(contentMixed).content;
}

//console.log(`filePath: ${filePath}`);
listDir(dirIn);

/*
// Front-matter
let dataJsonString = JSON.stringify(dataJson, null, 2);

mkDir(dirOut);

let fileJson = `${dirOut}/${fileName}.json`;
let fileMd = `${dirOut}/${fileName}.md`;

fs.writeFile(fileJson, dataJsonString, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

fs.writeFile(fileMd, content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

//console.log(process.argv);

//console.log(matter.test(file));
//console.log(matter.stringify(file, data))
//const file2 = matter.read('example.md');
//console.log(file2);

//const data = fs.writeFileSync('example-content.md', file.content)
*/
