'use strict';

var _            = require('underscore');
var breadcrumble = require('..');
var config       = require('./config');
var expect       = require('chai').expect;

describe('parsing params and regexes', function () {
  var crumbs;

  beforeEach(function () {
    breadcrumble.config = config.paramAndRegex;
  });

  describe('with a param', function () {
    beforeEach(function () {
      crumbs = breadcrumble.match('/users/33/profile');
    });

    it('should be an array of length 4', function () {
      expect(crumbs).to.be.an.instanceOf(Array);
      expect(crumbs).to.have.length(4);
    });

    it('should contain the names of matched routes', function () {
      expect(_.pluck(crumbs, 'name')).to.eql([ 'Root', 'Users', 'ID (33)', 'Profile' ]);
    });

    it('should be able to route to the param', function () {
      expect(crumbs[0].href).to.eql('/');
      expect(crumbs[1].href).to.eql('/users/');
      expect(crumbs[2].href).to.eql('/users/33/');
      expect(crumbs[3].href).to.eql('/users/33/profile/');
    });
  });

  describe('with a regex', function () {
    beforeEach(function () {
      crumbs = breadcrumble.match('/users/adebruyn/friends');
    });

    it('should be an array of length 4', function () {
      expect(crumbs).to.be.an.instanceOf(Array);
      expect(crumbs).to.have.length(4);
    });

    it('should contain the matched regex', function () {
      expect(_.pluck(crumbs, 'name')).to.eql([ 'Root', 'Users', 'Username (adebruyn)', 'Friends List' ]);
    })
  });
});

describe('with other properties', function () {
  var crumbs;

  beforeEach(function () {
    breadcrumble.config = config.withHrefs;
    crumbs = breadcrumble.match('/app/pages/legal/');
  });

  it('should be an array of length 4', function () {
    expect(crumbs).to.be.an.instanceOf(Array);
    expect(crumbs).to.have.length(4);
  });

  it('should contain the `other` property for each crumb', function () {
    expect(_.pluck(crumbs, 'other')).to.eql([
      undefined,
      'This is a subtitle!',
      3.14,
      { nda: 'required' }
    ]);
  });
});

describe('hidden routes', function () {
  var crumbs;

  beforeEach(function () {
    breadcrumble.config = config.hiddenRoutes;
    crumbs = breadcrumble.match('/ca/mv/castro');
  });

  it('should be an array of length 2', function () {
    expect(crumbs).to.be.an.instanceOf(Array);
    expect(crumbs).to.have.length(2);
  });

  it('should not contain the two hidden routes', function () {
    expect(_.pluck(crumbs, 'name')).to.eql(['California', 'Castro St.']);
  });
});
