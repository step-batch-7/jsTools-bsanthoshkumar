const {
  joinExtractedLines,
  extractFileContent,
  readFileContent,
  parseCmdLineArgs
} = require("../src/cutLib");

const performCutOperation = function(args, fileSys) {
  const userOptions = parseCmdLineArgs(args);
  if (!fileSys.existsFile(userOptions.filePath)) {
    return { error: `cut: ${userOptions.filePath}: No such File or Directory` };
  }
  const fileContent = readFileContent(fileSys, userOptions.filePath);
  const extractedContent = extractFileContent(fileContent, userOptions);
  if (extractedContent.error) return extractedContent;
  const cutLines = joinExtractedLines(extractedContent.extractedLines);
  return { cutLines };
};

module.exports = { performCutOperation };
