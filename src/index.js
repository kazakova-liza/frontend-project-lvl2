
const genDiff = (before, after) => {
  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  let result = '{';
  for (const key of keys1) {
    if (keys2.includes(key) && before[key] === after[key]) {
      result += `\n    ${key}:`;
      result += ` ${after[key]}`;
    }
    if (keys2.includes(key) && before[key] !== after[key]) {
      result += `\n  + ${`${key}:`}`;
      result += ` ${after[key]}`;
      result += `\n  - ${`${key}:`}`;
      result += ` ${before[key]}`;
    }
    if (!keys2.includes(key)) {
      result += `\n  - ${`${key}:`}`;
      result += ` ${before[key]}`;
    }
  }
  for (const key of keys2) {
    if (!keys1.includes(key)) {
      result += `\n  + ${`${key}:`}`;
      result += ` ${after[key]}`;
    }
  }
  result += '\n}';
  return result;
};

export default genDiff;
