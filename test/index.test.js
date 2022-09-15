'use strict';

const fs = require('fs');

const { init, getDataList } = require('../index');

fs.rmSync('test/in-out/dest', { recursive: true, force: true });

const options = {
  sourceDir: 'test/in-out/content',
  destinationDir: 'test/in-out/dest',
  templateDir: 'test/in-out/dest',
  dataOutDir: 'test/in-out/dest',
};

describe('init module', () => {
  test('sourceDir option', () => {
    fs.rmSync(options.destinationDir, { recursive: true, force: true });
    options.sourceDir = undefined;
    expect(() => {
      expect(init(options));
    }).toThrow(
      'ERROR: The directory from which the .md files can be retrieved is not specified'
    );
    options.sourceDir = 'test/in-out/content';
  });

  test('destinationDir option', () => {
    fs.rmSync(options.destinationDir, { recursive: true, force: true });
    options.destinationDir = undefined;
    init(options);
    expect(fs.existsSync('mpth')).toBe(true);
    options.destinationDir = 'test/in-out/dest';
  });

  test('templateDir option', () => {
    fs.rmSync(options.destinationDir, { recursive: true, force: true });
    options.templateDir = undefined;
    init(options);
    expect(fs.existsSync('mpth/mpth-template.pug')).toBe(true);
    options.templateDir = 'test/in-out/dest';
  });

  test('dataOutDir option', () => {
    fs.rmSync(options.destinationDir, { recursive: true, force: true });
    options.dataOutDir = undefined;
    init(options);
    expect(fs.existsSync('mpth/mpth-data.pug')).toBe(true);
    options.dataOutDir = 'test/in-out/dest';
  });

  test('use option', () => {
    fs.rmSync(options.destinationDir, { recursive: true, force: true });
    options.use = false;
    init(options);
    expect(
      fs.readFileSync(
        `${options.destinationDir}/article1/article1.html`,
        'utf8'
      )
    ).toMatchSnapshot();
    options.use = true;
  });

  describe('mpth-articles.html file with a list of articles', () => {
    test('If the index option is not specified, then by default it is true, which means a mpth-articles.html file is generated', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      options.sourceDir = 'test/in-out/content';
      init(options);
      const list = getDataList();
      expect(
        fs.existsSync(`${options.destinationDir}/mpth-articles.html`)
      ).toBe(true);
    });

    test('If the index option is set to false, then a mpth-articles.html is not generated', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      options.index = false;
      init(options);
      const list = getDataList();
      expect(
        fs.existsSync(`${options.destinationDir}/mpth-articles.html`)
      ).toBe(false);
    });

    test('Writing to the mpth-articles.html file is correct', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      options.index = true;
      init(options);
      expect(
        fs.readFileSync(`${options.destinationDir}/mpth-articles.html`, 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('mpth-data.pug data file', () => {
    test('Writing to the mpth-data.pug file is correct', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      init(options);
      expect(
        fs.readFileSync(`${options.dataOutDir}/mpth-data.pug`, 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('mpth-template.pug template file', () => {
    test('Writing to the mpth-template.pug file is correct', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      init(options);
      expect(
        fs.readFileSync(`${options.templateDir}/mpth-template.pug`, 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('Creating a description', () => {
    test('Description of the article does not exist, so it is created from the first paragraph', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      init(options);
      const lists = getDataList();
      expect(lists[2].description).toBe('Paragraph of the third article');
    });
  });

  describe('Files not with the .md extension', () => {
    test('The no-md-file.txt file is copied to the dest/article1 directory', () => {
      fs.rmSync(options.destinationDir, { recursive: true, force: true });
      init(options);
      expect(
        fs.existsSync(`${options.destinationDir}/article1/no-md-file.txt`)
      ).toBe(true);
    });
  });
});

describe('getDataList module', () => {
  fs.rmSync(options.destinationDir, { recursive: true, force: true });
  init(options);
  const lists = getDataList();

  test('In the "list" array, the first object contains the "title" property with the content "Title of the first article"', () => {
    expect(lists[0].title).toBe('Title of the first article');
  });

  test('In the "list" array, the second object contains the "description" property with the content "Brief description of the second article"', () => {
    expect(lists[1].description).toBe(
      'Brief description of the second article'
    );
  });
});
