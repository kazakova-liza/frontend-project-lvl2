
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
          status: 'deleted',
        };
      }
      if (!has(before, key)) {
        return {
          name: key,
          valueBefore: null,
          valueAfter: after[key],
          status: 'added',
        };
      }
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
    });
  return diff;
};

export default createDiff;
