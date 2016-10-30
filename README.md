express-ssi
========

[![Build Status](https://travis-ci.org/kidwm/node-ssi.png)](https://travis-ci.org/kidwm/node-ssi)

Add SSI Support To Express

__About express-ssi:__ response.end() method triggered before add SSI Parse to the Express

### Supported Instructions

```html
<!--#include virtual="" -->
<!--#include file="" -->
```

### Installation

```bash
npm install express-ssi
```

### Usage

```javascript
var expressSSI = require("express-ssi");
expressSSI.init(express,ssiServer);
```

### Methods

#### init(express, ssiServer)
_filename_ `Object` express object

_ssiServer_ `String` ssiServer address,default:"http://atguat.com.cn"

MIT
