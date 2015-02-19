/*
 Typically invoked by cron.
 */
var home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	graphite = require('./../lib/graphite.js')(config),
	telldusClient = require('telldus-live').Client(config),
	telldus = require('telldus-live').Promise(telldusClient, config);

telldus.getSensors().then(telldus.getSensorInfos).then(graphite.logAll);
