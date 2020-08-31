
import pkg from 'lodash';

const { has, union } = pkg;

const createDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  const uniqueKeys = union(keys1, keys2);

  const diff = uniqueKeys
    .map((key) => {
      if (!has(after, key)) {
        return {
          name: key,
          valueBefore: before[key],
          valueAfter: null,
          type: 'deleted',
        };
      }
      if (!has(before, key)) {
        return {
          name: key,
          valueBefore: null,
          valueAfter: after[key],
          type: 'added',
        };
      }
      if (typeof before[key] === 'object' && typeof after[key] === 'object') {
        return {
          name: key,
          type: 'has children',
          children: createDiff(before[key], after[key]),
        };
      }
      if (before[key] === after[key]) {
        return {
          name: key,
          valueBefore: before[key],
          valueAfter: after[key],
          type: 'same',
        };
      }
      return {
        name: key,
        valueBefore: before[key],
        valueAfter: after[key],
        type: 'changed',
      };
    });
  return diff;
};

export default createDiff;
