import {Config} from "../lib/types";

describe('graphite', () => {
  const config = {} as Config;
  const graphite = require('./../lib/graphite')(config);

  describe('#_logSensorInfo', () => {
    it('rejects if sensorInfo is empty', () => {
      expect(graphite._logSensorInfo(undefined)).rejects.toEqual('sensorInfo must not be empty');
    });

    it('rejects if sensorInfo is null', () => {
      expect(graphite._logSensorInfo(null)).rejects.toEqual('sensorInfo must not be empty');
    });

    it('rejects if sensorInfo has no name', () => {
      expect(graphite._logSensorInfo({})).rejects.toEqual('sensorInfo must have a name');
    });

    it('rejects if sensorInfo.data[0] has no name', () => {
      const sensorInfo = {
        id: '3152120',
        clientName: 'home',
        lastUpdated: 1427600042,
        name: 'outdoor',
        data: [{value: 1.6, scale: 0}]
      };
      expect(graphite._logSensorInfo(sensorInfo)).rejects.toEqual('data must have a name');
    });

    it('rejects if sensorInfo.data[0] has no value', () => {
      const sensorInfo = {
        id: '3152120',
        clientName: 'home',
        lastUpdated: 1427600042,
        name: 'outdoor',
        data: [{name: 'temp', value: 'not a numeric value', scale: 0}]
      };
      expect(graphite._logSensorInfo(sensorInfo)).rejects.toEqual('data must have a numeric value');
    });

    it('rejects if timestamp is invalid', () => {
      const sensorInfo = {
        id: '3152120',
        clientName: 'home',
        name: 'outdoor',
        lastUpdated: 'invalid',
        ignored: 0,
        editable: 1,
        data: [{name: 'temp', value: 1.6, scale: 0}],
        protocol: 'fineoffset',
        sensorId: 37,
        timezoneoffset: 7200,
        battery: 254,
        keepHistory: 0
      };
      expect(graphite._logSensorInfo(sensorInfo)).rejects.toEqual('lastUpdated is not a timestamp');
    });
  });
});
