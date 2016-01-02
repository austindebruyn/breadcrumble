
var expect = require('chai').expect;
var breadcrumble = require('..');

var config = {
  name: 'Root',
  routes: [
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
  ]
};

describe('parsing', function () {
  var crumbs;
  beforeEach(function () {
    breadcrumble.config = config;
    crumbs = breadcrumble.match('/users/33/profile');
  });

  it('should be an array of length 3', function () {
    expect(crumbs).to.be.an.instanceOf(Array);
    expect(crumbs).to.have.length(3);
  });

  it('should contain the names of matched routes', function () {
    expect(crumbs).to.eql([ 'Users', 'ID (33)', 'Profile' ]);
  });
});
