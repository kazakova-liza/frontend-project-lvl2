
import genDiff from '../src';
import getFixturePath from './utils.js';
import { readFile } from '../src/utils.js';

describe.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('%p', (fileName1, fileName2) => {
  test.each([
    ['tree', 'tree.txt'],
    ['plain', 'plain.txt'],
    ['json', 'json.json'],
  ])('%p', (format, result) => {
    const path1 = getFixturePath(fileName1);
    const path2 = getFixturePath(fileName2);
    const pathToResult = getFixturePath(result);
    const expectedResult = readFile(pathToResult);
    const diff = genDiff(path1, path2, format);
    expect(diff).toEqual(expectedResult);
  });
});
