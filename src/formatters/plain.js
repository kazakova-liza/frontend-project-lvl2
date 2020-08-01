
const getValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};


export const makePlain = (diff) => {
  const iter = (diff, route) => {
    const plainResult = diff.map((element) => {
      const ancestor = `${route}${element.name}`;

      switch (element.status) {
        case 'same':
          return `Property ${ancestor} has not been changed`;
        case 'changed':
          return `Property ${ancestor} has been changed from ${getValue(element.valueBefore)} to ${getValue(element.valueAfter)}`;
        case 'deleted':
          return `Property ${ancestor} has been deleted`;
        case 'added':
          return `Property ${ancestor} has been added with value: ${getValue(element.valueAfter)}`;
        case undefined:
          return `${iter(element.children, `${ancestor}.`)}`;
        default:
          throw Error('Unexpected status:', element.status);
      }
    }, []);

    return plainResult.join('\n');
  }
  return iter(diff, '');
};

export default makePlain;
