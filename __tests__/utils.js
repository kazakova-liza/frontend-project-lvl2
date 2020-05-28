import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', filename);

export default getFixturePath;
