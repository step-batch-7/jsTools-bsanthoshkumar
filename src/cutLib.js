const parseCmdLineArgs = (args, resultOfCut) => {
  const fields = args[args.indexOf("-f") + 1].split(",");
  const delimiter = args[args.indexOf("-d") + 1];
  const filePath = args[args.length - 1];
  if (+fields == 0) {
    resultOfCut.error = "cut: [-cf] list: values may not include zero";
    return { resultOfCut, isValidArgs: false };
  }
  if (isNaN(+fields)) {
    resultOfCut.error = "cut: [-cf] list: illegal list value";
    return { resultOfCut, isValidArgs: false };
  }
  return { fields, delimiter, filePath, isValidArgs: true };
};

const readFileContent = (fileSys, path) => {
  const fileContent = fileSys.readFile(path, fileSys.encoding);
  return fileContent.split("\n");
};

const extractFileContent = (fileContent, userOptions, resultOfCut) => {
  const { fields, delimiter } = userOptions;
  resultOfCut.lines = fileContent.map(line => {
    if (!line.includes(delimiter)) return line;
    line = line.split(delimiter);
    return line[fields[0] - 1];
  });
  return resultOfCut;
};

const performCutOperation = (args, fileSys, resultOfCut) => {
  const userOptions = parseCmdLineArgs(args, resultOfCut);
  if (!userOptions.isValidArgs) return userOptions.resultOfCut;
  const { filePath } = userOptions;
  if (!fileSys.existsFile(filePath)) {
    resultOfCut.error = `cut: ${filePath}: No such File or Directory`;
    return resultOfCut;
  }
  const fileContent = readFileContent(fileSys, filePath);
  resultOfCut = extractFileContent(fileContent, userOptions, resultOfCut);
  resultOfCut.lines = resultOfCut.lines.join("\n");
  return resultOfCut;
};

module.exports = {
  extractFileContent,
  readFileContent,
  parseCmdLineArgs,
  performCutOperation
};
