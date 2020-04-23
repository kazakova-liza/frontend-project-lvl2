
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import { plain } from './formatters/plain';
import tree from './formatters/tree';
import json from './formatters/json';


export const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', 'input_files', filename);

const createDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const allKeys = keys1.concat(keys2);
  const allKeysFiltered = allKeys.filter((key, i) => allKeys.indexOf(key) === i);

  const diff = allKeysFiltered.reduce((acc, key) => {
    if (before[key] === after[key]) {
      return {
        ...acc,
        [key]: {
          status: 'same',
          value: after[key],
        },
      };
    }
    if (!keys2.includes(key)) {
      return {
        ...acc,
        [key]: {
          status: 'deleted',
          value: before[key],
        },
      };
    } if (!keys1.includes(key)) {
      return {
        ...acc,
        [key]: {
          status: 'added',
          value: after[key],
        },
      };
    }
    if (typeof before[key] === 'object' && typeof after[key] === 'object') {
      return {
        ...acc,
        [key]: createDiff(before[key], after[key]),
      };
    }
    return {
      ...acc,
      [key]: {
        status: 'changed',
        oldValue: before[key],
        newValue: after[key],
      },
    };
  }, {});

  return diff;
};

const printDiff = (diff, format = 'tree') => {
  if (format === 'tree') {
    return tree(diff, 0);
  }
  if (format === 'plain') {
    return plain(diff, 0, '');
  }
  if (format === 'json') {
    return json(diff);
  }
};

const readFile = (pathToFile) => {
  const absolutePathToFile = path.resolve(pathToFile);
  const fileData = fs.readFileSync(absolutePathToFile, 'utf8');
  const fileFormat = path.extname(absolutePathToFile);

  return { data: fileData, format: fileFormat };
};


export const genDiff = (pathToFile1, pathToFile2, format) => {
  const before = parse(readFile(pathToFile1));
  const after = parse(readFile(pathToFile2));

  const diff = createDiff(before, after);
  const result = printDiff(diff, format);

  return result;
};
