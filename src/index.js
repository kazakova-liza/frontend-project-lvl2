
const path = require('path');

export const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

export const genDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const areSame = keys2
    .filter((key) => keys2.includes(key) && before[key] === after[key])
    .reduce((acc, key) => `${acc}\n    ${key}: ${before[key]}`, '');

  const changed = keys2
    .filter((key) => keys2.includes(key)
    && keys1.includes(key) && before[key] !== after[key])
    .reduce((acc, key) => `${acc}\n  - ${key}: ${before[key]}\n  + ${key}: ${after[key]}`, '');

  const deleted = keys1
    .filter((key) => !keys2.includes(key))
    .reduce((acc, key) => `${acc}\n  - ${key}: ${before[key]}`, '');

  const added = keys2
    .filter((key) => !keys1.includes(key))
    .reduce((acc, key) => `${acc}\n  + ${key}: ${after[key]}`, '');

  const result = `{${areSame}${changed}${deleted}${added}\n}`;
  return result;
};
