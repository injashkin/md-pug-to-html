'use strict';

const mpth = require('../index');

const options = {
  sourceDir: 'test/in-out/content',
  destinationDir: 'test/in-out/dest',
  templateDir: 'test/in-out/dest',
  dataOutDir: 'test/in-out/dest',
};

mpth.init(options);
const list = mpth.getDataList();

describe('getDataList module', () => {
  test('In the "list" array, the first object contains the "title" property with the content "Title of the first article"', () => {
    expect(list[0].title).toBe('Title of the first article');
  });

  test('In the "list" array, the second object contains the "description" property with the content "Brief description of the second article"', () => {
    expect(list[1].description).toBe('Brief description of the second article');
  });
});
