
var session = require('client-sessions');

module.exports = {
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7s2315df{}+Ijsli;;to8',
  duration: 300 * 60 * 1000,
  activeDuration: 50 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
};