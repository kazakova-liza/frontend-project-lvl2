
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';


const parseFile = (pathToFile) => {
  const absolutePathToFile = path.resolve(pathToFile);
  const format = path.extname(absolutePathToFile);
  const data = fs.readFileSync(absolutePathToFile, 'utf8');

  if (data === '') {
    return {};
  }

  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.safeLoad(data);
  }
  return ini.parse(data);
};

export default parseFile;
