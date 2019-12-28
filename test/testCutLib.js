const assert = require('assert');
const {
  extractColumnsOfLine,
  readFileContent,
  parseCmdLineArgs,
  cut
} = require('../src/cutLib');

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

describe('readFileContent', () => {
  it('should give content of the file for valid filepath', () => {
    const fileContent = ['1,2,3,4,5', '11,12,13,14,15', '21,22,23,24,25'];
    const filePath = './sampleText.js';
    const readFileSync = (path, encoding) => {
      const areValidParameters = path === filePath && encoding === 'utf8';
      return areValidParameters && fileContent.join('\n');
    };
    const existsSync = path => path === filePath && true;
    const actual = readFileContent({ readFileSync, existsSync }, filePath);
    assert.deepStrictEqual(actual, { fileContent: fileContent });
  });

  it('should give error for the file for invalid filepath', () => {
    const filePath = './sampleText.js';
    const existsSync = path => path === filePath && false;
    const actual = readFileContent({ existsSync }, filePath);
    const expected = {
      fileError: 'cut: ./sampleText.js: No such File or Directory'
    };
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

describe('cut', function() {
  it('should give particular field of given file', () => {
    const fileContent = ['1,2,3,4', '11,12,13,14', '21,22,23,24'].join('\n');
    const filePath = './sampleText.txt';
    const readFileSync = (path, encoding) => {
      const areValidParameters = path === filePath && encoding === 'utf8';
      return areValidParameters && fileContent;
    };
    const existsSync = path => path === filePath && true;
    const args = ['-f', '3', '-d', ',', filePath];
    const expected = { lines: '3\n13\n23', error: '' };
    assert.deepStrictEqual(cut(args, { readFileSync, existsSync }), expected);
  });

  it('should give error for wrong filePath', () => {
    const filePath = './sampleText.txt';
    const existsSync = path => path === filePath && false;
    const args = ['-f', '3', '-d', ',', filePath];
    const expected = {
      error: 'cut: ./sampleText.txt: No such File or Directory',
      lines: ''
    };
    assert.deepStrictEqual(cut(args, { existsSync }), expected);
  });

  it('should give error for given field is string', function() {
    const filePath = './sampleText.txt';
    const args = ['-f', 'abc', '-d', ',', filePath];
    const expected = {
      error: 'cut: [-cf] list: illegal list value',
      lines: ''
    };
    assert.deepStrictEqual(cut(args), expected);
  });

  it('should give error for given field is zero', function() {
    const filePath = './sampleText.txt';
    const args = ['-f', '0', '-d', ',', filePath];
    const expected = {
      error: 'cut: [-cf] list: values may not include zero',
      lines: ''
    };
    assert.deepStrictEqual(cut(args), expected);
  });
});
