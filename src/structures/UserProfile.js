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
    if ("images" in data) {
      this.avatars = data.images;
    } else {
      this.avatars ??= null;
    }
    if ("status" in data) {
      this.status = data.status;
    } else {
      this.status ??= null;
    }
    if ("bio" in data) {
      this.biography = data.bio;
    } else {
      this.biography ??= null;
    }
    if ("country" in data) {
      this.locale = data.country;
    } else {
      this.locale ??= null;
    }
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
