
import { genDiff, getFixturePath } from '../src';

test('generate diff from two different configs', () => {
  const result = `
Property common.setting1 has not changed
Property common.setting2 was deleted
Property common.setting3 was changed from true to [complex value]
Property common.setting6.key has not changed
Property common.setting6.ops was added with value: vops
Property common.follow was added with value: false
Property common.setting4 was added with value: blah blah
Property common.setting5 was added with value: [complex value]
Property group1.baz was changed from bas to bars
Property group1.foo has not changed
Property group1.nest was changed from [complex value] to str
Property group2 was deleted
Property group3 was added with value: [complex value]`;

  const path1 = getFixturePath('before_tree.json');
  const path2 = getFixturePath('after_tree.json');

  expect(genDiff(path1, path2, 'plain')).toEqual(result);
});

test('generate diff from two same configs', () => {
  const result = `
Property common.setting1 has not changed
Property common.setting2 has not changed
Property common.setting3 has not changed
Property common.setting6.key has not changed
Property group1.baz has not changed
Property group1.foo has not changed
Property group1.nest.key has not changed
Property group2.abc has not changed`;

  const path1 = getFixturePath('before_tree.json');
  const path2 = getFixturePath('before_tree.json');

  expect(genDiff(path1, path2, 'plain')).toEqual(result);
});

test('generate diff from two configs, first one is empty', () => {
  const result = `
Property common was added with value: [complex value]
Property group1 was added with value: [complex value]
Property group3 was added with value: [complex value]`;

  const path1 = getFixturePath('empty.json');
  const path2 = getFixturePath('after_tree.json');

  expect(genDiff(path1, path2, 'plain')).toEqual(result);
});

test('generate diff from two configs, second one is empty', () => {
  const result = `
Property common was deleted
Property group1 was deleted
Property group2 was deleted`;

  const path1 = getFixturePath('before_tree.json');
  const path2 = getFixturePath('empty.json');

  expect(genDiff(path1, path2, 'plain')).toEqual(result);
});
