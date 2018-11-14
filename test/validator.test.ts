import chaiAsPromised from 'chai-as-promised';
import * as chai from "chai";

chai.should();
chai.use(chaiAsPromised);

describe('validator', () => {
  var validator = require('../lib/validator');
  describe('#isNumber', () => {
    it('42 is a number', () => {
      validator.isNumber(42).should.equal(true);
    });

    it('3.14 is a number', () => {
      validator.isNumber(3.14).should.equal(true);
    });

    it('"42" is a number', () => {
      validator.isNumber('42').should.equal(true);
    });

    it('"3.14" is a number', () => {
      validator.isNumber('3.14').should.equal(true);
    });

    it('null is not a number', () => {
      validator.isNumber(null).should.equal(false);
    });

    it('a string is not a number', () => {
      validator.isNumber('a string').should.equal(false);
    });

    it('undefined is not a number', () => {
      validator.isNumber(undefined).should.equal(false);
    });
  });
  describe('#isTimestamp', () => {
    it('1000000000001 is a timestamp', () => {
      validator.isTimestamp(1200000000001).should.equal(true);
    });

    it('new Date().getTime() is a timestamp', () => {
      validator.isTimestamp(new Date().getTime()).should.equal(true);
    });

    it('null is not a timestamp', () => {
      validator.isTimestamp(null).should.equal(false);
    });

    it('a string is not a timestamp', () => {
      validator.isTimestamp('a string').should.equal(false);
    });

    it('undefined is not a timestamp', () => {
      var undef;
      validator.isTimestamp(undef).should.equal(false);
    });

    it('999999999 is not a timestamp', () => {
      validator.isTimestamp(999999999).should.equal(false);
    });
  });
});

