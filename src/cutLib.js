const parseCmdLineArgs = args => {
  const fields = args[args.indexOf("-f") + 1].split(",");
  const delimiter = args[args.indexOf("-d") + 1];
  const filePath = args[args.length - 1];
  const fieldZeroError = "cut: [-cf] list: values may not include zero";
  const fieldStringError = "cut: [-cf] list: illegal list value";
  if (+fields == 0) return { error: fieldZeroError, lines: "" };
  if (isNaN(+fields)) return { error: fieldStringError, lines: "" };
  return { fields, delimiter, filePath };
};

const readFileContent = (fs, path) => fs.readFileSync(path, "utf8").split("\n");

const extractColumns = (fileContent, userOptions) => {
  const { fields, delimiter } = userOptions;
  let lines = fileContent.map(line => {
    if (!line.includes(delimiter)) return line;
    line = line.split(delimiter);
    return line[fields[0] - 1];
  });
  return lines;
};

const cut = (args, fs) => {
  const userOptions = parseCmdLineArgs(args);
  if (userOptions.error) return userOptions;
  const { filePath } = userOptions;
  if (!fs.existsSync(filePath))
    return { error: `cut: ${filePath}: No such File or Directory`, lines: "" };
  const fileContent = readFileContent(fs, filePath);
  let lines = extractColumns(fileContent, userOptions).join("\n");
  return { lines, error: "" };
};

module.exports = {
  extractColumns,
  readFileContent,
  parseCmdLineArgs,
  cut
};
