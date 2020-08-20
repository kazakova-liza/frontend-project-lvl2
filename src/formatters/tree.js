
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

const makeTree = (diff) => {
  const iter = (innerDiff, depth) => {
    const space = `${'    '.repeat(depth)}`;
    const tree = innerDiff.flatMap((element) => {
      switch (element.status) {
        case 'same':
          return `${space}    ${element.name}: ${getTreeValue(element.valueBefore, depth + 1)}`;
        case 'changed':
          return `${space}  - ${element.name}: ${getTreeValue(element.valueBefore, depth)}\n${space}  + ${element.name}: ${getTreeValue(element.valueAfter, depth)}`;
        case 'deleted':
          return `${space}  - ${element.name}: ${getTreeValue(element.valueBefore, depth)}`;
        case 'added':
          return `${space}  + ${element.name}: ${getTreeValue(element.valueAfter, depth)}`;
        case undefined:
          return `${space}    ${element.name}: ${iter(element.children, depth + 1)}`;
        default:
          throw Error('Unexpected status:', element.status);
      }
    }, []);

    return `{\n${tree.join('\n')}\n${space}}`;
  };
  return iter(diff, 0);
};

export default makeTree;
