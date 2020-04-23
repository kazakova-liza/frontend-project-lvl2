
import { genDiff, getFixturePath } from '../src';
import * as results from './__fixtures__/results.js';


const jsonCases = [
  ['tree', 'before.json', 'after.json', results.treeOutput],
  ['plain', 'before.json', 'after.json', results.plainOutput],
  ['json', 'before.json', 'after.json', results.jsonOutput],
];

describe('generate diff out of .json files', () => {
  test.each(jsonCases)('%p',
    (format, file1, file2, expectedResult) => {
      const path1 = getFixturePath(file1);
      const path2 = getFixturePath(file2);
      const result = genDiff(path1, path2, format);
      expect(result).toEqual(expectedResult);
    });
});

const iniCases = [
  ['tree', 'before.ini', 'after.ini', results.treeOutput],
  ['plain', 'before.ini', 'after.ini', results.plainOutput],
  ['json', 'before.ini', 'after.ini', results.jsonOutputForIni],
];

describe('generate diff out of .ini files', () => {
  test.each(iniCases)('%p',
    (format, file1, file2, expectedResult) => {
      const path1 = getFixturePath(file1);
      const path2 = getFixturePath(file2);
      const result = genDiff(path1, path2, format);
      expect(result).toEqual(expectedResult);
    });
});

const ymlCases = [
  ['tree', 'before.yml', 'after.yml', results.treeOutput],
  ['plain', 'before.yml', 'after.yml', results.plainOutput],
  ['json', 'before.yml', 'after.yml', results.jsonOutput],
];

describe('generate diff out of .yml files', () => {
  test.each(ymlCases)('%p',
    (format, file1, file2, expectedResult) => {
      const path1 = getFixturePath(file1);
      const path2 = getFixturePath(file2);
      const result = genDiff(path1, path2, format);
      expect(result).toEqual(expectedResult);
    });
});
