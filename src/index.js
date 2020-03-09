const path = require('path');
const fs = require('fs');

const genDiff = (pathToFile1, pathToFile2) => {
  const absolutePathToFile1 = path.resolve(pathToFile1);
  const absolutePathToFile2 = path.resolve(pathToFile2);

  const file1 = fs.readFileSync(absolutePathToFile1, 'utf8');
  const file2 = fs.readFileSync(absolutePathToFile2, 'utf8');

  const before = JSON.parse(file1);
  const after = JSON.parse(file2);

  const keys1 = Object.keys(before);
  const keys2 = Object.keys(after);

  let result = '{\n';
  for (const key of keys1) {
    if (keys2.includes(key) && before[key] === after[key]) {
      result += `    ${key}:`;
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
  console.log(result);
};

export default genDiff;
