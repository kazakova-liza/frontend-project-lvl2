
import { genDiff, getFixturePath } from '../src';


test('generate diff from two different configs', () => {
  const result = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: true
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
      key5: value5
}
    }
    group1: {
      - baz: bas
      + baz: bas
        foo: bar
      - nest: {
      key: value
}
      + nest: {
      key: value
}
    }
  - group2: {
      abc: 12345
}
  + group3: {
      fee: 100500
}
}`;
  const path1 = getFixturePath('before_tree.ini');
  const path2 = getFixturePath('after_tree.ini');

  expect(genDiff(path1, path2, 'tree')).toEqual(result);
});

test('generate diff from two same configs', () => {
  const result = `{
    common: {
        setting1: Value 1
        setting2: 200
        setting3: true
        setting6: {
            key: value
        }
    }
    group1: {
        baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
    group2: {
        abc: 12345
    }
}`;
  const path1 = getFixturePath('before_tree.ini');
  const path2 = getFixturePath('before_tree.ini');

  expect(genDiff(path1, path2, 'tree')).toEqual(result);
});

test('generate diff from two configs, first one is empty', () => {
  const result = `{
  + common: {
      follow: false,
      setting1: Value 1,
      setting4: blah blah,
      setting3: {
            key: value
      },
      setting5: {
            key5: value5
      },
      setting6: {
            key: value,
            ops: vops
      }
}
  + group1: {
      foo: bar,
      baz: bars,
      nest: str
}
  + group3: {
      fee: 100500
}
}`;

  const path1 = getFixturePath('empty.ini');
  const path2 = getFixturePath('after_tree.ini');

  expect(genDiff(path1, path2, 'tree')).toEqual(result);
});

test('generate diff from two configs, second one is empty', () => {
  const result = `{
  - common: {
      setting1: Value 1,
      setting2: 200,
      setting3: true,
      setting6: {
            key: value
      }
}
  - group1: {
      baz: bas,
      foo: bar,
      nest: {
            key: value
      }
}
  - group2: {
      abc: 12345
}
}`;

  const path1 = getFixturePath('before_tree.ini');
  const path2 = getFixturePath('empty.ini');

  expect(genDiff(path1, path2, 'tree')).toEqual(result);
});
