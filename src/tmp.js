#!/usr/bin/env node

/* eslint-disable no-restricted-syntax */


const liza1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const liza2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const liza1keys = Object.keys(liza1);
const liza2keys = Object.keys(liza2);

const func = () => {
  const areSame = liza2keys.filter((key) => liza2keys.includes(key) && liza1[key] === liza2[key]);
  const changed = liza2keys.filter((key) => liza2keys.includes(key) && liza1[key] !== liza2[key]);
  const deleted = liza2keys.filter((key) => !liza2keys.includes(key));
  const added = liza2keys.filter((key) => !liza1keys.includes(key));

  let result = '{\n';
  for (const element of areSame) {
    result += `    ${element}: ${liza2[element]}\n`;
  }
  for (const element of changed) {
    result += `  - ${element}: ${liza1[element]}\n  + ${element}: ${liza2[element]}\n`;
  }
  for (const element of deleted) {
    result += `  - ${element}: ${liza1[element]}\n`;
  }
  for (const element of added) {
    result += `  + ${element}: ${liza2[element]}\n`;
  }
  result += '}';

  console.log(result);
};

func();
