import path from 'path';
import fs from 'fs';
import { has } from 'lodash';
import { makePlain } from './formatters/plain';
import makeTree from './formatters/tree';
import makeJson from './formatters/json';

export const createDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const allKeys = keys1.concat(keys2);
  const diff = allKeys
    .reduce((unique, key) => (unique.includes(key) ? unique : [...unique, key]), [])
    .map((key) => {
      if (has(before, key) && !has(after, key)) {
        return {
          name: key,
          valueBefore: before[key],
          valueAfter: null,
          status: 'deleted',
        };
      }
      if (!has(before, key) && has(after, key)) {
        return {
          name: key,
          valueBefore: null,
          valueAfter: after[key],
          status: 'added',
        };
      }
      if (has(before, key) && has(after, key)) {
        if (typeof before[key] === 'object' && typeof after[key] === 'object') {
          return {
            name: key,
            children: createDiff(before[key], after[key]),
          };
        }
        if (before[key] === after[key]) {
          return {
            name: key,
            valueBefore: before[key],
            valueAfter: after[key],
            status: 'same',
          };
        }
        return {
          name: key,
          valueBefore: before[key],
          valueAfter: after[key],
          status: 'changed',
        };
      }
    });
  return diff;
};

export const transformDiffToFormat = (diff, format) => {
  if (format === 'tree') {
    return makeTree(diff);
  }
  if (format === 'plain') {
    return makePlain(diff);
  }
  return makeJson(diff);
};

export const getDataFormat = (absolutePathToFile) => path.extname(absolutePathToFile).slice(1);

export const readFile = (pathToFile) => {
  const absolutePathToFile = path.resolve(pathToFile);
  const fileData = fs.readFileSync(absolutePathToFile, 'utf8');

  return fileData;
};
