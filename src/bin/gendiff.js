#!/usr/bin/env node

import { printDiff, genDiff } from '..';
import parser from '../parsers';

const program = require('commander');

let pathToFile1;
let pathToFile2;
// const format = 'plain';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    pathToFile1 = firstConfig;
    pathToFile2 = secondConfig;
    // format = type;
  });


program.parse(process.argv);

const before = parser(pathToFile1);
const after = parser(pathToFile2);

console.log(printDiff(genDiff(before, after)));
