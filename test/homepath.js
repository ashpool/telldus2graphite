/*jshint undef:false */
var chai = require('chai');
chai.should();

describe('homepath', function () {
    describe('#path', function () {
        it('output vary depending on OS', function () {
            var home = require('../lib/homepath');
            home.path().should.equal(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
        });
    });
});