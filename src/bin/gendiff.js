#!/usr/bin/env node

import { genDiff } from '..';

const program = require('commander');

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig, `${program.format}`);
    console.log(diff);
  });

program.parse(process.argv);
