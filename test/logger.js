/*jshint undef:false */
var chai = require('chai'),
  expect = chai.expect;

describe('logger', function() {
  it('config and filename are optional', function() {
    var logger = require('../lib/logger')().getLogger();
    logger.info('config is optional and this call should not cause an error');
  });
  describe('#getFilename', function() {
    it('returns 2 last path fragments of the filename', function() {
      var logger = require('../lib/logger')({});
      expect(logger.getFilename(__filename)).to.equal('test/logger.js');
    });
  });
});
