const printObj = (obj, depth) => JSON.stringify(obj, null, '      '.repeat(depth)).replace(/"/g, '');

const getTreeValue = (value, depth) => {
  if (typeof value === 'object') {
    return printObj(value, depth);
  }
  return value;
};

const getPrefix = (element, depth) => {
  if (element.status === 'same') {
    return `\n${' '.repeat(4)}${'    '.repeat(depth)}${element.name}: `;
  }
  if (element.status === 'changed' || element.status === 'deleted' || element.status === 'added') {
    return `\n${' '.repeat(2)}${'    '.repeat(depth)}`;
  }
  return `\n${' '.repeat(4)}${'    '.repeat(depth)}${element.name}: `;
};

const tree = (diff, depth = 0) => {
  console.log(diff);
  const result = diff.map((element) => {
    const prefix = getPrefix(element, depth);

    if (element.children !== undefined) {
      return `${prefix}${tree(element.children, depth + 1)}`;
    }
    if (element.status === 'same') {
      return `${prefix}${getTreeValue(element.valueBefore, depth)}`;
    }
    if (element.status === 'changed') {
      return `${prefix}- ${element.name}: ${getTreeValue(element.valueBefore, depth)}${prefix}+ ${element.name}: ${getTreeValue(element.valueAfter, depth)}`;
    }
    if (element.status === 'deleted') {
      return `${prefix}- ${element.name}: ${getTreeValue(element.valueBefore, depth)}`;
    }
    return `${prefix}+ ${element.name}: ${getTreeValue(element.valueAfter, depth)}`;
  });

  return `{${result}\n${'    '.repeat(depth)}}`;
};

export default tree;
