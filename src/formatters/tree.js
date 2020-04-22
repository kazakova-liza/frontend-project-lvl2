
import { getValue } from '..';

const tree = (diff, depth) => {
  const keys = Object.keys(diff);

  const result = keys.reduce((acc, key) => {
    const prefixIfSameOrNoStatus = `\n${' '.repeat(4)}${'    '.repeat(depth)}${key}: `;
    const prefixIfChangedDeletedAdded = `\n${' '.repeat(2)}${'    '.repeat(depth)}`;

    if (diff[key].status === 'same') {
      return `${acc}${prefixIfSameOrNoStatus}${getValue(diff[key].value, 'tree')}`;
    }
    if (diff[key].status === 'changed') {
      return `${acc}${prefixIfChangedDeletedAdded}- ${key}: ${getValue(diff[key].oldValue, 'tree')}${prefixIfChangedDeletedAdded}+ ${key}: ${getValue(diff[key].oldValue, 'tree')}`;
    }
    if (diff[key].status === 'deleted') {
      return `${acc}${prefixIfChangedDeletedAdded}- ${key}: ${getValue(diff[key].value, 'tree')}`;
    }
    if (diff[key].status === 'added') {
      return `${acc}${prefixIfChangedDeletedAdded}+ ${key}: ${getValue(diff[key].value, 'tree')}`;
    }
    return `${acc}${prefixIfSameOrNoStatus}${tree(diff[key], depth + 1)}`;
  }, '', 1);

  return `{${result}\n${'    '.repeat(depth)}}`;
};

export default tree;
