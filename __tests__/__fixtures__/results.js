
export const treeOutput = `{
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

export const plainOutput = `
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

export const jsonOutput = '{"common":{"setting1":{"status":"same","value":"Value 1"},"setting2":{"status":"deleted","value":200},"setting3":{"status":"changed","oldValue":true,"newValue":{"key":"value"}},"setting6":{"key":{"status":"same","value":"value"},"ops":{"status":"added","value":"vops"}},"follow":{"status":"added","value":false},"setting4":{"status":"added","value":"blah blah"},"setting5":{"status":"added","value":{"key5":"value5"}}},"group1":{"baz":{"status":"changed","oldValue":"bas","newValue":"bars"},"foo":{"status":"same","value":"bar"},"nest":{"status":"changed","oldValue":{"key":"value"},"newValue":"str"}},"group2":{"status":"deleted","value":{"abc":12345}},"group3":{"status":"added","value":{"fee":100500}}}';
