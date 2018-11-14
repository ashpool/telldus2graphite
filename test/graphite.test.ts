import chaiAsPromised from 'chai-as-promised';
import * as chai from "chai";

chai.should();
chai.use(chaiAsPromised);

describe('graphite', () => {
  const config = {};
  const graphite = require('./../lib/graphite')(config);

  describe('#_logSensorInfo', () => {
    it('rejects if sensorInfo is empty', (done) => {
      graphite._logSensorInfo(undefined).should.eventually.be.rejectedWith('sensorInfo must not be empty').and.notify(done);
    });

    it('rejects if sensorInfo is null', (done) => {
      graphite._logSensorInfo(null).should.eventually.be.rejectedWith('sensorInfo must not be empty').and.notify(done);
    });

    it('rejects if sensorInfo has no name', (done) => {
      graphite._logSensorInfo({}).should.eventually.be.rejectedWith('sensorInfo must have a name').and.notify(done);
    });

    it('rejects if sensorInfo.data[0] has no name', (done) => {
      const sensorInfo = {
        id: '3152120',
        clientName: 'home',
        lastUpdated: 1427600042,
        name: 'outdoor',
        data: [{value: 1.6, scale: 0}]
      };
      graphite._logSensorInfo(sensorInfo).should.eventually.be.rejectedWith('data must have a name').and.notify(done);
    });

    it('rejects if sensorInfo.data[0] has no value', (done) => {
      const sensorInfo = {
        id: '3152120',
        clientName: 'home',
        lastUpdated: 1427600042,
        name: 'outdoor',
        data: [{name: 'temp', value: 'not a numeric value', scale: 0}]
      };
      graphite._logSensorInfo(sensorInfo).should.eventually.be.rejectedWith('data must have a numeric value').and.notify(done);
    });

    it('rejects if timestamp is invalid', (done) => {
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
      graphite._logSensorInfo(sensorInfo).should.eventually.be.rejectedWith('lastUpdated is not a timestamp').and.notify(done);
    });
  });
});
