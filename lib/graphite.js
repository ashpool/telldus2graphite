var graphite = require('graphite-promise'),
  validator = require('./validator');

/*
 Anatomy of a sensorInfo:
 */

module.exports = function(config) {
  const metric = require('./metric')(config.format);
  const client = config.client || graphite.createClient(config);

  function logMetric(metric, timestamp) {
    return client.write(metric, timestamp);
  }

  function _logSensorInfo(sensorInfo) {
    return new Promise(function(resolve, reject) {
      if (!sensorInfo) {
        return reject(new Error('sensorInfo must not be empty'));
      }
      if (!sensorInfo.name) {
        return reject(new Error('sensorInfo must have a name'));
      }
      if (!validator.isTimestamp(sensorInfo.lastUpdated)) {
        return reject(new Error('lastUpdated is not a timestamp'));
      }
      const promises = sensorInfo.data.map(function(data) {
        if (!data.name) {
          return reject(new Error('data must have a name'));
        }
        if (!validator.isNumber(data.value)) {
          return reject(new Error('data must have a numeric value'));
        }
        const m = metric.create(sensorInfo, data),
          ts = (sensorInfo.lastUpdated * 1000) + sensorInfo.timezoneoffset || 0;
        return logMetric(m, ts);
      });
      return Promise.all(promises).then(function(metric) {
        resolve(metric);
      }, function(error) {
        reject(error);
      });
    });
  }

  /**
   * Log all sensor infos
   * @param sensorInfos list of sensor infos
   */
  function logAll(sensorInfos) {
    return Promise.all(sensorInfos.filter( s => s.name).map(_logSensorInfo));
  }

  return {
    logAll: logAll,
    _logSensorInfo: _logSensorInfo
  };
};
