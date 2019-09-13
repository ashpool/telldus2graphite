module.exports = function(formatString: string) {
  const formatArray: string[] = (formatString || 'client.sensor.type').split('.');

  function create(sensorInfo: Record<string, string | number>, data: Record<string, string | number>) {
    const translation: Record<string, string> = {
        client: sensorInfo.clientName,
        sensor: sensorInfo.name,
        type: data.name
      };
      const properties: string[] = formatArray.slice(0);
      let metric: Record<string, string | number> = {};
    metric[translation[properties.pop()]] = Number(data.value);
    while (properties.length > 0) {
      let temp: Record<string, string | number> = {};
      temp[translation[properties.pop()]] = metric;
      metric = temp;
    }
    return metric;
  }

  return {
    create: create
  };
};
