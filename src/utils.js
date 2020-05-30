import path from 'path';
import fs from 'fs';
import { has } from 'lodash';
import { plain } from './formatters/plain';
import tree from './formatters/tree';
import json from './formatters/json';

export const createDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const allKeys = keys1.concat(keys2);
  const diff = allKeys
    .filter((key, index) => allKeys.indexOf(key) === index)
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
