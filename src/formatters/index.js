import { makePlain } from './plain';
import makeTree from './tree';
import makeJson from './json';

const transformDiffToFormat = (diff, format) => {
  if (format === 'tree') {
    return makeTree(diff);
  }
  if (format === 'plain') {
    return makePlain(diff);
  }
  return makeJson(diff);
};

export default transformDiffToFormat;
