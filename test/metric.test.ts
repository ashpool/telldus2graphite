import chaiAsPromised from 'chai-as-promised';
import * as chai from "chai";
import Metric from '../lib/metric';

chai.should();
chai.use(chaiAsPromised);

describe('metric', () => {
    const sensorInfo = {
      id: '2813567',
      clientName: 'home',
      name: 'firstfloor',
      lastUpdated: 1423447479,
      ignored: 0,
      editable: 1,
      data: [
        {
          name: 'temp',
          value: '20.8',
          scale: '0'
        }],
      protocol: 'fineoffset',
      sensorId: '66',
      timezoneoffset: 3600,
      battery: '254'
    };
    const data = {
      name: 'temp',
      value: '20.8',
      scale: '0'
    };

  describe('#create', () => {
    it('client.sensor.type', () => {
      const m = Metric('client.sensor.type').create(sensorInfo, data);
      m.home.firstfloor.temp.should.equal(20.8);
    });

    it('client.type.sensor', () => {
      const m = Metric('client.type.sensor').create(sensorInfo, data);
      m.home.temp.firstfloor.should.equal(20.8);
    });

    it('sensor.type', () => {
      const m = Metric('sensor.type').create(sensorInfo, data);
      m.firstfloor.temp.should.equal(20.8);
    });

    it('type', () => {
      const m = Metric('type').create(sensorInfo, data);
      m.temp.should.equal(20.8);
    });

    it('formatString can be empty - will default to home.firstfloor.temp', () => {
      const m = Metric().create(sensorInfo, data);
      m.home.firstfloor.temp.should.equal(20.8);
    });
  });
});
