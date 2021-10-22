import {isNumber, isTimestamp} from '../lib/validator';

describe('validator', () => {
  describe('#isNumber', () => {
    it('42 is a number', () => {
      expect(isNumber(42)).toBeTruthy();
    });

    it('3.14 is a number', () => {
      expect(isNumber(3.14)).toBeTruthy();
    });

    it('"42" is a number', () => {
      expect(isNumber('42')).toBeTruthy();
    });

    it('"3.14" is a number', () => {
      expect(isNumber('3.14')).toBeTruthy();
    });

    it('null is not a number', () => {
      expect(isNumber(null)).toBeFalsy();
    });

    it('a string is not a number', () => {
      expect(isNumber('a string')).toBeFalsy();
    });

    it('undefined is not a number', () => {
      expect(isNumber(undefined)).toBeFalsy();
    });
  });
  describe('#isTimestamp', () => {
    it('1000000000001 is a timestamp', () => {
      expect(isTimestamp(1200000000001)).toBeTruthy();
    });

    it('new Date().getTime() is a timestamp', () => {
      expect(isTimestamp(new Date().getTime())).toBeTruthy();
    });

    it('null is not a timestamp', () => {
      expect(isTimestamp(null)).toBeFalsy();
    });

    it('a string is not a timestamp', () => {
      expect(isTimestamp('a string')).toBeFalsy();
    });

    it('undefined is not a timestamp', () => {
      expect(isTimestamp(undefined)).toBeFalsy();
    });

    it('999999999 is not a timestamp', () => {
      expect(isTimestamp(999999999)).toBeFalsy();
    });
  });
});

