'use strict';

const fs = require('fs');
const mpth = require('../index');

fs.rmSync('test/in-out/dest', { recursive: true, force: true });

const options = {
  sourceDir: 'test/in-out/content',
  destinationDir: 'test/in-out/dest',
  templateDir: 'test/in-out/dest',
  dataOutDir: 'test/in-out/dest',
};

describe('init module', () => {
  describe('mpth-articles.html file with a list of articles', () => {
    test('If the index option is not specified, then by default it is true, which means a mpth-articles.html file is generated', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      mpth.init(options);
      const list = mpth.getDataList();
      expect(
        fs.existsSync(`${options.destinationDir}/mpth-articles.html`)
      ).toBe(true);
    });

    test('If the index option is set to false, then a mpth-articles.html is not generated', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      options.index = false;
      mpth.init(options);
      const list = mpth.getDataList();
      expect(
        fs.existsSync(`${options.destinationDir}/mpth-articles.html`)
      ).toBe(false);
    });

    test('Writing to the mpth-articles.html file is correct', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      options.index = true;
      mpth.init(options);
      expect(
        fs.readFileSync(`${options.destinationDir}/mpth-articles.html`, 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('mpth-data.pug data file', () => {
    test('Writing to the mpth-data.pug file is correct', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      mpth.init(options);
      expect(
        fs.readFileSync(`${options.dataOutDir}/mpth-data.pug`, 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('mpth-template.pug template file', () => {
    test('Writing to the mpth-template.pug file is correct', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      mpth.init(options);
      expect(
        fs.readFileSync(`${options.templateDir}/mpth-template.pug`, 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('Creating a description', () => {
    test('Description of the article does not exist, so it is created from the first paragraph', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      mpth.init(options);
      const lists = mpth.getDataList();
      expect(lists[2].description).toBe('Paragraph of the third article');
    });
  });
});

describe('getDataList module', () => {
  fs.rmSync(options.destinationDir, { recursive: true, force: true });
  mpth.init(options);
  const lists = mpth.getDataList();

  test('In the "list" array, the first object contains the "title" property with the content "Title of the first article"', () => {
    expect(lists[0].title).toBe('Title of the first article');
  });

  test('In the "list" array, the second object contains the "description" property with the content "Brief description of the second article"', () => {
    expect(lists[1].description).toBe(
      'Brief description of the second article'
    );
  });
});
