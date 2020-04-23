
const printObj = (obj) => JSON.stringify(obj, null, '      ').replace(/"/g, '');

export const getValue = (value, format) => {
  if (typeof value === 'object' && format === 'tree') {
    return printObj(value);
  }
  if (typeof value === 'object' && format === 'plain') {
    return '[complex value]';
  }
  return value;
};

export const plain = (diff, depth, rout) => {
  const keys = Object.keys(diff);

  const plainResult = keys.reduce((acc, key) => {
    let action;
    let suffix = '';
    const propertyName = rout + key;

    if (diff[key].status === undefined) {
      return `${acc}${plain(diff[key], depth + 1, `${propertyName}.`)}`;
    }
    if (diff[key].status === 'same') {
      action = 'has not changed';
    }
    if (diff[key].status === 'changed') {
      action = 'was changed';
      suffix = ` from ${getValue(diff[key].oldValue, 'plain')} to ${getValue(diff[key].newValue, 'plain')}`;
    }
    if (diff[key].status === 'deleted') {
      action = 'was deleted';
    }
    if (diff[key].status === 'added') {
      action = 'was added';
      suffix = ` with value: ${getValue(diff[key].value, 'plain')}`;
    }
    const text = `${acc}\nProperty ${propertyName} ${action}${suffix}`;
    return text;
  }, '', 1);

  return plainResult;
};
