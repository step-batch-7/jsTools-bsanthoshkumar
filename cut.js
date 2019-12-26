"use strict";
const { cut } = require("./src/cutLib");
const fs = require("fs");

const main = function() {
  const resultOfCut = cut(process.argv.slice(2), fs);
  process.stdout.write(resultOfCut.lines);
  process.stderr.write(resultOfCut.error);
};

main();
