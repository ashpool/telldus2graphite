/*jshint undef:false */
var assert = require('assert');

describe('telldus', function () {
	var sensors = {};

	beforeEach(function () {
		sensors = {
			sensor: [{
				id: '2813567',
				name: 'firstfloor',
				lastUpdated: 1423582025,
				ignored: 0,
				client: '58229',
				clientName: 'Hemma',
				online: '1',
				editable: 1,
				battery: 254
			}, {
				id: '2814769',
				name: 'freezer',
				lastUpdated: 1423582285,
				ignored: 0,
				client: '58229',
				clientName: 'Hemma',
				online: '1',
				editable: 1,
				battery: 254
			}, {
				id: '2813556',
				name: 'fridge',
				lastUpdated: 1423582490,
				ignored: 0,
				client: '58229',
				clientName: 'Hemma',
				online: '1',
				editable: 1,
				battery: 254
			}]
		};
	});

	describe('#getSensors()', function () {
		it('returns an array of sensors - if everything works fine', function (done) {
			var telldusAPI = {
				getSensors: function (cb) {
					return cb(null, sensors);
				}
			};
			var telldus = require('../lib/telldus')(telldusAPI);
			telldus.getSensors().then(function (value) {
				assert.equal(value, sensors);
				done();
			});
		});
		it('handles failure - if the API fails', function (done) {
			var telldusAPI = {
				getSensors: function (cb) {
					var err = {};
					err.message = 'failure';
					return cb(err, sensors);
				}
			};
			var telldus = require('../lib/telldus')(telldusAPI);
			telldus.getSensors().then(function (value) {
				assert.fail(value);
			}).catch(function (rejection) {
				assert.equal(rejection, 'failure');
				done();
			});
		});
	});
});