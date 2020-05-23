
import { genDiff, readFile } from '../src';
import { getInputFixturePath, getOutputFixturePath } from './utils.js';

describe.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('%p', (fileName1, fileName2) => {
  test.each([
    ['tree', 'tree.ini'],
    ['plain', 'plain.ini'],
    ['json', 'json.json'],
  ])('%p', (format, result) => {
    const path1 = getInputFixturePath(fileName1);
    const path2 = getInputFixturePath(fileName2);
    const pathToResult = getOutputFixturePath(result);
    const expectedResult = readFile(pathToResult);
    const diff = genDiff(path1, path2, format);
    expect(diff).toEqual(expectedResult);
  });
});
