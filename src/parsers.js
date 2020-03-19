
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const ini = require('ini');

const parser = (pathToFile) => {
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

export default parser;
