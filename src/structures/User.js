"use strict";

import { GenerateURL, Util } from "../utils";
import Base from "./Base";

import UserHistory from "./UserHistory";
import UserHistoryManager from "../managers/UserHistoryManager";

export default class User extends Base {
  constructor(client, data) {
    super(client);

    this.username = data.username;

    this.history = new UserHistoryManager(this);

    this._patch(data);
  }

  _patch(data) {
    if ("id" in data) {
      this.id = data.id;
    } else {
      this.id ??= null;
    }
    if ("scratchTeam" in data) {
      this.scratchTeam = data.scratchTeam;
    } else {
      this.scratchTeam ??= null;
    }
    if ("history" in data) {
      this.history._add(new UserHistory(this.client, data.history, true));
    }

    if ("profile" in data) {
      this.profile = data.profile;
    } else {
      this.profile ??= null;
    }
    return this;
  }

  async fetch() {
    const response = await this.client.session.fetchUser(this.username);
    return this._patch(response.data);
  }

  get joinedAt() {
    return this.history ? new Date(this.history?.joined) : null;
  }
  get profileURL() {
    return GenerateURL.user(this.username);
  }
  get avatar() {
    return this.profile?.id;
  }
  avatarURL(size) {
    return GenerateURL.userAvatar(this.id, size);
  }

  async addComment(content) {
    await this.client.session.addComment(content);
    return "Message Object (Coming Soon)";
  }

  toString() {
    return `@${this.username}`;
  }
}
