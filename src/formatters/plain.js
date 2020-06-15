
const getValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};


export const makePlain = (diff, depth = 0, rout = '') => {
  const plainResult = diff.map((element) => {
    const propertyName = rout + element.name;

    if (element.status === 'same') {
      return `Property ${propertyName} has not been changed`;
    }
    if (element.status === 'added') {
      return `Property ${propertyName} has been added with value: ${getValue(element.valueAfter)}`;
    }
    if (element.status === 'deleted') {
      return `Property ${propertyName} has been deleted`;
    }
    if (element.status === 'changed') {
      return `Property ${propertyName} has been changed from ${getValue(element.valueBefore)} to ${getValue(element.valueAfter)}`;
    }
    return `${makePlain(element.children, depth + 1, `${propertyName}.`)}`;
  }, []);

  return plainResult.join('\n');
};

export default makePlain;
