"use strict";

const { CachedManager } = require("./CachedManager");
const { User } = require("../structures/User");
const { Routes } = require("../session/Addresses");

class UserManager extends CachedManager {
  constructor(client, iterable) {
    super(client, User, iterable);
  }

  async fetch(user, { cache = true, force = false } = {}) {
    const username = this.resolveName(user);
    if (!force) {
      const existing = this.cache.get(username);
      if (existing) return existing;
    }

    const response = await this.client.adapter.get(Routes.API.user(username));
    return this._add(response.data, cache);
  }

  resolveName(nameOrInstance) {
    if (nameOrInstance instanceof User) return nameOrInstance.username;
    if (typeof nameOrInstance === "string") return nameOrInstance;
    return null;
  }
}

module.exports = { UserManager };
