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
module.exports = { joinExtractedLines, extractFileContent };
