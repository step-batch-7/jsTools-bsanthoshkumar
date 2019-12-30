const {
  parseCmdLineArgs,
  readFileContent,
  extractColumnsOfLine
} = require('./cutLib');

const cut = (userOptions, fs) => {
  const { fields, delimiter, filePath, error } = parseCmdLineArgs(userOptions);
  if (error) {
    return { error: error, lines: '' };
  }
  const { fileContent, fileError } = readFileContent(fs, filePath);
  if (fileError) {
    return { error: fileError, lines: '' };
  }
  const lines = extractColumnsOfLine(fileContent, fields, delimiter).join('\n');
  return { lines, error: '' };
};

module.exports = cut;
