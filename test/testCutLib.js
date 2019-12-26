const assert = require("assert");
const {
  extractColumns,
  readFileContent,
  parseCmdLineArgs,
  cut
} = require("../src/cutLib");

describe("extractColumns", function() {
  it("should give extracted content of each line for comma delimter", function() {
    const fileContent = ["a,b,c,d,e", "f,g,h,i,j", "k,l,m,n,o"];
    const userOptions = { fields: ["5"], delimiter: "," };
    const resultOfCut = { lines: "", error: "" };
    const actual = extractColumns(fileContent, userOptions, resultOfCut);
    const expected = { lines: ["e", "j", "o"], error: "" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give extracted content of each line for hypen delimter", function() {
    const fileContent = ["a-b-c-d-e", "f-g-h-i-j", "k-l-m-n-o"];
    const userOptions = { fields: ["3"], delimiter: "-" };
    const resultOfCut = { lines: "", error: "" };
    const actual = extractColumns(fileContent, userOptions, resultOfCut);
    const expected = { lines: ["c", "h", "m"], error: "" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give whole line for given delimiter is not included", function() {
    const fileContent = ["a-b-c-d-e", "f-g-h-i-j", "k-l-m-n-o"];
    const userOptions = { fields: ["3"], delimiter: "," };
    const resultOfCut = { lines: "", error: "" };
    const actual = extractColumns(fileContent, userOptions, resultOfCut);
    const expected = {
      lines: ["a-b-c-d-e", "f-g-h-i-j", "k-l-m-n-o"],
      error: ""
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("readFileContent", function() {
  it("should give content of the file", function() {
    const readFileSync = (filePath, encoding) => {
      return "1,2,3,4,5\n11,12,13,14,15\n21,22,23,24,25\n31,32,33,34,35\n41,42,43,44,45";
    };
    const fs = { readFileSync, encoding: "utf8" };
    const filePath = "./sampleText.js";
    const actual = readFileContent(fs, filePath);
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
      delimiter: ",",
      isValidArgs: true
    };
    assert.deepStrictEqual(parseCmdLineArgs(args), expected);
  });
});

describe("cut", function() {
  it("should give particular field of given file", function() {
    const readFileSync = (filePath, encoding) => {
      return "1,2,3,4,5\n11,12,13,14,15\n21,22,23,24,25\n31,32,33,34,35\n41,42,43,44,45";
    };
    const existsSync = filePath => true;
    const fileSys = { readFileSync, existsSync };
    const resultOfCut = { lines: "", error: "" };
    const args = ["-f", "3", "-d", ",", "./sampleText.txt"];
    const actual = cut(args, fileSys, resultOfCut);
    const expected = { lines: "3\n13\n23\n33\n43", error: "" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give error for wrong filePath", function() {
    const existsSync = filePath => false;
    const fs = { existsSync };
    const args = ["-f", "3", "-d", ",", "./sampleText.txt"];
    const resultOfCut = { lines: "", error: "" };
    const actual = cut(args, fs, resultOfCut);
    const expected = {
      error: `cut: ./sampleText.txt: No such File or Directory`,
      lines: ""
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give error for given field is string", function() {
    const readFileSync = (filePath, encoding) => {
      return "1,2,3,4,5\n11,12,13,14,15\n21,22,23,24,25\n31,32,33,34,35\n41,42,43,44,45";
    };
    const existsSync = filePath => true;
    const fs = { readFileSync, existsSync };
    const args = ["-f", "abc", "-d", ",", "./sampleText.txt"];
    const resultOfCut = { lines: "", error: "" };
    const actual = cut(args, fs, resultOfCut);
    const expected = {
      error: "cut: [-cf] list: illegal list value",
      lines: ""
    };
    assert.deepStrictEqual(actual, expected);
  });
});
