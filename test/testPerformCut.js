const sinon = require('sinon');
const assert = require('assert');
const { cut, getErrorMessage } = require('../src/performCut');

describe('cut', function() {
  it('should give particular field of all lines of given file', function() {
    const userOptions = ['-f', '3', '-d', ',', './sampleText.text'];
    const readStream = { setEncoding: sinon.fake(), on: sinon.fake() };
    const createReadStream = sinon.fake.returns(readStream);
    const callBack = sinon.spy();
    cut(userOptions, { createReadStream }, callBack);
    readStream.on.secondCall.args[1]('a:b,b:c,c:d,d:e,e:f\n1,2,3,4\na,b,c,d');
    assert(createReadStream.calledWith('./sampleText.text'));
    assert.strictEqual(readStream.on.secondCall.args[0], 'data');
    assert.strictEqual(readStream.on.callCount, 2);
    assert(callBack.calledOnceWithExactly({ lines: 'c:d\n3\nc', error: '' }));
  });

  it('should give error for invalid user options', function() {
    const userOptions = ['-f', '0', '-d', ',', './sampleText.txt'];
    const error = 'cut: [-cf] list: values may not include zero';
    const callBack = sinon.fake();
    cut(userOptions, {}, callBack);
    assert.ok(callBack.calledOnceWithExactly({ error, lines: '' }));
  });
});

describe('getErrorMessage', function() {
  it('should give error of absent directory', function() {
    const expected = 'cut: ./sample.txt: No such file or directory';
    assert.strictEqual(getErrorMessage('ENOENT', './sample.txt'), expected);
  });

  it('should give error permission denied for file having no read permissions', function() {
    const expected = 'cut: ./sample.txt: Permission denied';
    assert.strictEqual(getErrorMessage('EACCES', './sample.txt'), expected);
  });

  it('should give error for reading directory', function() {
    const expected = 'cut: ./sample.txt: Is a directory';
    assert.strictEqual(getErrorMessage('EISDIR', './sample.txt'), expected);
  });
});
