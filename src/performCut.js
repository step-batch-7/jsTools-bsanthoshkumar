'use strict';
const { parseUserOptions, extractColumnsOfLines } = require('./cutLib');

const getErrorMessage = (errcode, filePath) => {
  const errorMessages = {
    EACCES: `cut: ${filePath}: Permission denied`,
    ENOENT: `cut: ${filePath}: No such file or directory`,
    EISDIR: `cut: ${filePath}: Is a directory`
  };
  return errorMessages[errcode];
};

const cut = (userOptions, { createReadStream, createStdin }, onComplete) => {
  const { fields, delimiter, filePath, error } = parseUserOptions(userOptions);
  if (error) {
    onComplete({ error: error, rows: '' });
    return;
  }
  const inputStream = filePath ? createReadStream(filePath) : createStdin();
  inputStream.setEncoding('utf8');
  inputStream.on('error', error =>
    onComplete({ error: getErrorMessage(error.code, filePath), rows: '' })
  );
  inputStream.on('data', data => {
    const lines = data.split('\n');
    const rows = extractColumnsOfLines(lines, fields, delimiter).join('\n');
    onComplete({ rows, error: '' });
  });
};

module.exports = { cut, getErrorMessage };
