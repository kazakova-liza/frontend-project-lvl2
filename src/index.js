
const path = require('path');

export const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);


export const genDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const areSame = keys2
    .filter((key) => keys2.includes(key) && before[key] === after[key]);

  const changed = keys2
    .filter((key) => keys2.includes(key)
  && keys1.includes(key) && before[key] !== after[key]);

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
    if (changed.includes(key)) {
      return {
        ...acc,
        [key]: {
          status: 'changed',
          oldValue: before[key],
          newValue: after[key],
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
    }
    if (added.includes(key)) {
      return {
        ...acc,
        [key]: {
          status: 'added',
          value: after[key],
        },
      };
    }
  }, {});

  return diff;
};

export const printDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const allKeys = keys1.concat(keys2);
  const allKeysFiltered = allKeys.filter((key, i) => allKeys.indexOf(key) === i);

  const diff = genDiff(before, after);

  const result = allKeysFiltered.reduce((acc, key) => {
    if (diff[key].status === 'same') {
      return `${acc}\n    ${key}: ${diff[key].value}`;
    }
    if (diff[key].status === 'changed') {
      return `${acc}\n  - ${key}: ${diff[key].oldValue}\n  + ${key}: ${diff[key].newValue}`;
    }
    if (diff[key].status === 'deleted') {
      return `${acc}\n  - ${key}: ${diff[key].value}`;
    }
    if (diff[key].status === 'added') {
      return `${acc}\n  + ${key}: ${diff[key].value}`;
    }
  }, '');

  return `{${result}\n}`;
};
