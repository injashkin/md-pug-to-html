#!/usr/bin/env node

const mdToData = require('./md-to-data');
const program = require('commander');

const obj = {};

program
  .name('md-pug-to-html')
  .description(
    'Massively compiles HTML pages from Markdown files using a Pug template'
  )
  .version('2.0.0')
  .argument('<dir>', 'the directory from which to get the .md files')
  .option('-n, --no-use', "don't use the article template")
  .option('-o, --out [dir]', 'project build directory', 'mpth')
  .option('-t, --template [dir]', 'catalog of the article template', 'mpth')
  .option('-d, --data [dir]', 'the output directory of the data file', 'mpth')
  .action((dir, options) => {
    obj.sourceDir = dir;
    obj.use = options.use;
    obj.destinationDir = options.out;
    obj.templateDir = options.template;
    obj.dataOutDir = options.data;
  });

program.parse();
mdToData.init(obj);
