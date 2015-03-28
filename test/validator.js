/*jshint undef:false */
var chai = require('chai');

chai.should();

describe('validator', function () {
    var validator = require('../lib/validator');
    describe('#isNumber', function () {
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
    });
    describe('#isTimestamp', function () {
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
        it('1000000000000 is not a timestamp', function () {
            validator.isTimestamp(1000000000000).should.equal(false);
        });
        it('1200000000001 is a timestamp', function () {
            validator.isTimestamp(1200000000001).should.equal(true);
        });
    });
});

