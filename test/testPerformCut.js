const stream = require('stream');
const sinon = require('sinon');
const assert = require('assert');
const { cut, getErrorMessage } = require('../src/performCut');

describe('cut', function() {
  it('should give particular field of given file', function() {
    const userOptions = ['-f', '3', '-d', ',', './sampleText.text'];
    const interface = new stream.Readable();
    interface._read = () => {};
    const callBack = sinon.fake();
    callBack.setEncoding = sinon.spy();
    const createReadStream = sinon.fake.returns(interface);
    cut(userOptions, { createReadStream, stdin: () => {} }, callBack);
    interface.emit('data', '1,2,3,4\na:b,c:d,e:f,g:h');
    interface.emit('end');
    assert.ok(callBack.calledOnceWithExactly({ lines: '3\ne:f', error: '' }));
  });
});

describe('getErrorMessage', function() {
  it('should give error of absent directory', function() {
    const expected = 'cut: sample.txt: No such file or directory';
    assert.strictEqual(getErrorMessage('ENOENT', 'sample.txt'), expected);
  });

  it('should give error permission denied for file having no read permissions', function() {
    const expected = 'cut: sample.txt: Permission denied';
    assert.strictEqual(getErrorMessage('EACCES', 'sample.txt'), expected);
  });

  it('should give error for reading directory', function() {
    const expected = 'cut: sample.txt: Is a directory';
    assert.strictEqual(getErrorMessage('EISDIR', 'sample.txt'), expected);
  });
});
