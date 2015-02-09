var RSVP = require('rsvp'),
	graphite = require('graphite'),
	filename = require('./logger').getFilename(__filename),
	logger = require('./logger').getLogger(__filename);

RSVP.on('error', function (reason) {
	logger.debug('uncaught', reason);
});

module.exports = function (config) {
	var client = graphite.createClient(config.graphiteUrl);
	function log (metric, timestamp) {
		return new RSVP.Promise(function (resolve, reject) {
			client.write(metric, timestamp, function (err) {
				if (!!err) {
					reject(err.message +  ' in ' + filename + '.log(metric, timestamp)');
				} else {
					logger.info('logged', metric, new Date(timestamp));
					resolve(metric);
				}
			});
		});
	}
	return {
		log: log
	};
};
