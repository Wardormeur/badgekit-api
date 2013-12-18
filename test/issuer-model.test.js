const test = require('tap').test
const Issuers = require('../app/models/issuer')

const closeDb = Issuers.db.close.bind(Issuers.db)

test('validating rows', function (t) {
  var errors;

  errors = Issuers.validateRow({
    id: 'hi',
    slug: null,
    description: Array(500).join('lo'),
    url: null,
    email: 'not an email',
  })
  t.same(errors.length, 5)

  errors = Issuers.validateRow({
    id: 1,
    slug: 'chicago',
    description: Array(255).join('l'),
    url: 'http://cityofchicago.org',
    email: 'definitely-an-email@example.org',
  })
  t.same(errors.length, 0)


  errors = Issuers.validateRow({
    slug: 'brian',
    url: 'https://bjb.io',
  })
  t.same(errors.length, 0)


  closeDb(); t.end()
})
