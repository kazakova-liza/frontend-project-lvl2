#!/usr/bin/env node

import genDiff from '..';
import parser from '../parsers';

const program = require('commander');

let pathToFile1;
let pathToFile2;

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    pathToFile1 = firstConfig;
    pathToFile2 = secondConfig;
  });

program.parse(process.argv);

const before = parser(pathToFile1);
const after = parser(pathToFile2);

console.log(genDiff(before, after));
