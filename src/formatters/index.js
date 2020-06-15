import { makePlain } from './plain';
import makeTree from './tree';
import makeJson from './json';

const render = (diff, format) => {
  switch (format) {
    case 'tree':
      return makeTree(diff);
    case 'plain':
      return makePlain(diff);
    case 'json':
      return makeJson(diff);
    default:
      throw Error('Unexpected format:', format);
  }
};

export default render;
