"use strict";

const { UserDetail } = require("./UserDetail");

class UserHistory extends UserDetail {
  constructor(user, data) {
    super(user);

    this._patch(data);
  }

  _patch(data) {
    if ("joined" in data) {
      this.joinedAt = new Date(data.joined);
    } else {
      this.joinedAt ??= null;
    }
    return this;
  }
}

module.exports = { UserHistory };
