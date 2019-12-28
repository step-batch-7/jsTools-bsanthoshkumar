const parseCmdLineArgs = cmdLineArgs => {
  const [, fields, , delimiter, filePath] = cmdLineArgs;
  const fieldZeroError = "cut: [-cf] list: values may not include zero";
  const fieldStringError = "cut: [-cf] list: illegal list value";
  if (+fields == 0) return { error: fieldZeroError, lines: "" };
  if (isNaN(+fields)) return { error: fieldStringError, lines: "" };
  return { fields, delimiter, filePath };
};

const readFileContent = (fs, path) => {
  if (fs.existsSync(path))
    return { fileContent: fs.readFileSync(path, "utf8").split("\n") };
  return { fileError: `cut: ${path}: No such File or Directory`, lines: "" };
};

const extractColumnsOfLine = (fileContent, fields, delimiter) => {
  let lines = fileContent.map(line => {
    if (!line.includes(delimiter)) return line;
    line = line.split(delimiter);
    return line[fields[0] - 1];
  });
  return lines;
};

const cut = (cmdLineArgs, fs) => {
  let { fields, delimiter, filePath, error } = parseCmdLineArgs(cmdLineArgs);
  if (error) return { error: error, lines: "" };
  let { fileContent, fileError } = readFileContent(fs, filePath);
  if (fileError) return { error: fileError, lines: "" };
  lines = extractColumnsOfLine(fileContent, fields, delimiter).join("\n");
  return { lines, error: "" };
};

module.exports = {
  extractColumnsOfLine,
  readFileContent,
  parseCmdLineArgs,
  cut
};
