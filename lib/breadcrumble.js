'use strict';

var _ = require('underscore');

/**
 * Constructs the data object that will make up the final
 * public array that's returned. We want any extra properties
 * set in the route descriptor to carry over, so we deep clone
 * the descriptor and remove `routes` and `key`. Make sure we
 * include an `internal` version of the description that still has
 * those properties, or we won't be able to continue matching.
 * @param  {Object} route
 * @param  {String} name
 * @param  {String} partialUrl
 * @return {Object}
 */
function buildMatchData(route, name, partialUrl) {
  var external = _(route).omit('routes', 'key');
  external.name = name || route.name;
  external.href = partialUrl;
  return { external: external, internal: route };
}

/**
 * Given a Route config containing an array of route descriptors
 * with keys, see if `urlPiece` matches any of the keys and return
 * the set of that route descriptor and the matching fragment.
 * The `urlPiece` itself is not always the fragment, because the key
 * is allowed to be a regex with zero or more matching groups.
 * @param  {String} urlPiece
 * @param  {Object} config
 * @return {Object}
 */
function findMatchingRoute(urlPiece, config) {
  var config = config || {};
  if (!Array.isArray(config.routes)) {
    return null;
  }

  for (var i = 0; i < config.routes.length; i++) {
    var route = config.routes[i];

    if (typeof route.key === 'string') {
      if (route.key.charAt(0) === ':') {
        return { route: route, name: route.name.replace(route.key, urlPiece) };
      }
      else if (urlPiece === route.key) {
        return { route: route, name: route.name };
      }
    }
    else if (_.isRegExp(route.key)) {
      var match = urlPiece.match(route.key);
      if (match !== null) {
        return { route: route, name: route.name.replace('$0', match[0]) };
      }
    }
  }
  return null;
}

/**
 * Returns an array of pieces of this path.
 * ie. /users/33/profile => ['users', '33', 'profile']
 * @param  {String} path
 * @throws {Error}  If path is not a string
 * @return {Array}
 */
function tokenizePath(path) {
  if (typeof path !== 'string') {
    throw new Error('Path should be a string, `' + typeof path + '` given.');
  }

  return _.filter(path.split('/'), function (piece) {
    return piece.length > 0;
  });
}

/**
 * Given an array of route descriptors, return a copy of the
 * array with all of the routes with `hidden` set to true
 * removed.
 * @param  {Array} routes
 * @return {Array}
 */
function filterHiddenRoutes(routes) {
  return _(routes).filter(function (r) {
    return r && !r.hidden;
  });
}

var breadcrumble = Object.create(null);
breadcrumble.config = Object.create(null);

/**
 * This is the main API of this library. Match accepts a string
 * and an optional config to override the internal config. This
 * function returns an array of descriptors, which are clones of
 * the matched objects provided in the config.
 * @param  {String} path
 * @param  {Object} config
 * @return {Array}
 */
breadcrumble.match = function match(path, config) {
  var config = config || this.config || {};

  var tokens = tokenizePath(path);

  var partialUrl = '/';

  var breadcrumbs = [];
  breadcrumbs.push(buildMatchData(config, config.name, partialUrl).external);

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    var rawMatchData = findMatchingRoute(token, config);
    if (typeof rawMatchData === 'object') {
      partialUrl += token + '/';
      var matchData = buildMatchData(rawMatchData.route, rawMatchData.name, partialUrl);
      breadcrumbs.push(matchData.external);
      config = matchData.internal;
    }
    else {
      break;
    }
  }

  return filterHiddenRoutes(breadcrumbs);
};

module.exports = breadcrumble;
