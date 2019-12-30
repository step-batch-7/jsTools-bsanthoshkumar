'use strict';
const { createReadStream } = require('fs');
const { stdin, stdout, stderr } = process;
const cut = require('./src/performCut');

const userOptionsStartIndex = 2;

const write = resultOfCut => {
  stdout.write(resultOfCut.lines);
  stderr.write(resultOfCut.error);
};

const main = function(userOptions) {
  cut(userOptions, { createReadStream, stdin }, write);
};

main(process.argv.slice(userOptionsStartIndex));
