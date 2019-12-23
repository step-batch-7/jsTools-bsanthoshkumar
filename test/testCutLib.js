const assert = require("assert");
const { joinExtractedLines, extractFileContent } = require("../src/cutLib");

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
