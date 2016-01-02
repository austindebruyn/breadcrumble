breadcrumble
============

A utility for building a list of breadcrumbs from chopped URL's.

## Usage

`npm install breadcrumble`

```js
var breadcrumble = require('breadcrumble');
breadcrumble.config = require('./breadcrumbs.json');

var crumbs = breadcrumble.match('/users/33/profile');
// [ 'Users', 'ID (33)', 'Profile' ]
```

### On the server

`var breadcrumble = require('breadcrumble');`

### In the browser

`var breadcrumble = require('breadcrumble/dist/breadcrumble.min.js');`

### Dependencies

Breadcrumble depends on underscore@1.8.

## Contributing

1. Fork and make your changes.
2. Make sure you run the tests and the linter.
3. Open a pull request.

## License

* MIT