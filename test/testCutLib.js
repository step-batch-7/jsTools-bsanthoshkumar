const assert = require("assert");
const {
  joinExtractedLines,
  extractFileContent,
  readFileContent,
  parseCmdLineArgs
} = require("../src/cutLib");

describe("joinExtractedLines", function() {
  it("should give string format of given line", function() {
    const extractedLines = ["abc", "def"];
    const expected = "abc\ndef";
    assert.deepStrictEqual(joinExtractedLines(extractedLines), expected);
  });
});

describe("extractFileContent", function() {
  it("should give extracted content of each line", function() {
    const fileContent = ["a,b,c,d,e", "f,g,h,i,j", "k,l,m,n,o"];
    const userOptions = { fields: 5 };
    const actual = extractFileContent(fileContent, userOptions);
    const expected = ["e", "j", "o"];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("readFileContent", function() {
  it("should give content of the file", function() {
    const readFile = (filePath, encoding) => {
      return "1,2,3,4,5\n11,12,13,14,15\n21,22,23,24,25\n31,32,33,34,35\n41,42,43,44,45";
    };
    const filePath = "./sampleText.js";
    const actual = readFileContent(readFile, filePath, "utf8");
    const expected = [
      "1,2,3,4,5",
      "11,12,13,14,15",
      "21,22,23,24,25",
      "31,32,33,34,35",
      "41,42,43,44,45"
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("parseCmdLineArgs", function() {
  it("should give parsed commandLine args", function() {
    const args = ["-f", "3", "./sampleText.js"];
    const expected = { filePath: "./sampleText.js", fields: ["3"] };
    assert.deepStrictEqual(parseCmdLineArgs(args), expected);
  });
});
