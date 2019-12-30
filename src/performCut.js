const { parseCmdLineArgs, extractColumnsOfLine } = require('./cutLib');

const cut = (userOptions, { createReadStream, stdin }, write) => {
  const { fields, delimiter, filePath, error } = parseCmdLineArgs(userOptions);
  if (error) {
    write({ error: error, lines: '' });
    return;
  }
  const inputStream = filePath ? createReadStream(filePath) : stdin;
  inputStream.setEncoding('utf8');
  inputStream.on('error', error =>
    write({
      error: `cut: ${filePath}: No such File or Directory`,
      lines: ''
    })
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

module.exports = cut;
