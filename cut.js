const { cut } = require("./src/cutLib");
const fs = require("fs");

const main = function() {
  let resultOfCut = { error: "", lines: "" };
  resultOfCut = cut(process.argv.slice(2), fs, resultOfCut);
  process.stdout.write(resultOfCut.lines);
  process.stderr.write(resultOfCut.error);
};

main();
