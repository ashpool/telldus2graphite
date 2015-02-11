/*jshint undef:false */
var chai = require('chai'),
	expect = chai.expect;

describe('metric', function () {

	var metric = require('../lib/metric.js'),
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
		it('client.sensor.type', function () {
			var m = metric('client.sensor.type').create(sensorInfo, data);
			expect(m.home.firstfloor.temp).to.equal('20.8');
		});
		it('client.type.sensor', function () {
			var m = metric('client.type.sensor').create(sensorInfo, data);
			expect(m.home.temp.firstfloor).to.equal('20.8');
		});
		it('sensor.type', function () {
			var m = metric('sensor.type').create(sensorInfo, data);
			expect(m.firstfloor.temp).to.equal('20.8');
		});
		it('type', function () {
			var m = metric('type').create(sensorInfo, data);
			expect(m.temp).to.equal('20.8');
		});
		it('formatString can be empty - will default to home.firstfloor.temp', function () {
			var m = metric().create(sensorInfo, data);
			expect(m.home.firstfloor.temp).to.equal('20.8');
		});
	});
});