#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
const mdToData = require('./index');
const program = require('commander');

let options = {};

program
  .name('md-pug-to-html')
  .description(
    'Massively converts Markdown to HTML with the ability to use Pug templates'
  )
  .version('2.0.0')
  .argument('[dir]', 'the directory from which to get the .md files')
  .option('-O, --obj <str|path>   JSON/JavaScript options object or file')
  .option('-n, --no-use', 'do not use the article template')
  .option('-I, --no-index', 'do not generate an index.html file')
  .option('-o, --out <dir>', 'project build directory', 'mpth')
  .option('-t, --template <dir>', 'catalog of the article template', 'mpth')
  .option('-d, --data <dir>', 'the output directory of the data file', 'mpth')
  .action((dir, opt) => {
    if (opt.obj) {
      options = parseObj(opt.obj);
    }

    options.sourceDir = options.sourceDir || dir;
    options.use = options.use || opt.use;
    options.index = options.index || opt.index;
    options.destinationDir = options.destinationDir || opt.out;
    options.templateDir = options.templateDir || opt.template;
    options.dataOutDir = options.dataOutDir || opt.data;
  });

program.parse();

// ==============================================
/**
 * Parse object either in `input` or in the file called `input`. The latter is
 * searched first.
 *
 * This function is taken from the
 * [Pug-cli](https://github.com/pugjs/pug-cli/blob/master/index.js) code
 */
function parseObj(input) {
  try {
    return require(path.resolve(input));
  } catch (e) {
    var str;
    try {
      str = fs.readFileSync(input, 'utf8');
    } catch (e) {
      str = input;
    }
    try {
      return JSON.parse(str);
    } catch (e) {
      return eval('(' + str + ')');
    }
  }
}
// =======================================================

mdToData.init(options);
