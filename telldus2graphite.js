#!/usr/local/bin/node
/*
 This script is typically run as a cron job
 */
var RSVP = require('rsvp'),
	config = require('./config.json'),
	telldus = require('./lib/telldus.js'),
	graphite = require('./lib/graphite.js'),
	_ = require('lodash'),
	logger = require('./lib/logger').getLogger(__filename),
	graphiteClient = graphite(config),
	telldusClient = telldus(config),
	start = new Date().getTime();

RSVP.on('error', function (reason) {
	logger.error(reason);
});

function filter (results) {
	_(results)
		.where({state: 'rejected'})
		.pluck('reason')
		.forEach(function (error) {
			logger.error(error);
		});
	return _.pluck(results, 'value');
}

function log (sensorInfo) {
	var metric = {};
	metric[sensorInfo.name] = sensorInfo.data[0].value;
	return graphiteClient.log(metric, sensorInfo.lastUpdated * 1000);
}

telldusClient.getSensors().then(function (sensors) {
	var promises = sensors.map(telldusClient.getSensorInfo);
	RSVP.allSettled(promises).then(function (results) {
		return filter(results);
	}, function (error) {
		logger.error(error);
	}).then(function (sensorInfos) {
		return sensorInfos.map(function (sensorInfo) {
			if (sensorInfo) {
				return log(sensorInfo);
			}
		});
	}).then(function (metrics) {
		RSVP.allSettled(metrics).then(function (results) {
			logger.info('', results.length, 'sensors done in', new Date().getTime() - start, 'ms');
		})
	});
});
