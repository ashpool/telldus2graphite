# telldus2graphite
Fetches sensor values from Telldus Live and forwards them to Graphite.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] 

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
  "format": "client.sensor.type",
  "logLevel": "INFO"
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
* * * * * node <path to>/telldus2graphite/node_modules/.bin/telldus2graphite
```

[npm-url]: https://npmjs.org/package/telldus2graphite
[downloads-image]: http://img.shields.io/npm/dm/telldus2graphite.svg
[npm-image]: http://img.shields.io/npm/v/telldus2graphite.svg
[travis-url]: https://travis-ci.org/ashpool/telldus2graphite
[travis-image]: http://img.shields.io/travis/ashpool/telldus2graphite.svg
