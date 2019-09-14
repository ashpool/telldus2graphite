/*
 Typically invoked by cron.
 */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const config = process.env;
const graphite = require('./../build/graphite')(config);
const telldus = require('telldus-live-promise');
const api = telldus.API(config);
const sensors = telldus.Sensors(api);

const read = (list) => list.sensor.filter(sensor => sensor.id !== undefined).map(sensors.info);

function log(list) {
  Promise.all(list).then(graphite.logAll).then(res => {
    graphite.end();
    console.log(res);
  }).catch(console.error);
}

sensors.list().then(read).then(log);
