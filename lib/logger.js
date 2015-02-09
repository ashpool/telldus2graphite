const log4js = require('log4js');

module.exports = {
	getLogger: function getLogger (filename) {
		var logger = log4js.getLogger(this.getFilename(filename));
		logger.setLevel('INFO');
		return logger;
	},
	getFilename: function getFileName(filename) {
		return filename.split('/').slice(-2).join('/');
	}
};