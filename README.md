# telldus2graphite
Fetches sensor values from Telldus Live and forwards them to Graphite.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Actions Status](https://github.com/ashpool/telldus2graphite/workflows/Node.js%20Package/badge.svg)](https://github.com/ashpool/telldus2graphite/actions) [![Actions Status](https://github.com/ashpool/telldus2graphite/workflows/Node%20CI/badge.svg)](https://github.com/ashpool/telldus2graphite/actions)


_Sensors in Telldus Live ..._

![telldus](https://cloud.githubusercontent.com/assets/310634/6894530/0ba4f462-d6d7-11e4-8bf1-2e7449637ebc.png)

_... will come out like this in Graphite_

![graphite](https://cloud.githubusercontent.com/assets/310634/6894514/d84d433a-d6d6-11e4-9af2-12a10aa27934.png)

## Install
```bash
npm install telldus2graphite
```

## Setup
Environment variables
```bash
format=client.sensor.type
hostedGraphiteKey=... (optional)
telldusPrivateKey=...
telldusPublicKey= ...
telldusToken=...
telldusTokenSecret:...
url=plaintext://127.0.0.1:2003/
```

### Formatting
* ``client.sensor.type => home.freezer.temp`` (default)
* ``client.type.sensor => home.temp.freezer``
* ``sensor.type => freezer.temp``


## Usage
```bash
crontab -e
```

Add this line to update sensors every minute
```bash
* * * * * node <path to>/telldus2graphite/node_modules/.bin/telldus2graphite
```

[npm-url]: https://npmjs.org/package/telldus2graphite
[downloads-image]: http://img.shields.io/npm/dm/telldus2graphite.svg
[npm-image]: http://img.shields.io/npm/v/telldus2graphite.svg
