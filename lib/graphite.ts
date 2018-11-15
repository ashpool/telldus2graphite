// @ts-ignore
import {GraphiteClient} from 'graphite-promise';
import validator from './validator';

module.exports = function(config: Record<string, string>) {
  const metric = require('./metric')(config.format);
  const client = config.client || new GraphiteClient(config);

  function logMetric(metric: Record<string, any>, timestamp: number) {
    return client.write(metric, timestamp);
  }

  function _logSensorInfo(sensorInfo: Record<string, any>) {
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
      // @ts-ignore
      const promises = sensorInfo.data.map(data => {
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
      return Promise.all(promises).then((metric) => {
        resolve(metric);
      }, (error: Error) => {
        reject(error);
      });
    });
  }

  /**
   * Log all sensor infos
   * @param sensorInfos list of sensor infos
   */
  function logAll(sensorInfos: Record<string, any>[]) {
    return Promise.all(sensorInfos.filter( s => s.name).map(_logSensorInfo));
  }

  function end() {
    client.end();
  }

  return {
    logAll: logAll,
    end: end,
    _logSensorInfo: _logSensorInfo
  };
};
