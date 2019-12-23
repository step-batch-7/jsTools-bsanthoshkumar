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
  it("should give extracted content of each line for comma delimter", function() {
    const fileContent = ["a,b,c,d,e", "f,g,h,i,j", "k,l,m,n,o"];
    const userOptions = { fields: ["5"], delimiter: "," };
    const actual = extractFileContent(fileContent, userOptions);
    const expected = { extractedLines: ["e", "j", "o"] };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give extracted content of each line for hypen delimter", function() {
    const fileContent = ["a-b-c-d-e", "f-g-h-i-j", "k-l-m-n-o"];
    const userOptions = { fields: ["3"], delimiter: "-" };
    const actual = extractFileContent(fileContent, userOptions);
    const expected = { extractedLines: ["c", "h", "m"] };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("readFileContent", function() {
  it("should give content of the file", function() {
    const readFile = (filePath, encoding) => {
      return "1,2,3,4,5\n11,12,13,14,15\n21,22,23,24,25\n31,32,33,34,35\n41,42,43,44,45";
    };
    const fileSys = { readFile: readFile, encoding: "utf8" };
    const filePath = "./sampleText.js";
    const actual = readFileContent(fileSys, filePath);
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
    const args = ["-f", "3", "-d", ",", "./sampleText.js"];
    const expected = {
      filePath: "./sampleText.js",
      fields: ["3"],
      delimiter: ","
    };
    assert.deepStrictEqual(parseCmdLineArgs(args), expected);
  });
});
