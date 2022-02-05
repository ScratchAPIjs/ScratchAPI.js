"use strict";

const { Base } = require("./Base");

const { UserHistory } = require("./UserHistory");
const { UserProfile } = require("./UserProfile");

class User extends Base {
  constructor(client, data) {
    super(client);

    this.username = data.username;

    this._patch(data);
  }

  _patch(data) {
    if ("id" in data) {
      this.id = String(data.id);
    } else {
      this.id ??= null;
    }
    if ("scratchteam" in data) {
      this.scratchTeam = Boolean(data.scratchteam);
    } else {
      this.scratchTeam ??= null;
    }
    if ("history" in data) {
      this.history = new UserHistory(this, data.history);
    } else {
      this.history ??= null;
    }

    if ("profile" in data) {
      this.profile = new UserProfile(this, data.profile);
    } else {
      this.profile ??= null;
    }
    return this;
  }

  get partial() {
    return typeof this.username === "string";
  }

  async addComment(content) {
    await this.client.session.addComment({
      user: this.username,
      content: content,
    });
    return "Message Object (Coming Soon)";
  }

  fetch(force = true) {
    return this.client.users.fetch(this.username, { force });
  }

  toString() {
    return `@${this.username}`;
  }
}

module.exports = { User };
