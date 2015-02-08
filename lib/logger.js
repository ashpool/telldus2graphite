const log4js = require('log4js'),
	properties = require('../config.json');

module.exports = {
	getLogger: function getLogger (filename) {
		var logger = log4js.getLogger(filename.split('/').slice(-2).join('/'));
		logger.setLevel(properties.debugLevel || 'INFO');
		return logger;
	}
};