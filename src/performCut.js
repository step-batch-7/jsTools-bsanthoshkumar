const { parseCmdLineArgs, extractColumnsOfLine } = require('./cutLib');

const getErrorMessage = (errcode, filePath) => {
  const errorMessages = {
    EACCES: `cut: ${filePath}: Permission denied`,
    ENOENT: `cut: ${filePath}: No such file or directory`,
    EISDIR: `cut: ${filePath}: Is a directory`
  };
  return errorMessages[errcode];
};

const cut = (userOptions, { createReadStream, stdin }, write) => {
  const { fields, delimiter, filePath, error } = parseCmdLineArgs(userOptions);
  if (error) {
    write({ error: error, lines: '' });
    return;
  }
  const inputStream = filePath ? createReadStream(filePath) : stdin;
  inputStream.setEncoding('utf8');
  inputStream.on('error', error =>
    write({ error: getErrorMessage(error.code, filePath), lines: '' })
  );
  inputStream.on('data', data => {
    const content = data.split('\n');
    write({
      lines: extractColumnsOfLine(content, fields, delimiter).join('\n'),
      error: ''
    });
  });
  inputStream.on('end', () => {});
};

module.exports = { cut, getErrorMessage };
