/*
 Typically invoked by cron
 */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const config = {
  telldusPublicKey: process.env.telldusPublicKey,
  telldusPrivateKey: process.env.telldusPrivateKey,
  telldusToken: process.env.telldusToken,
  telldusTokenSecret: process.env.telldusTokenSecret,
  url: process.env.url,
  format: process.env.format
};
const graphite = require('./../build/graphite')(config);
const telldus = require('telldus-live-promise');
const api = new telldus.Telldus(config);
const sensors = new telldus.Sensors(api);

const read = (list) => list.sensor.filter(sensor => sensor.id !== undefined).map(sensors.info);

function log(list) {
  Promise.all(list).then(graphite.logAll).then(res => {
    graphite.end();
    console.log(res);
  }).catch(console.error);
}

sensors.list().then(read).then(log);
