var RSVP = require('rsvp'),
	graphite = require('graphite');

/*
 Anatomy of a sensorInfo:
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

module.exports = function (config) {
	var logger = require('log4js-extras')(config).getLogger(__filename),
		client = graphite.createClient(config.graphiteUrl),
		metric = require('./metric')(config.format);

	RSVP.on('error', function (reason) {
		logger.debug('uncaught', reason);
	});

	function logMetric (metric, timestamp) {
		return new RSVP.Promise(function (resolve, reject) {
			client.write(metric, timestamp, function (err) {
				if (!!err) {
					return reject(err.message + ' in ' + filename + '.log(metric, timestamp)');
				}
				logger.info('logged', metric, new Date(timestamp));
				resolve(metric);
			});
		});
	}

	function logSensorInfo (sensorInfo) {
		return new RSVP.Promise(function (resolve, reject) {
			if (!sensorInfo) {
				reject('sensorInfo must not be empty');
			} else {
				var promises = sensorInfo.data.map(function (data) {
					var m = metric.create(sensorInfo, data);
					return logMetric(m, (sensorInfo.lastUpdated * 1000) + sensorInfo.timezoneoffset);
				});
				return RSVP.all(promises).then(function (metric) {
					resolve(metric);
				}).catch(function (reason) {
					reject(reason);
				});
			}
		});
	}

	function logAll (sensorInfos) {
		return sensorInfos.map(logSensorInfo);
	}

	return {
		logAll: logAll
	};
};