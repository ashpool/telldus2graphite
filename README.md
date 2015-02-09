# telldus2graphite
Fetches sensor values from Telldus Live and forwards them to Graphite.


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
