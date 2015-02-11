# telldus2graphite
Fetches sensor values from Telldus Live and forwards them to Graphite.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] 

```
[...] [WARN] lib/telldus.js - lowerattic too old Mon Feb 09 2015 20:06:33 GMT+0100 (CET)
[...] [WARN] lib/telldus.js - upperattic too old Mon Feb 09 2015 20:09:20 GMT+0100 (CET)
[...] [INFO] lib/graphite.js - logged { 'home.firstfloor.temp': '20.5' } Mon Feb 09 2015 20:19:06 GMT+0100 (CET)
[...] [INFO] lib/graphite.js - logged { 'home.freezer.temp': '-19.6' } Mon Feb 09 2015 20:18:34 GMT+0100 (CET)
[...] [INFO] lib/graphite.js - logged { 'home.fridge.temp': '5.9' } Mon Feb 09 2015 20:11:38 GMT+0100 (CET)
[...] [INFO] lib/graphite.js - logged { 'home.outdoor.temp': '2.8' } Mon Feb 09 2015 20:10:02 GMT+0100 (CET)
[...] [INFO] lib/graphite.js - logged { 'home.outhouse.temp': '8.7' } Mon Feb 09 2015 20:17:51 GMT+0100 (CET)
[...] [INFO] bin/telldus2graphite.js -  5 sensors done in 768 ms
```

![telldus](https://cloud.githubusercontent.com/assets/310634/6113909/d4349f08-b09a-11e4-9c4f-7e871793fac1.png)

_Sensors in Telldus Live will..._

![graphite](https://cloud.githubusercontent.com/assets/310634/6113906/ce7866ee-b09a-11e4-854d-5efff799efae.png)

_... come out like this in Graphite_


## Install
```
npm install telldus2graphite
```

## Setup

``~/.telldus2graphite/config.json``

```
{
  "telldusPublicKey": "...",
  "telldusPrivateKey": "...",
  "telldusToken": "...",
  "telldusTokenSecret": "...",
  "graphiteUrl": "plaintext://127.0.0.1:2003/",
  "format": "client.sensor.type"
}

```

### Formatting
* ``client.sensor.type => home.freezer.temp`` (default)
* ``client.type.sensor => home.temp.freezer``
* ``sensor.type => freezer.temp``


## Usage
```
crontab -e
```

Add this line to update sensors every minute
```
* * * * * node /<path to>/node_modules/.bin/telldus2graphite
```

[npm-url]: https://npmjs.org/package/telldus2graphite
[downloads-image]: http://img.shields.io/npm/dm/telldus2graphite.svg
[npm-image]: http://img.shields.io/npm/v/telldus2graphite.svg
[travis-url]: https://travis-ci.org/ashpool/telldus2graphite
[travis-image]: http://img.shields.io/travis/ashpool/telldus2graphite.svg
