#!/usr/bin/env node

const mdToData = require('./md-to-data');
const program = require('commander');

const optionsCLI = {};

program
  .name('md-pug-to-html')
  .description(
    'Massively compiles HTML pages from Markdown files using a Pug template'
  )
  .version('2.0.0')
  .argument('<dir>', 'the directory from which to get the .md files')
  .option('-n, --no-use', 'do not use the article template')
  .option('-I, --no-index', 'do not generate an index.html file')
  .option('-o, --out [dir]', 'project build directory', 'mpth')
  .option('-t, --template [dir]', 'catalog of the article template', 'mpth')
  .option('-d, --data [dir]', 'the output directory of the data file', 'mpth')
  .action((dir, options) => {
    optionsCLI.sourceDir = dir;
    optionsCLI.use = options.use;
    optionsCLI.index = options.index;
    optionsCLI.destinationDir = options.out;
    optionsCLI.templateDir = options.template;
    optionsCLI.dataOutDir = options.data;
  });

program.parse();
mdToData.init(optionsCLI);
