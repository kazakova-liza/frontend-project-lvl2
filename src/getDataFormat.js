import path from 'path';

const getDataFormat = (absolutePathToFile) => path.extname(absolutePathToFile).slice(1);

export default getDataFormat;
