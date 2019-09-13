module.exports = function(formatString: string) {
  const formatArray: string[] = (formatString || 'client.sensor.type').split('.');

  function create(sensorInfo: Record<string, any>, data: Record<string, any>) {
    const translation: Record<string, string> = {
        client: sensorInfo.clientName,
        sensor: sensorInfo.name,
        type: data.name
      };
      const properties: string[] = formatArray.slice(0);
      let metric: Record<string, any> = {};
    metric[translation[properties.pop() || 'undefined']] = Number(data.value);
    while (properties.length > 0) {
      let temp: Record<string, any> = {};
      temp[translation[properties.pop() || 'undefined']] = metric;
      metric = temp;
    }
    return metric;
  }

  return {
    create: create
  };
};
