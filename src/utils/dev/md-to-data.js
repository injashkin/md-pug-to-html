const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const inputDirectory = process.argv[2]; // из какого каталога нужно всё прочитать
const outputDirectory = process.argv[3] || inputDirectory; // в какой каталог нужно всё поместить

function mkDir(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
}

function writeFile(path, content) {
  fs.writeFile(path, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function handleFileMd(filePath) {
  const allContentFileMd = splitFileContents(filePath);

  const pathOutFile = filePath.replace(inputDirectory, outputDirectory);

  const pathOutFileAsObj = path.parse(pathOutFile);
  const dirPathOut = pathOutFileAsObj.dir;
  const fileName = pathOutFileAsObj.name;

  const pathOfJsonFile = path.normalize(`${dirPathOut}/${fileName}.json`);

  mkDir(dirPathOut);
  writeFile(pathOutFile, allContentFileMd.content);
  writeFile(pathOfJsonFile, allContentFileMd.dataJsonString);
}

function handlerStatus(err, status) {
  const fileAndDirPath = `${this}`;
  if (err) throw err;

  if (status.isDirectory()) {
    const fileDir = fileAndDirPath;
    listDir(fileDir); // рекурсия
  } else {
    const filePath = fileAndDirPath;
    if (path.extname(filePath) === '.md') {
      handleFileMd(filePath);
    }
    // Здесь нужно добавить
    // если файл не '.md', то просто копируется в выходной каталог
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

function getContentFromFile(filePath) {
  return fs.readFileSync(filePath);
}

function separateDataJson(contentMixed) {
  return matter(contentMixed).data;
}

function separateContent(contentMixed) {
  return matter(contentMixed).content;
}

function splitFileContents(filePath) {
  const obj = {};
  obj.contentMixed = getContentFromFile(filePath);
  obj.content = separateContent(obj.contentMixed);
  obj.dataJsonObj = separateDataJson(obj.contentMixed);
  obj.dataJsonString = JSON.stringify(obj.dataJsonObj, null, 2);
  return obj;
}

listDir(inputDirectory);
