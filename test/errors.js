'use strict';

var _            = require('underscore');
var breadcrumble = require('..');
var config       = require('./config');
var expect       = require('chai').expect;

function callMatchWith(r, c) {
  return breadcrumble.match.bind(breadcrumble, r, c);
}

describe('should throw when I', function () {
  it('provide a bad argument for a route', function () {
    expect(callMatchWith(3, config.paramAndRegex)).to.throw('should be a string, `number` given.');
    expect(callMatchWith({}, config.paramAndRegex)).to.throw('should be a string, `object` given.');
  });
});
