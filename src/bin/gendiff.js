#!/usr/bin/env node

const program = require('commander');

const gendiff = require('../index');

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

gendiff.genDiff(pathToFile1, pathToFile2);
