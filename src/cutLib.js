const parseCmdLineArgs = args => {
  const fields = args[args.indexOf("-f") + 1].split(",");
  const delimiter = args[args.indexOf("-d") + 1];
  const filePath = args[args.length - 1];
  return { filePath: filePath, fields: fields, delimiter: delimiter };
};

const readFileContent = (fileSys, path) => {
  const fileContent = fileSys.readFile(path, fileSys.encoding);
  return fileContent.split("\n");
};

const extractFileContent = (fileContent, userOptions) => {
  const { fields } = userOptions;
  if (+fields == 0)
    return { error: "cut: [-cf] list: values may not include zero" };
  if (isNaN(+fields)) return { error: "cut: [-cf] list: illegal list value" };
  const extractedLines = fileContent.map(extractFieldOfLine.bind(userOptions));
  return { extractedLines };
};

const extractFieldOfLine = function(line) {
  if (!line.includes(this.delimiter)) return line;
  line = line.split(this.delimiter);
  return line[this.fields[0] - 1];
};

const joinExtractedLines = extrcatedLines => extrcatedLines.join("\n");

const performCutOperation = (args, fileSys) => {
  const userOptions = parseCmdLineArgs(args);
  const { filePath } = userOptions;
  if (!fileSys.existsFile(filePath))
    return { error: `cut: ${filePath}: No such File or Directory` };
  const fileContent = readFileContent(fileSys, filePath);
  const extractedContent = extractFileContent(fileContent, userOptions);
  if (extractedContent.error) return extractedContent;
  const cutLines = joinExtractedLines(extractedContent.extractedLines);
  return { cutLines };
};

module.exports = {
  joinExtractedLines,
  extractFileContent,
  readFileContent,
  parseCmdLineArgs,
  performCutOperation
};
