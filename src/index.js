
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

const printObj = (obj) => JSON.stringify(obj, null, '\t').replace(/"/g, '');

const getValue = (value) => {
  if (typeof value === 'object') {
    return printObj(value);
  }
  return value;
};

export const printDiff = (diff, depth = 0) => {
  const keys = Object.keys(diff);


  const result = keys.reduce((acc, key) => {
    const prefixIfSameOrNoStatus = `\n${' '.repeat(4)}${'    '.repeat(depth)}${key}: `;
    const prefixIfChangedDeletedAdded = `\n${' '.repeat(2)}${'    '.repeat(depth)}`;

    if (diff[key].status === 'same') {
      return `${acc}${prefixIfSameOrNoStatus}${getValue(diff[key].value)}`;
    }
    if (diff[key].status === 'changed') {
      return `${acc}${prefixIfChangedDeletedAdded}- ${key}: ${getValue(diff[key].oldValue)}${prefixIfChangedDeletedAdded}+ ${key}: ${getValue(diff[key].newValue)}`;
    }
    if (diff[key].status === 'deleted') {
      return `${acc}${prefixIfChangedDeletedAdded}- ${key}: ${getValue(diff[key].value)}`;
    }
    if (diff[key].status === 'added') {
      return `${acc}${prefixIfChangedDeletedAdded}+ ${key}: ${getValue(diff[key].value)}`;
    }
    return `${acc}${prefixIfSameOrNoStatus}${printDiff(diff[key], depth + 1)}`;
  }, '', 1);

  return `{${result}\n${'    '.repeat(depth)}}`;
};
