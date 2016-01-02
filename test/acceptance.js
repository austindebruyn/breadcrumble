
var expect = require('chai').expect;
var crumblr = require('..');

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
    crumblr.routes = routes;
    crumbs = crumblr.match('/users/33/profile');
  });

  it('should be an array of length 3', function () {
    expect(crumbs).to.be.an.instanceOf(Array);
    expect(crumbs).to.have.length(3);
  });
});
