'use strict';

var breadcrumble = Object.create(null);

breadcrumble.match = function (route) {
  return [ 0, 0, 0 ];
};

module.exports = breadcrumble;
