/*jshint undef:false */
var chai = require('chai');

chai.should();

describe('validator', function () {
    var validator = require('../lib/validator');
    describe('#isNumber', function () {
        it('42 is a number', function () {
            validator.isNumber(42).should.equal(true);
        });
        it('3.14 is a number', function () {
            validator.isNumber(3.14).should.equal(true);
        });
        it('"42" is a number', function () {
            validator.isNumber('42').should.equal(true);
        });
        it('"3.14" is a number', function () {
            validator.isNumber('3.14').should.equal(true);
        });
        it('null is not a number', function () {
            validator.isNumber(null).should.equal(false);
        });
        it('a string is not a number', function () {
            validator.isNumber('a string').should.equal(false);
        });
        it('undefined is not a number', function () {
            var undef;
            validator.isNumber(undef).should.equal(false);
        });
    });
    describe('#isTimestamp', function () {
        it('1000000000001 is a timestamp', function () {
            validator.isTimestamp(1200000000001).should.equal(true);
        });
        it('new Date().getTime() is a timestamp', function () {
            validator.isTimestamp(new Date().getTime()).should.equal(true);
        });
        it('null is not a timestamp', function () {
            validator.isTimestamp(null).should.equal(false);
        });
        it('a string is not a timestamp', function () {
            validator.isTimestamp('a string').should.equal(false);
        });
        it('undefined is not a timestamp', function () {
            var undef;
            validator.isTimestamp(undef).should.equal(false);
        });
        it('999999999999 is not a timestamp', function () {
            validator.isTimestamp(1000000000000).should.equal(false);
        });
    });
});

