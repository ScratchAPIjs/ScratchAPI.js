'use strict';

const { Base } = require('./Base');

class UserDetail extends Base {
  constructor(user) {
    super(user.client);
    Object.defineProperty(this, 'user', { value: user });
  }
}

module.exports = { UserDetail };
