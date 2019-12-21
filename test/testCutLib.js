const assert = require("assert");
const { joinExtractedLines } = require("../src/cutLib");

describe("joinExtractedLines", function() {
  it("should give string format of given line", function() {
    const extractedLines = ["abc", "def"];
    const expected = "abc\ndef";
    assert.deepStrictEqual(joinExtractedLines(extractedLines), expected);
  });
});
