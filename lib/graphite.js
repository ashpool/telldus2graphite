var RSVP = require('rsvp'),
    graphite = require('graphite'),
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
                    return reject(err);
                }
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
                    if(!validator.isNumber(data.value)) {
                        return reject(new Error('data contains no numeric value'));
                    }
                    var m = metric.create(sensorInfo, data),
                        ts = (sensorInfo.lastUpdated * 1000) + sensorInfo.timezoneoffset;
                    if (!validator.isTimestamp(ts)) {
                        return reject(new Error('Not a timestamp'));
                    }
                    return logMetric(m, ts);
                });
                return RSVP.all(promises).then(function (metric) {
                    resolve(metric);
                }).catch(function (reason) {
                    reject(reason);
                });
            }
        });
    }

    /**
     * Log all sensor infos
     * @param sensorInfos list of sensor infos
     * @returns {RSVP.Promise} containing an array of rejected sensor infos
     */
    function logAll (sensorInfos) {
        return RSVP.allSettled(sensorInfos.map(logSensorInfo)).then(function (results) {
            var fulfilleds = _.pluck(_.where(results, {state: 'fulfilled'}), 'value');
            var rejects = _.pluck(_.where(results, {state: 'rejected'}), 'reason');
            fulfilleds.map(function(fulfilled){
                logger.info('Logged:', fulfilled);
            });
            rejects.map(function(rejected){
                logger.info('Rejected:', rejected);
            })
        });
    }

    return {
        logAll: logAll,
        logMetric: logMetric
    };
};