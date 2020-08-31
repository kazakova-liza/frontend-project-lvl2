import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src';

const dirname = path.resolve();

const getFixturePath = (filename) => path.join(dirname, '.', '__tests__', '__fixtures__', filename);

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

    const expectedResult = readFileSync(pathToResult, 'utf-8');
    const diff = genDiff(path1, path2, format);
    expect(diff).toEqual(expectedResult);
  });
});
