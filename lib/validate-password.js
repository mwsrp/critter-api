'use strict';
const crypto = require('crypto');

module.exports = function(user, pass) {
  const hash = crypto.createHash('sha1');
  hash.update(user.salt+pass);
  const result = hash.digest('hex');
  return result === user.password_hash;
};
