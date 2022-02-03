"use strict";

const { Base } = require("./Base");

class UserHistory extends Base {
  constructor(user, data) {
    super(user.client);

    this._patch(data);
  }

  _patch(data) {
    if ("joined" in data) {
      this.joined = new Date(data.joined);
    } else {
      this.joined ??= null;
    }
  }

  get joinedAt() {
    return new Date(this.joined);
  }
}

module.exports = { UserHistory };
