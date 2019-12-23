const assert = require("assert");
const { performCutOperation } = require("../src/performCut");

describe("performCutOpertion", function() {
  it("should give particular field of given file", function() {
    const readFile = (filePath, encoding) => {
      return "1 2 3 4 5\n11 12 13 14 15\n21 22 23 24 25\n31 32 33 34 35\n41 42 43 44 45";
    };
    const fileSys = { readFile: readFile, encoding: "utf8" };
    const args = ["-f", "3", "./sampleText.txt"];
    const expected = "3\n13\n23\n33\n43";
    assert.strictEqual(performCutOperation(args, fileSys), expected);
  });
});
