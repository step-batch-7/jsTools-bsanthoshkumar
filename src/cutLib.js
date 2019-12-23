const joinExtractedLines = function(extrcatedLines) {
  return extrcatedLines.join("\n");
};

const extractFileContent = function(fileContent, userOptions) {
  const { fields } = userOptions;
  let extractedContent = fileContent.map(line => {
    line = line.split(",");
    return line[fields - 1];
  });
  return extractedContent;
};

const readFileContent = function(readFile, path, encoding) {
  const fileContent = readFile(path, encoding);
  return fileContent.split("\n");
};

module.exports = { joinExtractedLines, extractFileContent, readFileContent };
