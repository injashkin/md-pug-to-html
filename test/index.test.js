'use strict';

const fs = require('fs');

const { init, getDataList } = require('../index');

const options = {
  sourceDir: 'test/in-out/content',
  destinationDir: 'test/in-out/dest',
  templateDir: 'test/in-out/dest',
  dataOutDir: 'test/in-out/dest',
};

beforeEach(() => {
  fs.rmSync(options.destinationDir, { recursive: true, force: true });
});

describe('init module', () => {
  test('No options', () => {
    expect(() => {
      expect(init());
    }).toThrow(
      'ERROR: The directory from which the .md files can be retrieved is not specified'
    );
  });

  test('sourceDir option', () => {
    options.sourceDir = undefined;
    expect(() => {
      expect(init(options));
    }).toThrow(
      'ERROR: The directory from which the .md files can be retrieved is not specified'
    );
    options.sourceDir = 'test/in-out/content';
  });

  test('destinationDir option', () => {
    const o = options.destinationDir;
    options.destinationDir = undefined;
    init(options);
    expect(fs.existsSync('mpth')).toBe(true);
    options.destinationDir = o;
  });

  describe('temlateDir option and mpth-template.pug file', () => {
    test('templateDir not specified, mpth-template.pug file in the mpth directory', () => {
      options.templateDir = undefined;
      init(options);
      expect(
        fs.readFileSync('mpth/mpth-template.pug', 'utf8')
      ).toMatchSnapshot();
      fs.rmSync('mpth', { recursive: true, force: true });
    });

    test('templateDir specified, mpth-template.pug file in the test/in-out/dest directory', () => {
      options.templateDir = 'test/in-out/dest';
      init(options);
      expect(
        fs.readFileSync('test/in-out/dest/mpth-template.pug', 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('dataOutDir option and mpth-data.pug file', () => {
    test('dataOutDir not specified, mpth-data.pug file in the mpth directory', () => {
      options.dataOutDir = undefined;
      init(options);
      expect(fs.existsSync('mpth/mpth-data.pug')).toBe(true);
      fs.rmSync('mpth', { recursive: true, force: true });
    });

    test('dataOutDir specified, mpth-data.pug file in the test/in-out/dest directory', () => {
      options.dataOutDir = 'test/in-out/dest';
      init(options);
      expect(
        fs.readFileSync('test/in-out/dest/mpth-data.pug', 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('use option', () => {
    test('use is specified false, the template is not used', () => {
      options.use = false;
      init(options);
      expect(
        fs.readFileSync(
          `${options.destinationDir}/article1/article1.html`,
          'utf8'
        )
      ).toMatchSnapshot();
    });

    test('use is specified true (by default), the template is used', () => {
      options.use = true;
      init(options);
      expect(
        fs.readFileSync(
          `${options.destinationDir}/article1/article1.html`,
          'utf8'
        )
      ).toMatchSnapshot();
    });
  });

  describe('index option and mpth-articles.html file', () => {
    test('index is specified false, the mpth-articles.html is not generated', () => {
      options.index = false;
      init(options);
      expect(
        fs.existsSync(`${options.destinationDir}/mpth-articles.html`)
      ).toBe(false);
    });

    test('index is specified true (by default), the mpth-articles.html is generated', () => {
      options.index = true;
      init(options);
      expect(
        fs.readFileSync(`${options.destinationDir}/mpth-articles.html`, 'utf8')
      ).toMatchSnapshot();
    });
  });

  describe('description property', () => {
    test('Description of the article does not exist, so it is created from the first paragraph', () => {
      init(options);
      const lists = getDataList();
      expect(lists[2].description).toBe('Paragraph of the third article');
    });
  });

  describe('Files not with the .md extension', () => {
    test('The no-md-file.txt file is copied to the dest/article1 directory', () => {
      init(options);
      expect(
        fs.existsSync(`${options.destinationDir}/article1/no-md-file.txt`)
      ).toBe(true);
    });
  });
});

describe('getDataList module', () => {
  test('In the "list" array, the first object contains the "title" property with the content "Title of the first article"', () => {
    init(options);
    const lists = getDataList();
    expect(lists).toMatchSnapshot();
  });
});
