var RSVP = require('rsvp'),
	graphite = require('graphite'),
	logger = require('./logger').getLogger(__filename);

module.exports = function (config) {
	var client = graphite.createClient(config.graphiteUrl);
	function log (metric, timestamp) {
		return new RSVP.Promise(function (resolve, reject) {
			client.write(metric, timestamp, function (err) {
				if (!!err) {
					var error = 'log(metric) failed:' + err.message;
					logger.error(error);
					reject(error);
				} else {
					logger.info('logged', metric);
					resolve(metric);
				}
			});
		});
	}
	return {
		log: log
	};
};
