
const transformObjToString = (obj, depth) => {
  const keys = Object.keys(obj);
  const space = `\n${'    '.repeat(depth + 1)}`;
  const result = keys.map((key) => `${space}${key}: ${obj[key]}`);
  return `{${result}\n${'    '.repeat(depth)}}`;
};

const getTreeValue = (value, depth) => {
  if (typeof value === 'object') {
    return transformObjToString(value, depth + 1);
  }
  return value;
};

const makeTree = (diff, depth = 0) => {
  const space = `\n${'    '.repeat(depth)}`;

  const tree = diff.map((element) => {
    switch (element.status) {
      case 'same':
        return `${space}    ${element.name}: ${getTreeValue(element.valueBefore, depth + 1)}`;
      case 'changed':
        return `${space}  - ${element.name}: ${getTreeValue(element.valueBefore, depth)}${space}  + ${element.name}: ${getTreeValue(element.valueAfter, depth)}`;
      case 'deleted':
        return `${space}  - ${element.name}: ${getTreeValue(element.valueBefore, depth)}`;
      case 'added':
        return `${space}  + ${element.name}: ${getTreeValue(element.valueAfter, depth)}`;
      case undefined:
        return `${space}    ${element.name}: ${makeTree(element.children, depth + 1)}`;
      default:
        throw Error('Unexpected status:', element.status);
    }
  });

  return `{${tree.join('')}${space}}`;
};

export default makeTree;
