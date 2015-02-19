/*
 Typically invoked by cron.
 */
var RSVP = require('rsvp'),
	home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	graphite = require('./../lib/graphite.js')(config),
	logger = require('log4js-extras')(config).getLogger(__filename),
	telldusAPI = require('./../lib/telldusAPI').API(config),
	telldus = require('./../lib/telldus')(telldusAPI, config);

RSVP.on('error', function (reason) {
	logger.debug(reason);
});

telldus.getSensors().then(telldus.getSensorInfos).then(graphite.logAll);
