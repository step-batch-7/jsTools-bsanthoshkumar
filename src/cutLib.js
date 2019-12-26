const parseCmdLineArgs = cmdLineArgs => {
  const fields = cmdLineArgs[cmdLineArgs.indexOf("-f") + 1].split(",");
  const delimiter = cmdLineArgs[cmdLineArgs.indexOf("-d") + 1];
  const filePath = cmdLineArgs[cmdLineArgs.length - 1];
  const fieldZeroError = "cut: [-cf] list: values may not include zero";
  const fieldStringError = "cut: [-cf] list: illegal list value";
  if (+fields == 0) return { error: fieldZeroError, lines: "" };
  if (isNaN(+fields)) return { error: fieldStringError, lines: "" };
  return { fields, delimiter, filePath };
};

const readFileContent = (fs, path) => fs.readFileSync(path, "utf8").split("\n");

const extractColumnsOfLine = (fileContent, userOptions) => {
  const { fields, delimiter } = userOptions;
  let lines = fileContent.map(line => {
    if (!line.includes(delimiter)) return line;
    line = line.split(delimiter);
    return line[fields[0] - 1];
  });
  return lines;
};

const cut = (cmdLineArgs, fs) => {
  const userOptions = parseCmdLineArgs(cmdLineArgs);
  if (userOptions.error) return { error: userOptions.error, lines: "" };
  const { filePath } = userOptions;
  if (!fs.existsSync(filePath)) {
    return { error: `cut: ${filePath}: No such File or Directory`, lines: "" };
  }
  const fileContent = readFileContent(fs, filePath);
  let lines = extractColumnsOfLine(fileContent, userOptions).join("\n");
  return { lines, error: "" };
};

module.exports = {
  extractColumnsOfLine,
  readFileContent,
  parseCmdLineArgs,
  cut
};
