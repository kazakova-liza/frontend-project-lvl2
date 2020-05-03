
import yaml from 'js-yaml';
import ini from 'ini';
import txtParser from 'txt-parser';

const parse = (data) => {
  switch (data.format) {
    case 'JSON': {
      return JSON.parse(data.data);
    }
    case 'YML': {
      return yaml.safeLoad(data.data);
    }
    case 'INI': {
      return ini.parse(data.data);
    }
    case 'TXT': {
      return txtParser.parseFile(data.data);
    }
    default: {
      console.log('Error: unexpected format %s', data.format);
      throw Error('Unexpected format or empty data');
    }
  }
};

export default parse;
