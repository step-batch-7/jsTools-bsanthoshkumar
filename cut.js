const { performCutOperation } = require("./src/cutLib");
const fs = require("fs");

const main = function() {
  const fileSys = {
    readFile: fs.readFileSync,
    existsFile: fs.existsSync,
    encoding: "utf8"
  };
  let resultOfCut = { cutLines: "", error: "" };
  resultOfCut = performCutOperation(
    process.argv.slice(2),
    fileSys,
    resultOfCut
  );
  process.stdout.write(resultOfCut.cutLines);
  process.stderr.write(resultOfCut.error);
};

main();
