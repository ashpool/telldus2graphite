/*
 Typically invoked by cron.
 */
var home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	graphite = require('./../lib/graphite.js')(config),
	client = require('telldus-live-promise').Client(config),
	sensors = require('telldus-live-promise').Sensors(client),
	logger = require('log4js-extras')(config).getLogger(__filename);

sensors.getSensors().then(sensors.getSensorInfos).then(graphite.logAll).catch(logger.error);
