const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const specifiedPathOfSourceDirectory = process.argv[2]; // из какого каталога нужно всё прочитать
const specifiedPathOfDestinationDirectory =
  process.argv[3] || specifiedPathOfSourceDirectory; // в какой каталог нужно всё поместить

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

function replacePathOfSourceDirectoryToDestination(pathFileOfSource) {
  return pathFileOfSource.replace(
    specifiedPathOfSourceDirectory,
    specifiedPathOfDestinationDirectory
  );
}

function handleFileMd(pathFileOfSource) {
  const allContentFileMd = splitFileContents(pathFileOfSource);

  const pathDestinationFile =
    replacePathOfSourceDirectoryToDestination(pathFileOfSource);

  const pathDestinationFileAsObj = path.parse(pathDestinationFile);
  const dirPathOut = pathDestinationFileAsObj.dir;
  const fileName = pathDestinationFileAsObj.name;

  const pathOfJsonFile = path.normalize(`${dirPathOut}/${fileName}.json`);

  mkDir(dirPathOut);
  writeFile(pathDestinationFile, allContentFileMd.content);
  writeFile(pathOfJsonFile, allContentFileMd.dataJsonString);
}

function handlerStatus(err, status) {
  const pathFileOrDirectoryOfSource = `${this}`;
  if (err) throw err;

  if (status.isDirectory()) {
    const pathDirectoryOfSource = pathFileOrDirectoryOfSource;
    listDir(pathDirectoryOfSource); // рекурсия
  } else {
    const pathFileOfSource = pathFileOrDirectoryOfSource;
    if (path.extname(pathFileOfSource) === '.md') {
      handleFileMd(pathFileOfSource);
    } else {
      const pathDestinationFile = replacePathOfSourceDirectoryToDestination(
        pathFileOrDirectoryOfSource
      );
      const pathDestinationFileAsObj = path.parse(pathDestinationFile);
      const dirPathOut = pathDestinationFileAsObj.dir;
      mkDir(dirPathOut);
      fs.copyFileSync(pathFileOfSource, pathDestinationFile);
    }
  }
}

function checkStatus(pathFileOrDirectoryOfSource) {
  fs.stat(
    pathFileOrDirectoryOfSource,
    handlerStatus.bind(pathFileOrDirectoryOfSource)
  );
}

function parse(filesAndDirectories, path) {
  let pathD = '';

  for (let fileOrDirectory of filesAndDirectories) {
    pathFileOrDirectory = `${path}/${fileOrDirectory}`;
    checkStatus(pathFileOrDirectory);
  }
}

function listDir(path) {
  fs.readdir(path, (err, filesAndDirectories) => {
    if (err) throw err;
    parse(filesAndDirectories, path);
  });
}

function getContentFromFile(pathFileOfSource) {
  return fs.readFileSync(pathFileOfSource);
}

function separateDataJson(contentMixed) {
  return matter(contentMixed).data;
}

function separateContent(contentMixed) {
  return matter(contentMixed).content;
}

function splitFileContents(pathFileOfSource) {
  const obj = {};
  obj.contentMixed = getContentFromFile(pathFileOfSource);
  obj.content = separateContent(obj.contentMixed);
  obj.dataJsonObj = separateDataJson(obj.contentMixed);
  obj.dataJsonString = JSON.stringify(obj.dataJsonObj, null, 2);
  return obj;
}

listDir(specifiedPathOfSourceDirectory);
