var RSVP = require('rsvp');
var assert = require("assert")

describe('telldus', function () {
	describe('#getSensors()', function () {
		it('should return an array of sensors', function (done) {
			var sensors = {
					"sensor": [{
						"id": "2813567",
						"name": "firstfloor",
						"lastUpdated": 1423582025,
						"ignored": 0,
						"client": "58229",
						"clientName": "Hemma",
						"online": "1",
						"editable": 1,
						"battery": 254
					}, {
						"id": "2814769",
						"name": "freezer",
						"lastUpdated": 1423582285,
						"ignored": 0,
						"client": "58229",
						"clientName": "Hemma",
						"online": "1",
						"editable": 1,
						"battery": 254
					}, {
						"id": "2813556",
						"name": "fridge",
						"lastUpdated": 1423582490,
						"ignored": 0,
						"client": "58229",
						"clientName": "Hemma",
						"online": "1",
						"editable": 1,
						"battery": 254
					}]
				},
				telldusAPI = {
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
	})
});
