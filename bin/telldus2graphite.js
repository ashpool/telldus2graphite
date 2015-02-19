/*
 Typically invoked by cron.
 */
var home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	graphite = require('./../lib/graphite.js')(config),
	telldusClient = require('telldus-live-promise').Client(config),
	telldus = require('telldus-live-promise').Telldus(telldusClient, config);

telldus.getSensors().then(telldus.getSensorInfos).then(graphite.logAll);
