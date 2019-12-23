const {
  joinExtractedLines,
  extractFileContent,
  readFileContent,
  parseCmdLineArgs
} = require("../src/cutLib");

const performCutOperation = function(args, fileSys) {
  const userOptions = parseCmdLineArgs(args);
  const fileContent = readFileContent(fileSys, userOptions.filePath);
  const extractedContent = extractFileContent(fileContent, userOptions);
  return joinExtractedLines(extractedContent);
};

module.exports = { performCutOperation };
