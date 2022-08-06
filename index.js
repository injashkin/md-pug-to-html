#!/usr/bin/env node

//const mdPugToHtml = require('./index');

const mdToData = require('./md-to-data');

//function mdPugToHtml() {
const args = {};
let sourceDir, destinationDir, templateDir, dataOutDir;

process.argv.slice(2).forEach((option) => {
  var values = option.split('=');
  var key = values.shift();
  args[key] = (args[key] || []).concat(values);
});

if (args['-i']) {
  sourceDir = `${args['-i']}`; // из какого каталога нужно получить файлы .md
} else console.log('ОШИБКА: Не задан каталог источника с ключом -i=');

if (args['-o']) {
  destinationDir = `${args['-o']}`; // каталог сборки проекта
} else destinationDir = 'docs';

if (args['-t']) {
  templateDir = `${args['-t']}`; // каталог шаблона статьи
} else console.log('ОШИБКА: Не задан каталог шаблона статьи с ключом -o=');

if (args['-d']) {
  dataOutDir = `${args['-d']}`; // каталог вывода файла данных
} else dataOutDir = 'src/data';

mdToData.separateMd(sourceDir, destinationDir, templateDir, dataOutDir);
//}

//module.exports = { mdPugToHtml };
//mdPugToHtml();
