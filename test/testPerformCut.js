const cut = require('../src/performCut');
const assert = require('assert');

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
