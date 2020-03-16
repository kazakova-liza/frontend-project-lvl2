
import genDiff from '../src';
import parser from '../src/parsers.js';

test('generate diff from two different configs', () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  const path1 = `${__dirname}/fixtures/INI/before.ini`;
  const path2 = `${__dirname}/fixtures/INI/after.ini`;

  expect(genDiff(parser(path1), parser(path2))).toEqual(result);
});

test('generate diff from two same configs', () => {
  const result = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;
  const path1 = `${__dirname}/fixtures/INI/before.ini`;
  const path2 = `${__dirname}/fixtures/INI/before_copy.ini`;

  expect(genDiff(parser(path1), parser(path2))).toEqual(result);
});

test('generate diff from two configs, first one is empty', () => {
  const result = `{
  + timeout: 20
  + verbose: true
  + host: hexlet.io
}`;

  const path1 = `${__dirname}/fixtures/INI/empty_before.ini`;
  const path2 = `${__dirname}/fixtures/INI/after.ini`;

  expect(genDiff(parser(path1), parser(path2))).toEqual(result);
});

test('generate diff from two configs, second one is empty', () => {
  const result = `{
  - host: hexlet.io
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
}`;

  const path1 = `${__dirname}/fixtures/INI/before.ini`;
  const path2 = `${__dirname}/fixtures/INI/empty_after.ini`;

  expect(genDiff(parser(path1), parser(path2))).toEqual(result);
});
