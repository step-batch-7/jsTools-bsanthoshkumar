const assert = require('assert');
const { extractColumnsOfLine, parseCmdLineArgs } = require('../src/cutLib');

describe('extractColumnsOfLine', () => {
  it('should give extracted content of each line for comma delimter', () => {
    const fileContent = ['a,b,c,d,e', 'f,g,h,i,j', 'k,l,m,n,o'];
    const fields = ['5'];
    const delimiter = ',';
    const actual = extractColumnsOfLine(fileContent, fields, delimiter);
    assert.deepStrictEqual(actual, ['e', 'j', 'o']);
  });

  it('should give extracted content of each line for hypen delimter', () => {
    const fileContent = ['a-b-c-d-e', 'f-g-h-i-j', 'k-l-m-n-o'];
    const fields = ['3'];
    const delimiter = '-';
    const actual = extractColumnsOfLine(fileContent, fields, delimiter);
    assert.deepStrictEqual(actual, ['c', 'h', 'm']);
  });

  it('should give whole line for given delimiter is not included', () => {
    const fileContent = ['a-b-c-d-e', 'f-g-h-i-j', 'k-l-m-n-o'];
    const fields = ['3'];
    const delimiter = ',';
    const actual = extractColumnsOfLine(fileContent, fields, delimiter);
    const expected = ['a-b-c-d-e', 'f-g-h-i-j', 'k-l-m-n-o'];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('parseCmdLineArgs', () => {
  it('should give parsed commandLine args', () => {
    const args = ['-f', '3', '-d', ',', './sampleText.js'];
    const expected = {
      filePath: './sampleText.js',
      fields: '3',
      delimiter: ','
    };
    assert.deepStrictEqual(parseCmdLineArgs(args), expected);
  });

  it('should give error for commandLine args of field 0', () => {
    const args = ['-f', '0', '-d', ',', './sampleText.js'];
    const expected = { error: 'cut: [-cf] list: values may not include zero' };
    assert.deepStrictEqual(parseCmdLineArgs(args), expected);
  });

  it('should give error for commandLine args of field string', () => {
    const args = ['-f', 'a', '-d', ',', './sampleText.js'];
    const expected = { error: 'cut: [-cf] list: illegal list value' };
    assert.deepStrictEqual(parseCmdLineArgs(args), expected);
  });
});
