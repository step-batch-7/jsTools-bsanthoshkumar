const parseCmdLineArgs = userOptions => {
  const [, fields, , delimiter, filePath] = userOptions;
  const fieldZeroValue = 0;
  if (+fields === fieldZeroValue) {
    return { error: 'cut: [-cf] list: values may not include zero' };
  }
  if (isNaN(+fields)) {
    return { error: 'cut: [-cf] list: illegal list value' };
  }
  return { fields, delimiter, filePath };
};

const readFileContent = (fs, path) => {
  if (fs.existsSync(path)) {
    return { fileContent: fs.readFileSync(path, 'utf8').split('\n') };
  }
  return { fileError: `cut: ${path}: No such File or Directory` };
};

const extractColumnsOfLine = (fileContent, fields, delimiter) => {
  fields = --fields;
  const lines = fileContent.map(line => {
    if (!line.includes(delimiter)) {
      return line;
    }
    line = line.split(delimiter);
    return line[fields];
  });
  return lines;
};

module.exports = {
  extractColumnsOfLine,
  readFileContent,
  parseCmdLineArgs
};
