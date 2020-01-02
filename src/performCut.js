'use strict';
const { parseCmdLineArgs, extractColumnsOfLine } = require('./cutLib');

const getErrorMessage = (errcode, filePath) => {
  const errorMessages = {
    EACCES: `cut: ${filePath}: Permission denied`,
    ENOENT: `cut: ${filePath}: No such file or directory`,
    EISDIR: `cut: ${filePath}: Is a directory`
  };
  return errorMessages[errcode];
};

const cut = (userOptions, { createReadStream, createStdin }, onComplete) => {
  const { fields, delimiter, filePath, error } = parseCmdLineArgs(userOptions);
  if (error) {
    onComplete({ error: error, lines: '' });
    return;
  }
  const inputStream = filePath ? createReadStream(filePath) : createStdin();
  inputStream.setEncoding('utf8');
  inputStream.on('error', error =>
    onComplete({ error: getErrorMessage(error.code, filePath), lines: '' })
  );
  inputStream.on('data', data => {
    const content = data.split('\n');
    const lines = extractColumnsOfLine(content, fields, delimiter).join('\n');
    onComplete({ lines, error: '' });
  });
};

module.exports = { cut, getErrorMessage };
