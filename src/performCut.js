const {
  joinExtractedLines,
  extractFileContent,
  readFileContent,
  parseCmdLineArgs
} = require("../src/cutLib");

const performCutOperation = function(args, fileSys, result) {
  const userOptions = parseCmdLineArgs(args);
  if (!fileSys.existsFile(userOptions.filePath)) {
    error = `cut: ${userOptions.filePath}: No such File or Directory`;
    return { error };
  }
  const fileContent = readFileContent(fileSys, userOptions.filePath);
  const extractedContent = extractFileContent(fileContent, userOptions);
  const cutLines = joinExtractedLines(extractedContent);
  return { cutLines };
};

module.exports = { performCutOperation };
