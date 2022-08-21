#!/usr/bin/env node

const mdToData = require('./md-to-data');

const args = {};
let sourceDir, destinationDir, templateDir, dataOutDir;

process.argv.slice(2).forEach((option) => {
  var values = option.split('=');
  var key = values.shift();
  args[key] = (args[key] || []).concat(values);
});

if (args['-i']) {
  sourceDir = `${args['-i']}`; // из какого каталога нужно получить файлы .md
} else console.log('ОШИБКА: Не задан каталог источника');

if (args['-o']) {
  destinationDir = `${args['-o']}`; // каталог сборки проекта
} else destinationDir = 'docs';

if (args['-t']) {
  templateDir = `${args['-t']}`; // каталог шаблона статьи
} else templateDir = 'src/article';

if (args['-d']) {
  dataOutDir = `${args['-d']}`; // каталог вывода файла данных
} else dataOutDir = 'src/data';

mdToData.separateMd(sourceDir, destinationDir, templateDir, dataOutDir);
