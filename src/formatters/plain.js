
const getPlainValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};

const getAction = (element) => {
  if (element.status === 'same') {
    return 'has not changed';
  }
  if (element.status === 'changed') {
    return 'was changed';
  }
  if (element.status === 'deleted') {
    return 'was deleted';
  }
  return 'was added';
};

const getSuffix = (element) => {
  if (element.status === 'same') {
    return '';
  }
  if (element.status === 'changed') {
    return ` from ${getPlainValue(element.valueBefore)} to ${getPlainValue(element.valueAfter)}`;
  }
  if (element.status === 'deleted') {
    return '';
  }
  return ` with value: ${getPlainValue(element.valueAfter)}`;
};

export const makePlain = (diff, depth = 0, rout = '') => {
  const plainResult = diff.reduce((acc, element) => {
    const propertyName = rout + element.name;

    if (element.status === undefined) {
      return `${acc}${makePlain(element.children, depth + 1, `${propertyName}.`)}`;
    }
    const action = getAction(element);
    const suffix = getSuffix(element);


    return `${acc}\nProperty ${propertyName} ${action}${suffix}`;
  }, '');

  return plainResult;
};

export default makePlain;
