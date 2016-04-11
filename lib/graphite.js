var RSVP = require('rsvp'),
    graphite = require('graphite-promise'),
    _ = require('lodash'),
    validator = require('./validator');

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
    var logger = require('./logger')(config).getLogger(__filename),
        metric = require('./metric')(config.format),
        client;

    RSVP.on('error', function (reason) {
        logger.debug('uncaught', reason);
    });

    function logMetric (metric, timestamp) {
        return client.write(metric, timestamp);
    }

    function _logSensorInfo (sensorInfo) {
        return new RSVP.Promise(function (resolve, reject) {
            if (!sensorInfo) {
                return reject(new Error('sensorInfo must not be empty'));
            }
            if (!sensorInfo.name) {
                return reject(new Error('sensorInfo must have a name'));
            }
            if (!validator.isTimestamp(sensorInfo.lastUpdated)) {
                return reject(new Error('lastUpdated is not a timestamp'));
            }
            var promises = sensorInfo.data.map(function (data) {
                if (!data.name) {
                    return reject(new Error('data must have a name'));
                }
                if (!validator.isNumber(data.value)) {
                    return reject(new Error('data must have a numeric value'));
                }
                var m = metric.create(sensorInfo, data),
                    ts = (sensorInfo.lastUpdated * 1000) + sensorInfo.timezoneoffset || 0;
                return logMetric(m, ts);
            });
            return RSVP.all(promises).then(function (metric) {
                resolve(metric);
            }, function (error) {
                logger.error(error); // typically network problem
                reject(error);
            });
        });
    }

    /**
     * Log all sensor infos
     * @param sensorInfos list of sensor infos
     */
    function logAll (sensorInfos) {
        client = graphite.createClient(config.graphiteUrl);
        return RSVP.allSettled(sensorInfos.map(_logSensorInfo)).then(function (results) {
            var fulfilleds = _.map(_.filter(results, {state: 'fulfilled'}), 'value');
            var rejects = _.map(_.filter(results, {state: 'rejected'}), 'reason');
            fulfilleds.map(function (fulfilled) {
                logger.info('Logged:', JSON.stringify(fulfilled));
            });
            rejects.map(function (rejected) {
                logger.warn('Rejected:', rejected);
            });
        }).catch(function (error) {
            logger.error(error);
        }).finally(function () {
            client.end();
        });
    }

    return {
        logAll: logAll,
        _logSensorInfo: _logSensorInfo
    };
};
