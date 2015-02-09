const TEN_MINUTES_IN_MS = 600000;

var RSVP = require('rsvp'),
	TelldusAPI = require('telldus-live'),
	filename = require('./logger').getFilename(__filename),
	logger = require('./logger').getLogger(__filename);

// Called when an uncaught error occurs within a promise
RSVP.on('error', function (reason) {
	logger.debug('uncaught', reason);
});

module.exports = function (config) {
	var cloud = new TelldusAPI.TelldusAPI({
		publicKey: config.telldusPublicKey
		, privateKey: config.telldusPrivateKey
	}).login(config.telldusToken, config.telldusTokenSecret, function (err, user) {
			if (!!err) {
				return logger.error('login error: ', err.data);
			}
			logger.info('user: ', user);
		}).on('error', function (err) {
			logger.error('background error: ', err.message);
		});

	function getSensorInfo (sensor) {
		return new RSVP.Promise(function (resolve, reject) {
			cloud.getSensorInfo(sensor, function (err, sensorInfo) {
				if (!!err) {
					reject(err.message);
				} else {
					if (new Date().getTime() - (sensorInfo.lastUpdated * 1000) > TEN_MINUTES_IN_MS) {
						reject(sensorInfo.name + ' too old ' + new Date(sensorInfo.lastUpdated * 1000));
					} else {
						resolve(sensorInfo);
					}
				}
			});
		});
	}

	function getSensors () {
		return new RSVP.Promise(function (resolve, reject) {
			cloud.getSensors(function (err, sensors) {
				if (!!err) {
					reject(err.message);
				} else {
					resolve(sensors);
				}
			});
		});
	}

	return {getSensors: getSensors, getSensorInfo: getSensorInfo};
};
