'use strict';

var _ = require('underscore');

function isMatch(urlPiece, config) {
  for (var i = 0; i < config.routes.length; i++) {
    var route = config.routes[i];
    if (typeof route.fragment === 'string') {
      if (route.fragment.charAt(0) === ':') {
        return { name: route.name.replace(route.fragment, urlPiece), route: route };
      }
      else if (urlPiece === route.fragment) {
        return { name: route.name, route: route };
      }
    }
    else if (_.isRegExp(route.fragment)) {
      if (route.fragment.match(urlPiece)) {
        return { name: route.name, route: route };
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

  var breadcrumbs = [];

  for (var i = 0; i < pieces.length; i++) {
    var piece = pieces[i];
    var matchData = isMatch(piece, config);
    if (matchData !== null && typeof matchData === 'object') {
      breadcrumbs.push(matchData.name);
      config = matchData.route;
    }
    else {
      break;
    }
  }

  return breadcrumbs;
};

module.exports = breadcrumble;
