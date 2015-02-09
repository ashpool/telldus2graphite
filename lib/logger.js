const log4js = require('log4js');

module.exports = {
	getLogger: function getLogger (filename) {
		var logger = log4js.getLogger(filename.split('/').slice(-2).join('/'));
		logger.setLevel('INFO');
		return logger;
	}
};