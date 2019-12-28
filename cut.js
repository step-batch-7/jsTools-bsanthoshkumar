'use strict';
const { cut } = require('./src/cutLib');
const fs = require('fs');
const userOptionsStartIndex = 2;

const main = function(userOptions) {
  const resultOfCut = cut(userOptions, fs);
  process.stdout.write(resultOfCut.lines);
  process.stderr.write(resultOfCut.error);
};

main(process.argv.slice(userOptionsStartIndex));
