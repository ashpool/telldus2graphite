/*
 Typically invoked by cron.
 */
var home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	graphite = require('./../lib/graphite.js')(config),
	logger = require('log4js-extras')(config).getLogger(__filename);
config.logger = logger;
var telldus = require('telldus-live-promise'),
	client = telldus.Client(config),
	sensors = telldus.Sensors(client);

sensors.getSensors().then(sensors.getSensorInfos).then(graphite.logAll).catch(logger.error);
