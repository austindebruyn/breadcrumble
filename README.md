breadcrumble
============

[![Build Status](https://travis-ci.org/austindebruyn/breadcrumble.svg?branch=master)](https://travis-ci.org/austindebruyn/breadcrumble)

A utility for building a list of breadcrumbs from chopped URL's.

## Usage

### From npm

```sh
npm install --save breadcrumble
```

### Example

```js
var breadcrumble = require('breadcrumble');
breadcrumble.config = require('./breadcrumbs.json');

var crumbs = breadcrumble.match('/users/33/profile');
// [ 'Users', 'ID (33)', 'Profile' ]
```

### API

* `func match(path: String, (config: Object))`

Breadcrumble will match the given path against an optional config object or the
module-global config (see below). This function will return an array of route
descriptors for each matching fragments. If your config looks like this
```js
{ key: 'app', someProp: 1, someProp: 2 }
```
Then the result of `breadcrumble.match('/app/')` will be `[ { someProp: 1, someProp: 2 } ]`.

### Use in the browser

```js
var breadcrumble = require('breadcrumble/dist/breadcrumble.min.js');
```

## Configuring routes

You can provide your route config in the call to `match()` or set the module-global config
with
```js
breadcrumble.config = {...};
```

The schema for your route configuration is this (only `key` is required):
```js
type Route {
  key: String!
  name: String
  hidden: Boolean
  routes: [Route]
}
```

### Properties

* `name`: Will be returned with matched path replaced. i.e. if the route descriptor is
`{ key: ':id', name: 'ID (:id)' }` and path `"/33/"` is matched, then in the returned
array, `name` will be `"ID (33)"`.
* `hidden`: If this is present and `true`, then this descriptor will not be present in the
returned breadcrumbs. Useful if you do not want your root (`/`) to appear, for example.

## Contributing

1. Fork and make your changes.
2. Only run `npm run build` and commit your new dist files on a tag release.
3. Make sure you run the tests.
4. Open a pull request.

## License

* MIT
