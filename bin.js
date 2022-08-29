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
  sourceDir = `${args['-i']}`; // the directory from which to get the .md files
} else console.log('ERROR: The source directory is not specified');

if (args['-o']) {
  destinationDir = `${args['-o']}`; // project build directory
} else destinationDir = 'docs';

if (args['-t']) {
  templateDir = `${args['-t']}`; // catalog of the article template
} else templateDir = 'src/article';

if (args['-d']) {
  dataOutDir = `${args['-d']}`; // the output directory of the data file
} else dataOutDir = 'src/data';

mdToData.separateMd(sourceDir, destinationDir, templateDir, dataOutDir);
