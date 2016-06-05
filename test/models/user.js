'use strict';
const expect = require('chai').expect;
const validatePassword = require('../../lib/validate-password');

describe('validatePassword', () => {
  it('should verify a password against a salted hash', done => {
    const user = {
      salt: 'hey',
      pass: 'there',
      password_hash: '8ff053ab59fd5d238e347b97ac858a5bbc5f78c7'
    }
    expect(validatePassword(user, 'there')).to.be.true;
    expect(validatePassword(user, 'this is not the password')).to.be.false;
    done();
  });
});

