const {
  joinExtractedLines,
  extractFileContent,
  readFileContent,
  parseCmdLineArgs
} = require("../src/cutLib");

const performCutOperation = function(args, fileSys) {
  const userOptions = parseCmdLineArgs(args);
  if (!fileSys.existsFile(userOptions.filePath))
    return `cut: ${userOptions.filePath}: No such File or Directory`;
  const fileContent = readFileContent(fileSys, userOptions.filePath);
  const extractedContent = extractFileContent(fileContent, userOptions);
  return joinExtractedLines(extractedContent);
};

module.exports = { performCutOperation };
