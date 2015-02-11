var assert = require('assert');

describe('logformatter', function () {

	var logformatter = require('../../lib/logformatter'),
		sensorInfo = {
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
		},
		data = {
			name: 'temp',
			value: '20.8',
			scale: '0'
		};

	describe('#format', function () {
		it('client.sensor.type', function (done) {
			assert.equal(logformatter('client.sensor.type').format(sensorInfo, data), 'home.firstfloor.temp');
			done();
		});
		it('client.type.sensor', function (done) {
			assert.equal(logformatter('client.sensor.type').format(sensorInfo, data), 'home.firstfloor.temp');
			done();
		});
		it('sensor.type', function (done) {
			assert.equal(logformatter('sensor.type').format(sensorInfo, data), 'firstfloor.temp');
			done();
		});
		it('type', function (done) {
			assert.equal(logformatter('type').format(sensorInfo, data), 'temp');
			done();
		});
		it('formatString can be empty', function (done) {
			assert.equal(logformatter().format(sensorInfo, data), 'home.firstfloor.temp');
			done();
		});
	});
});