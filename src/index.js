
import parse from './parsers.js';
import {
  createDiff, transformDiffToFormat, getDataFormat, readFile,
} from './utils.js';

const genDiff = (pathToFile1, pathToFile2, format) => {
  const before = parse(readFile(pathToFile1), getDataFormat(pathToFile1));
  const after = parse(readFile(pathToFile2), getDataFormat(pathToFile2));

  const diff = createDiff(before, after);
  const result = transformDiffToFormat(diff, format);

  return result;
};

export default genDiff;
