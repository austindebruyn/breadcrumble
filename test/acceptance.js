
var expect = require('chai').expect;
var breadcrumble = require('..');

var routes = [
  {
    fragment: 'users',
    name: 'Users',
    routes: [
      {
        fragment: ':id',
        name: 'ID (:id)',
        routes: [
          {
            fragment: 'profile',
            name: 'Profile'
          }
        ]
      }
    ]
  }
];

describe('parsing', function () {
  var crumbs;
  beforeEach(function () {
    breadcrumble.routes = routes;
    crumbs = breadcrumble.match('/users/33/profile');
  });

  it('should be an array of length 3', function () {
    expect(crumbs).to.be.an.instanceOf(Array);
    expect(crumbs).to.have.length(3);
  });
});
