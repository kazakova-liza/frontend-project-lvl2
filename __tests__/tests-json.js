
import genDiff from '../src';

test("generate diff from two different configs", () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  const path1 = __dirname + '/fixtures/JSON/before.json';
  const path2 = __dirname + '/fixtures/JSON/after.json';
  
  expect(genDiff(path1, path2)).toEqual(result);
});

test("generate diff from two same configs", () => {
  const result = `{
    host: hexlet.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;
  const path1 = __dirname + '/fixtures/JSON/before.json';
  const path2 = __dirname + '/fixtures/JSON/before_copy.json';
  
  expect(genDiff(path1, path2)).toEqual(result);
});

test("generate diff from two configs, first one is empty", () => {
  const result = `{
  + timeout: 20
  + verbose: true
  + host: hexlet.io
}`;

  const path1 = __dirname + '/fixtures/JSON/empty_before.json';
  const path2 = __dirname + '/fixtures/JSON/after.json';

  expect(genDiff(path1, path2)).toEqual(result);
});

test("generate diff from two configs, second one is empty", () => {
  const result = `{
  - host: hexlet.io
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
}`;

  const path1 = __dirname + '/fixtures/JSON/before.json';
  const path2 = __dirname + '/fixtures/JSON/empty_after.json';

  expect(genDiff(path1, path2)).toEqual(result);
});
