/*
 This script is typically run as a cron job
 */
var RSVP = require('rsvp'),
	home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	telldus = require('./../lib/telldus.js')(config),
	graphite = require('./../lib/graphite.js')(config),
	logger = require('./../lib/logger').getLogger(__filename),
	start = new Date().getTime();

RSVP.on('error', function (reason) {
	logger.error(reason);
});

function printSummary (metrics) {
	RSVP.allSettled(metrics).then(function (results) {
		logger.info('', results.length, 'sensors done in', new Date().getTime() - start, 'ms');
	});
}

telldus.getSensors().then(telldus.getSensorInfos).then(graphite.logAll).then(printSummary);
