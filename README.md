# telldus2graphite
Fetches sensor values from Telldus Live and forwards them to Graphite.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]


```
[2015-02-09 20:19:38.263] [WARN] lib/telldus.js - lowerattic too old Mon Feb 09 2015 20:06:33 GMT+0100 (CET)
[2015-02-09 20:19:38.263] [WARN] lib/telldus.js - upperattic too old Mon Feb 09 2015 20:09:20 GMT+0100 (CET)
[2015-02-09 20:19:38.286] [INFO] lib/graphite.js - logged { 'temp.firstfloor': '20.5' } Mon Feb 09 2015 20:19:06 GMT+0100 (CET)
[2015-02-09 20:19:38.286] [INFO] lib/graphite.js - logged { 'temp.freezer': '-19.6' } Mon Feb 09 2015 20:18:34 GMT+0100 (CET)
[2015-02-09 20:19:38.286] [INFO] lib/graphite.js - logged { 'temp.fridge': '5.9' } Mon Feb 09 2015 20:11:38 GMT+0100 (CET)
[2015-02-09 20:19:38.287] [INFO] lib/graphite.js - logged { 'temp.outdoor': '2.8' } Mon Feb 09 2015 20:10:02 GMT+0100 (CET)
[2015-02-09 20:19:38.287] [INFO] lib/graphite.js - logged { 'temp.outhouse': '8.7' } Mon Feb 09 2015 20:17:51 GMT+0100 (CET)
[2015-02-09 20:19:38.287] [INFO] bin/telldus2graphite.js -  5 sensors done in 768 ms
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
  "graphiteUrl": "plaintext://127.0.0.1:2003/"
}

```


# Usage
```
crontab -e
```

Add this line to update sensors every minute
```
* * * * * node /<path to>/node_modules/.bin/telldus2graphite
```


[npm-url]: https://npmjs.org/package/telldus2graphite
[npm-image]: https://img.shields.io/npm/dm/telldus2graphite.svg

