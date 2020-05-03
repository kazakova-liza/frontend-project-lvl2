
import {
  genDiff, getInputFixturePath, getOutputFixturePath, readFile,
} from '../src';

describe.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('', (file1, file2) => {
  test.each([
    ['tree', 'tree.txt'],
    ['plain', 'plain.txt'],
    ['json', 'json.json'],
  ])('%p', (format, result) => {
    const path1 = getInputFixturePath(file1);
    const path2 = getInputFixturePath(file2);
    const pathToResult = getOutputFixturePath(result);
    const expectedResult = readFile(pathToResult).data;
    const diff = genDiff(path1, path2, format);
    expect(diff).toEqual(expectedResult);
  });
});
