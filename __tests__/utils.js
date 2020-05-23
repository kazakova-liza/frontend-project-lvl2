import path from 'path';

export const getInputFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', 'input_files', filename);
export const getOutputFixturePath = (filename) => path.join(__dirname, '..', '__tests__', '__fixtures__', 'results', filename);
