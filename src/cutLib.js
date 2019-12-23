const joinExtractedLines = function(extrcatedLines) {
  return extrcatedLines.join("\n");
};

const extractFieldOfLine = function(line) {
  line = line.split(this.delimiter);
  return line[this.fields[0] - 1];
};
const extractFileContent = function(fileContent, userOptions) {
  const { fields, delimiter } = userOptions;
  let extractedContent = fileContent.map(extractFieldOfLine.bind(userOptions));
  return extractedContent;
};

const readFileContent = function(fileSys, path) {
  const fileContent = fileSys.readFile(path, fileSys.encoding);
  return fileContent.split("\n");
};

const parseCmdLineArgs = function(args) {
  const fields = args[args.indexOf("-f") + 1].split(",");
  const delimiter = args[args.indexOf("-d") + 1];
  const filePath = args[args.length - 1];
  return { filePath: filePath, fields: fields, delimiter: delimiter };
};

module.exports = {
  joinExtractedLines,
  extractFileContent,
  readFileContent,
  parseCmdLineArgs
};
