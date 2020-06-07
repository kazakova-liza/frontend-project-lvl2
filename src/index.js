
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import {
  createDiff, getDataFormat,
} from './utils.js';
import { makePlain } from './formatters/plain';
import makeTree from './formatters/tree';
import makeJson from './formatters/json';

const transformDiffToFormat = (diff, format) => {
  if (format === 'tree') {
    return makeTree(diff);
  }
  if (format === 'plain') {
    return makePlain(diff);
  }
  return makeJson(diff);
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const absolutePathToFile1 = path.resolve(pathToFile1);
  const absolutePathToFile2 = path.resolve(pathToFile2);

  const before = parse(readFileSync(absolutePathToFile1, 'utf-8'), getDataFormat(absolutePathToFile1));
  const after = parse(readFileSync(absolutePathToFile2, 'utf-8'), getDataFormat(absolutePathToFile2));

  const diff = createDiff(before, after);
  const result = transformDiffToFormat(diff, format);

  return result;
};

export default genDiff;
