module.exports = function (formatString) {
	var formatArray = (formatString || 'client.sensor.type').split('.');

	function format (sensorInfo, data) {
		var translaton = {
			client: sensorInfo.clientName,
			sensor: sensorInfo.name,
			type: data.name
		};
		return formatArray.map(function (key) {
			return translaton[key];
		}).join('.');
	};

	return {
		format: format
	};
};