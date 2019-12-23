const { performCutOperation } = require("./src/performCut");
const fs = require("fs");

const main = function() {
  const fileSys = {
    readFile: fs.readFileSync,
    existsFile: fs.existsSync,
    encoding: "utf8"
  };
  const result = performCutOperation(process.argv.slice(2), fileSys);
  result.cutLines && process.stdout.write(result.cutLines);
  result.error && process.stderr.write(result.error);
};

main();
