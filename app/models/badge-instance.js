const dateFromUnixtime = require('../lib/date-from-unixtime')
const db = require('../lib/db');
const makeValidator = require('../lib/make-validator')
const sha1 = require('../lib/hash').sha1

const BadgeInstances = db.table('badgeInstances', {
  fields: [
    'id',
    'slug',
    'email',
    'issuedOn',
    'expires',
    'claimCode',
    'badgeId',
  ],
  relationships: {
    badge: {
      type: 'hasOne',
      local: 'badgeId',
      foreign: { table: 'badges', key: 'id' },
      optional: false
    },
  },
})

BadgeInstances.formatUserInput = function formatUserInput(obj) {
  return {
    slug: obj.slug || sha1(Date.now() + JSON.stringify(obj)),
    email: obj.email,
    issuedOn: obj.issuedOn || dateFromUnixtime(Date.now()),
    expires: obj.expires ? dateFromUnixtime(obj.expires) : null,
    claimCode: obj.claimCode,
  }
}

BadgeInstances.validateRow = makeValidator({
  id: optionalInt,
  email: function (email) {
    this.check(email).isEmail();
  },
  claimCode: function (code) {
    if (typeof code == 'undefined' || code === null) return;
    this.check(code).len(0, 255);
  },
  badgeId: function (id) {
    this.check(id).isInt();
  },
})

function optionalInt(id) {
  if (typeof id == 'undefined' || id === null) return;
  this.check(id).isInt();
}

exports = module.exports = BadgeInstances