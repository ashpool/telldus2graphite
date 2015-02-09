var RSVP = require('rsvp'),
	graphite = require('graphite'),
	filename = require('./logger').getFilename(__filename),
	logger = require('./logger').getLogger(__filename);

RSVP.on('error', function (reason) {
	logger.debug('uncaught', reason);
});

module.exports = function (config) {
	var client = graphite.createClient(config.graphiteUrl);
	function logMetric (metric, timestamp) {
		return new RSVP.Promise(function (resolve, reject) {
			client.write(metric, timestamp, function (err) {
				if (!!err) {
					reject(err.message +  ' in ' + filename + '.log(metric, timestamp)');
				} else {
					logger.info('logged', metric, new Date(timestamp));
					resolve(metric);
				}
			});
		});
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
	function logSensorInfo (sensorInfo) {
		var deferred = RSVP.defer();
		if (!sensorInfo) {
			return deferred.reject('sensorInfo must not be empty');
		}
		var promises = sensorInfo.data.map(function (data) {
			var metric = {};
			metric[data.name + '.' + sensorInfo.name] = data.value;
			return logMetric(metric, (sensorInfo.lastUpdated * 1000) + sensorInfo.timezoneoffset);
		});
		return RSVP.all(promises).then(function (metrics) {
			deferred.resolve(metrics);
		}).catch(function (reason) {
			deferred.reject(reason);
		});
		return deferred;
	}

	function logAll (sensorInfos) {
		return sensorInfos.map(logSensorInfo);
	}

	return {
		logAll: logAll
	};
};
