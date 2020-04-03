/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */


import plain from './formatters/plain';
import tree from './formatters/tree';

const path = require('path');

export const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

export const genDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const areSame = keys2
    .filter((key) => keys2.includes(key) && before[key] === after[key]);

  const deleted = keys1
    .filter((key) => !keys2.includes(key));

  const added = keys2
    .filter((key) => !keys1.includes(key));

  const allKeys = keys1.concat(keys2);
  const allKeysFiltered = allKeys.filter((key, i) => allKeys.indexOf(key) === i);

  const diff = allKeysFiltered.reduce((acc, key) => {
    if (areSame.includes(key)) {
      return {
        ...acc,
        [key]: {
          status: 'same',
          value: after[key],
        },
      };
    }
    if (deleted.includes(key)) {
      return {
        ...acc,
        [key]: {
          status: 'deleted',
          value: before[key],
        },
      };
    } if (added.includes(key)) {
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
        [key]: genDiff(before[key], after[key]),
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

export const printObj = (obj) => JSON.stringify(obj, null, '      ').replace(/"/g, '');

export const getValue = (value, format) => {
  if (typeof value === 'object' && format === 'tree') {
    return printObj(value);
  }
  if (typeof value === 'object' && format === 'plain') {
    return '[complex value]';
  }
  return value;
};

export const printDiff = (diff, format = 'tree') => {
  if (format === 'tree') {
    return tree(diff, 0);
  }

  if (format === 'plain') {
    return plain(diff, 0, '');
  }
};
