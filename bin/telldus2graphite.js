/*
 Typically invoked by cron.
 */
var RSVP = require('rsvp'),
	TelldusAPI = require('telldus-live'),
	home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	graphite = require('./../lib/graphite.js')(config),
	logger = require('./../lib/logger').getLogger(__filename),
	start = new Date().getTime();

RSVP.on('error', function (reason) {
	logger.debug(reason);
});

var telldusAPI = new TelldusAPI.TelldusAPI({
	publicKey: config.telldusPublicKey,
	privateKey: config.telldusPrivateKey
}).login(config.telldusToken, config.telldusTokenSecret, function (err, user) {
		if (!!err) {
			return logger.error('login error: ', err.data);
		}
		logger.info('user: ', user);
	}).on('error', function (err) {
		logger.error('background error: ', err.message);
	}),
	telldus = require('./../lib/telldus.js')(telldusAPI);


function printSummary (metrics) {
	RSVP.allSettled(metrics).then(function (results) {
		logger.info('', results.length, 'sensors done in', new Date().getTime() - start, 'ms');
	});
}

telldus.getSensors().then(telldus.getSensorInfos).then(graphite.logAll).then(printSummary);
