const mdToData = require('./md-to-data');

function mpth({
  sourceDir,
  destinationDir = 'docs',
  templateDir,
  dataOutDir = 'src/data',
}) {
  mdToData.separateMd(sourceDir, destinationDir, templateDir, dataOutDir);
}

module.exports = mpth;
