'use strict';

const { UserDetail } = require('./UserDetail');

class UserHistory extends UserDetail {
  constructor(user, data) {
    super(user);

    this._patch(data);
  }

  _patch(data) {
    const assign = this._makeAssigner(data);

    assign(['joinedAt', 'joined']);
    return this;
  }
}

module.exports = { UserHistory };
