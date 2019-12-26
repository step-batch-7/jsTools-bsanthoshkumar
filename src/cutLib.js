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

const readFileContent = (fs, path) => fs.readFileSync(path, "utf8").split("\n");

const extractColumns = (fileContent, userOptions, resultOfCut) => {
  const { fields, delimiter } = userOptions;
  resultOfCut.lines = fileContent.map(line => {
    if (!line.includes(delimiter)) return line;
    line = line.split(delimiter);
    return line[fields[0] - 1];
  });
  return resultOfCut;
};

const cut = (args, fs, resultOfCut) => {
  const userOptions = parseCmdLineArgs(args, resultOfCut);
  if (!userOptions.isValidArgs) return userOptions.resultOfCut;
  const { filePath } = userOptions;
  if (!fs.existsSync(filePath)) {
    resultOfCut.error = `cut: ${filePath}: No such File or Directory`;
    return resultOfCut;
  }
  const fileContent = readFileContent(fs, filePath);
  resultOfCut = extractColumns(fileContent, userOptions, resultOfCut);
  resultOfCut.lines = resultOfCut.lines.join("\n");
  return resultOfCut;
};

module.exports = {
  extractColumns,
  readFileContent,
  parseCmdLineArgs,
  cut
};
