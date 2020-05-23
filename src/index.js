
import path from 'path';
import fs from 'fs';
import has from 'lodash';
import parse from './parsers.js';
import { plain } from './formatters/plain';
import tree from './formatters/tree';
import json from './formatters/json';

const getStatus = (valueBefore, valueAfter) => {
  if (valueBefore !== null && valueAfter !== null) {
    if (valueBefore === valueAfter) {
      return 'same';
    }
    return 'changed';
  }
  if (valueBefore !== null && valueAfter === null) {
    return 'deleted';
  }
  return 'added';
};

const getBeforeValue = (before, key) => (has(before, key) && before[key] ? before[key] : null);
const getAfterValue = (after, key) => (has(after, key) && after[key] ? after[key] : null);

const createDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const allKeys = keys1.concat(keys2);
  const diff = allKeys
    .filter((key, index) => allKeys.indexOf(key) === index)
    .map((key) => {
      if (has(before, key) && has(after, key)
                        && typeof before[key] === 'object'
                        && typeof after[key] === 'object') {
        return {
          name: key,
          children: createDiff(before[key], after[key]),
        };
      }

      const valueBefore = getBeforeValue(before, key);
      const valueAfter = getAfterValue(after, key);
      const status = getStatus(valueBefore, valueAfter);

      return {
        name: key,
        valueBefore,
        valueAfter,
        status,
      };
    });

  return diff;
};

const transformDiffToFormat = (diff, format) => {
  if (format === 'tree') {
    return tree(diff);
  }
  if (format === 'plain') {
    return plain(diff);
  }
  return json(diff);
};

export const getDataFormat = (absolutePathToFile) => path.extname(absolutePathToFile).slice(1);

export const readFile = (pathToFile) => {
  const absolutePathToFile = path.resolve(pathToFile);
  const fileData = fs.readFileSync(absolutePathToFile, 'utf8');

  return fileData;
};

export const genDiff = (pathToFile1, pathToFile2, format) => {
  const before = parse(readFile(pathToFile1), getDataFormat(pathToFile1));
  const after = parse(readFile(pathToFile2), getDataFormat(pathToFile2));

  const diff = createDiff(before, after);
  const result = transformDiffToFormat(diff, format);

  return result;
};
