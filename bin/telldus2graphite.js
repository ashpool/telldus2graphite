/*
 Typically invoked by cron.
 */
var home = require('./../lib/homepath'),
  config = require(home.path() + '/.telldus2graphite/config.json'),
  graphite = require('./../lib/graphite.js')(config),
  logger = require('./../lib/logger')(config).getLogger(__filename);
config.logger = logger;
var telldus = require('telldus-live-promise'),
  api = telldus.API(config),
  sensors = telldus.Sensors(api);

function read(list) {
  return list.sensor.filter(function(sensor) {
    return sensor.id !== undefined;
  }).map(sensors.info);
}

function log(list) {
  Promise.all(list).then(graphite.logAll).catch(logger.error);
}

sensors.list().then(read).then(log);
