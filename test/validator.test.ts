import chaiAsPromised from 'chai-as-promised';
import * as chai from "chai";
import {isNumber, isTimestamp} from '../lib/validator';

chai.should();
chai.use(chaiAsPromised);

describe('validator', () => {
  describe('#isNumber', () => {
    it('42 is a number', () => {
      isNumber(42).should.equal(true);
    });

    it('3.14 is a number', () => {
      isNumber(3.14).should.equal(true);
    });

    it('"42" is a number', () => {
      isNumber('42').should.equal(true);
    });

    it('"3.14" is a number', () => {
      isNumber('3.14').should.equal(true);
    });

    it('null is not a number', () => {
      isNumber(null).should.equal(false);
    });

    it('a string is not a number', () => {
      isNumber('a string').should.equal(false);
    });

    it('undefined is not a number', () => {
      isNumber(undefined).should.equal(false);
    });
  });
  describe('#isTimestamp', () => {
    it('1000000000001 is a timestamp', () => {
      isTimestamp(1200000000001).should.equal(true);
    });

    it('new Date().getTime() is a timestamp', () => {
      isTimestamp(new Date().getTime()).should.equal(true);
    });

    it('null is not a timestamp', () => {
      isTimestamp(null).should.equal(false);
    });

    it('a string is not a timestamp', () => {
      isTimestamp('a string').should.equal(false);
    });

    it('undefined is not a timestamp', () => {
      var undef;
      isTimestamp(undef).should.equal(false);
    });

    it('999999999 is not a timestamp', () => {
      isTimestamp(999999999).should.equal(false);
    });
  });
});

