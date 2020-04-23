
import yaml from 'js-yaml';
import ini from 'ini';


const parse = (fileInfo) => {
  if (fileInfo.data === '') {
    return {};
  }

  if (fileInfo.format === '.json') {
    return JSON.parse(fileInfo.data);
  }
  if (fileInfo.format === '.yml') {
    return yaml.safeLoad(fileInfo.data);
  }
  return ini.parse(fileInfo.data);
};

export default parse;
