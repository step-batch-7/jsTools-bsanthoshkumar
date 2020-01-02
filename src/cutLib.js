'use strict';
const parseUserOptions = userOptions => {
  const [, fields, , delimiter, filePath] = userOptions;
  const fieldZeroValue = 0;
  if (+fields === fieldZeroValue) {
    return { error: 'cut: [-cf] list: values may not include zero' };
  }
  if (isNaN(+fields)) {
    return { error: 'cut: [-cf] list: illegal list value' };
  }
  if (delimiter === '-f') {
    return { error: 'cut: bad delimiter' };
  }
  return { fields, delimiter, filePath };
};

const extractColumnsOfLines = (lines, fields, delimiter) => {
  const extraFieldValue = 1;
  const columnNumber = fields - extraFieldValue;
  const rows = lines.map(line => {
    if (!line.includes(delimiter)) {
      return line;
    }
    const row = line.split(delimiter);
    return row[columnNumber];
  });
  return rows;
};

module.exports = {
  extractColumnsOfLines,
  parseUserOptions
};
