# telldus2graphite
Fetches sensor values from Telldus Live and forwards them to Graphite.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

_Sensors in Telldus Live ..._

![telldus](https://cloud.githubusercontent.com/assets/310634/6113909/d4349f08-b09a-11e4-9c4f-7e871793fac1.png)

_... will come out like this in Graphite_

![graphite](https://cloud.githubusercontent.com/assets/310634/6113906/ce7866ee-b09a-11e4-854d-5efff799efae.png)

## Install
```bash
npm install telldus2graphite
```

## Setup

```bash
~/.telldus2graphite/config.json
```

```Javascript
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
[travis-url]: https://travis-ci.org/ashpool/telldus2graphite
[travis-image]: http://img.shields.io/travis/ashpool/telldus2graphite.svg
