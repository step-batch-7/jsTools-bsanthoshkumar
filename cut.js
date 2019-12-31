'use strict';
const { createReadStream } = require('fs');
const { stdin, stdout, stderr } = process;
const { cut } = require('./src/performCut');

const write = resultOfCut => {
  stdout.write(resultOfCut.lines);
  stderr.write(resultOfCut.error);
};

const createStdin = () => stdin;

const main = function(cmdLineArgs) {
  const [, , ...userOptions] = cmdLineArgs;
  cut(userOptions, { createReadStream, createStdin }, write);
};

main(process.argv);
