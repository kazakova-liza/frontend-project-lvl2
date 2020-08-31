#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../index.js';

commander
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig, commander.format);
    console.log(diff);
  });

commander.parse(process.argv);
