const mdToData = require('./md-to-data');
const mdToPug = require('./md-to-pug');

function mpth({
  sourceDir,
  destinationDir = 'docs',
  templateDir,
  dataOutDir = 'src/data',
}) {
  mdToData.separateMd(sourceDir, destinationDir, templateDir, dataOutDir);
}

module.exports = mpth;
//mpth.linkList = mdToPug.getLinkList();
