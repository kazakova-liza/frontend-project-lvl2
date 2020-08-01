
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import createDiff from './createDiff.js';
import render from './formatters/index.js';

const getDataFormat = (absolutePathToFile) => path.extname(absolutePathToFile).slice(1);

const genDiff = (pathToFile1, pathToFile2, format) => {
  const absolutePathToFile1 = path.resolve(pathToFile1);
  const absolutePathToFile2 = path.resolve(pathToFile2);

  const before = parse(readFileSync(absolutePathToFile1, 'utf-8'), getDataFormat(absolutePathToFile1));
  const after = parse(readFileSync(absolutePathToFile2, 'utf-8'), getDataFormat(absolutePathToFile2));

  const diff = createDiff(before, after);
  const result = render(diff, format);

  return result;
};

export default genDiff;
