# telldus2graphite
Fetches sensor values from Telldus Live and forwards them to Graphite.

```
[2015-02-09 01:56:14.961] [INFO] lib/graphite.js - logged { 'temperature.atticlower': '-0.3' }
[2015-02-09 01:56:14.961] [INFO] lib/graphite.js - logged { 'temperature.atticupper': '0.3' }
[2015-02-09 01:56:14.962] [INFO] lib/graphite.js - logged { 'temperature.firstfloor': '20.6' }
[2015-02-09 01:56:14.962] [INFO] lib/graphite.js - logged { 'temperature.freezer': '-19.5' }
[2015-02-09 01:56:14.962] [INFO] lib/graphite.js - logged { 'temperature.fridge': '5.0' }
[2015-02-09 01:56:14.962] [INFO] lib/graphite.js - logged { 'temperature.outdoor': '0.3' }
[2015-02-09 01:56:14.962] [INFO] lib/graphite.js - logged { 'temperature.outhouse': '6.7' }
[2015-02-09 01:56:14.962] [INFO] bin/telldus2graphite.js -  7 sensors done in 721 ms
```


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
