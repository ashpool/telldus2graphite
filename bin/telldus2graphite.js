/*
 Typically invoked by cron.
 */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const config = process.env;
const graphite = require('./../lib/graphite.js')(config);
const telldus = require('telldus-live-promise');
const api = telldus.API(config);
const sensors = telldus.Sensors(api);

function read(list) {
  return list.sensor.filter(function (sensor) {
    return sensor.id !== undefined;
  }).map(sensors.info);
}

function log(list) {
  Promise.all(list).then(graphite.logAll).then((res) => {
    graphite.end();
    console.log(res);
  }).catch(console.error);
}

sensors.list().then(read).then(log);
