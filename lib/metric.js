module.exports = function (formatString) {
	var formatArray = (formatString || 'client.sensor.type').split('.');

	function create (sensorInfo, data) {
		var translaton = {
				client: sensorInfo.clientName,
				sensor: sensorInfo.name,
				type: data.name
			},
			properties = formatArray.slice(0),
			metric = {};
		metric[translaton[properties.pop()]] = data.value;
		while (properties.length > 0) {
			var temp = {};
			temp[translaton[properties.pop()]] = metric;
			metric = temp;
		}
		return metric;
	}

	return {
		create: create
	};
};