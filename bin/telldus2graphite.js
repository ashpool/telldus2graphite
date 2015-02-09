/*
 This script is typically run as a cron job
 */
var RSVP = require('rsvp'),
	home = require('./../lib/homepath'),
	config = require(home.path() + '/.telldus2graphite/config.json'),
	telldus = require('./../lib/telldus.js'),
	graphite = require('./../lib/graphite.js'),
	_ = require('lodash'),
	logger = require('./../lib/logger').getLogger(__filename),
	graphiteClient = graphite(config),
	telldusClient = telldus(config),
	start = new Date().getTime();

RSVP.on('error', function (reason) {
	logger.debug(reason);
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
/*
 sensorInfo example:
 {
 "id":"2813567",
 "clientName":"Hemma",
 "name":"temperature.firstfloor",
 "lastUpdated":1423447479,
 "ignored":0,
 "editable":1,
 "data":[
 {
 "name":"temp",
 "value":"20.8",
 "scale":"0"
 }],
 "protocol":"fineoffset",
 "sensorId":"66",
 "timezoneoffset":3600,
 "battery":"254"}
 */
function log (sensorInfo) {
	var deferred = RSVP.defer();
	if (!sensorInfo) {
		return deferred.reject('sensorInfo must not be empty');
	}
	var promises = sensorInfo.data.map(function (data) {
		var metric = {};
		metric[data.name + '.' + sensorInfo.name] = data.value;
		return graphiteClient.log(metric, (sensorInfo.lastUpdated * 1000) + sensorInfo.timezoneoffset);
	});
	return RSVP.all(promises).then(function (metrics) {
		deferred.resolve(metrics);
	}).catch(function (reason) {
		deferred.reject(reason);
	});
	return deferred;
}

telldusClient.getSensors().then(function (sensors) {
	var promises = sensors.map(telldusClient.getSensorInfo);
	RSVP.allSettled(promises).then(function (results) {
		return filter(results);
	}).then(function (sensorInfos) {
		return sensorInfos.map(log);
	}).then(function (metrics) {
		RSVP.allSettled(metrics).then(function (results) {
			logger.info('', results.length, 'sensors done in', new Date().getTime() - start, 'ms');
		})
	});
});
