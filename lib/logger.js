const log4js = require('log4js');

module.exports = function(config) {
  function getLogger(filename) {
    var logger = log4js.getLogger(this.getFilename(filename));
    logger.setLevel((config && config.logLevel) || 'INFO');
    return logger;
  }

  function getFilename(filename) {
    return filename ? filename.split('/').slice(-2).join('/') : '';
  }

  return {
    getLogger: getLogger,
    getFilename: getFilename
  };
};
