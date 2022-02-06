"use strict";

const { Routes } = require("../session/Addresses");

const { UserDetail } = require("./UserDetail");

class UserProfile extends UserDetail {
  constructor(user, data) {
    super(user);
    this.id = String(data.id);

    this._patch(data);
  }

  _patch(data) {
    const assign = this._makeAssigner(data);

    assign(["avatars", "images"]);
    assign("status");
    assign(["biography", "bio"]);
    assign(["locale", "country"]);
    return this;
  }

  get url() {
    return Routes.Web.user(this.user.username);
  }

  get avatar() {
    return this.id;
  }
  avatarURL(size) {
    return Routes.Image.user(this.user.id, size);
  }
}

module.exports = { UserProfile };
