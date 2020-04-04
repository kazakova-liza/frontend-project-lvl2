# frontend-project-lvl2

## Travis

[![Build Status](https://travis-ci.org/kazakova-liza/frontend-project-lvl2.svg?branch=master)](https://travis-ci.org/kazakova-liza/frontend-project-lvl2)

## CodeClimate

[![Maintainability](https://api.codeclimate.com/v1/badges/f6f5fccc1d253d8a889d/maintainability)](https://codeclimate.com/github/kazakova-liza/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/f6f5fccc1d253d8a889d/test_coverage)](https://codeclimate.com/github/kazakova-liza/frontend-project-lvl2/test_coverage)

## About

This project is designed to generate a diff between to config files.

Acceptable config file formats:
* .json
* .yml
* .ini

Diff can be visualized in three different ways:
* Tree
Example
<pre><code>
{
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
}
</code></pre>
* Plain
Example
<pre><code>
Property common.setting1 has not changed
Property common.setting2 was deleted
Property common.setting3 was changed from true to [complex value]
Property common.setting6.key has not changed
</code></pre>
* JSON
Example
<pre><code>
{"common":{"status":"deleted","value":{"setting1":"Value 1","setting2":200,"setting3":true,"setting6":{"key":"value"}}},"group1":{"status":"deleted","value":{"baz":"bas","foo":"bar","nest":{"key":"value"}}},"group2":{"status":"deleted","value":{"abc":12345}}};
</code></pre>



## Installation

Run the following command in the command line:

```
npm install brain-games-liza
```

## Execution

State the name of the game in command line

```
brain-even
```

