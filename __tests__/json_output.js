import { printDiff, genDiff, getFixturePath } from '../src';
import parser from '../src/parsers.js';

test('generate diff from two different configs', () => {
  const result = '{"common":{"setting1":{"status":"same","value":"Value 1"},"setting2":{"status":"deleted","value":200},"setting3":{"status":"changed","oldValue":true,"newValue":{"key":"value"}},"setting6":{"key":{"status":"same","value":"value"},"ops":{"status":"added","value":"vops"}},"follow":{"status":"added","value":false},"setting4":{"status":"added","value":"blah blah"},"setting5":{"status":"added","value":{"key5":"value5"}}},"group1":{"baz":{"status":"changed","oldValue":"bas","newValue":"bars"},"foo":{"status":"same","value":"bar"},"nest":{"status":"changed","oldValue":{"key":"value"},"newValue":"str"}},"group2":{"status":"deleted","value":{"abc":12345}},"group3":{"status":"added","value":{"fee":100500}}}';

  const path1 = getFixturePath('before_tree.json');
  const path2 = getFixturePath('after_tree.json');

  expect(printDiff(genDiff(parser(path1), parser(path2)), 'json')).toEqual(result);
});

test('generate diff from two same configs', () => {
  const result = '{"common":{"setting1":{"status":"same","value":"Value 1"},"setting2":{"status":"same","value":200},"setting3":{"status":"same","value":true},"setting6":{"key":{"status":"same","value":"value"}}},"group1":{"baz":{"status":"same","value":"bas"},"foo":{"status":"same","value":"bar"},"nest":{"key":{"status":"same","value":"value"}}},"group2":{"abc":{"status":"same","value":12345}}}';
  const path1 = getFixturePath('before_tree.json');
  const path2 = getFixturePath('before_tree.json');

  expect(printDiff(genDiff(parser(path1), parser(path2)), 'json')).toEqual(result);
});

test('generate diff from two configs, first one is empty', () => {
  const result = '{"common":{"status":"added","value":{"follow":false,"setting1":"Value 1","setting3":{"key":"value"},"setting4":"blah blah","setting5":{"key5":"value5"},"setting6":{"key":"value","ops":"vops"}}},"group1":{"status":"added","value":{"foo":"bar","baz":"bars","nest":"str"}},"group3":{"status":"added","value":{"fee":100500}}}';

  const path1 = getFixturePath('empty.json');
  const path2 = getFixturePath('after_tree.json');

  expect(printDiff(genDiff(parser(path1), parser(path2)), 'json')).toEqual(result);
});

test('generate diff from two configs, second one is empty', () => {
  const result = '{"common":{"status":"deleted","value":{"setting1":"Value 1","setting2":200,"setting3":true,"setting6":{"key":"value"}}},"group1":{"status":"deleted","value":{"baz":"bas","foo":"bar","nest":{"key":"value"}}},"group2":{"status":"deleted","value":{"abc":12345}}}';

  const path1 = getFixturePath('before_tree.json');
  const path2 = getFixturePath('empty.json');

  expect(printDiff(genDiff(parser(path1), parser(path2)), 'json')).toEqual(result);
});
