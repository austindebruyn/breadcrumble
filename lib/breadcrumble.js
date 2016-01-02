'use strict';

var _ = require('underscore');

function buildMatchData(route, name, partialUrl) {
  var clone = _(route).omit('routes', 'key');
  clone.name = name || route.name;
  clone.href = partialUrl;
  return { external: clone, internal: route };
}

function isMatch(urlPiece, config) {
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

var breadcrumble = Object.create(null);

breadcrumble.match = function (route, config) {
  var config = config || this.config || {};

  var pieces = _.filter(route.split('/'), function (piece) {
    return piece.length > 0;
  });

  var partialUrl = '/';

  var breadcrumbs = [];
  breadcrumbs.push(buildMatchData(config, config.name, partialUrl).external);

  for (var i = 0; i < pieces.length; i++) {
    var piece = pieces[i];
    var rawMatchData = isMatch(piece, config);
    if (typeof rawMatchData === 'object') {
      partialUrl += piece + '/';
      var matchData = buildMatchData(rawMatchData.route, rawMatchData.name, partialUrl);
      breadcrumbs.push(matchData.external);
      config = matchData.internal;
    }
    else {
      break;
    }
  }

  return breadcrumbs;
};

module.exports = breadcrumble;
