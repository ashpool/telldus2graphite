/*
 Typically invoked by cron.
 */
var home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	graphite = require('./../lib/graphite.js')(config),
	telldusAPI = require('./../lib/telldusAPI').API(config),
	telldus = require('./../lib/telldus')(telldusAPI, config);

telldus.getSensors().then(telldus.getSensorInfos).then(graphite.logAll);
