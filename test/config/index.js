
var exports = module.exports;

exports.paramAndRegex = {
  name: 'Root',
  routes: [
    {
      key: 'users',
      name: 'Users',
      routes: [
        {
          key: /[a-zA-Z]+/,
          name: 'Username ($0)',
          routes: [
            {
              key: 'friends',
              name: 'Friends List'
            }
          ]
        },
        {
          key: ':id',
          name: 'ID (:id)',
          routes: [
            {
              key: 'profile',
              name: 'Profile'
            }
          ]
        }
      ]
    }
  ]
};

exports.withHrefs = {
  name: 'Root',
  routes: [
    {
      key: 'app',
      name: 'App',
      other: 'This is a subtitle!',
      routes: [
        {
          key: 'pages',
          name: 'Pages',
          other: 3.14,
          routes: [
            {
              key: 'legal',
              name: 'Legal',
              other: { nda: 'required' }
            }
          ]
        }
      ]
    }
  ]
};

exports.hiddenRoutes = {
  name: 'US',
  hidden: true,
  routes: [
    {
      key: 'ca',
      name: 'California',
      routes: [
        {
          key: 'mv',
          name: 'Mountain View',
          hidden: true,
          routes: [
            {
              key: 'castro',
              name: 'Castro St.'
            }
          ]
        }
      ]
    }
  ]
};
