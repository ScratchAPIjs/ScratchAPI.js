"use strict";

const { DataManager } = require("./DataManager");
const { Cache } = require("../Cache");

class CachedManager extends DataManager {
  constructor(client, holds, items) {
    super(client, holds);

    Object.defineProperty(this, "_cache", { value: new Cache() });

    if (items) {
      for (const item of items) {
        this._add(item);
      }
    }
  }

  get cache() {
    return this._cache;
  }

  _add(data, cache = true, { id, extras = [] } = {}) {
    const existing = this.cache.get(id ?? data.id);
    if (existing) {
      if (cache) {
        existing._patch(data);
        return existing;
      }
      const clone = existing._clone();
      clone._patch(data);
      return clone;
    }

    const entry = this.holds ? new this.holds(this.client, data, ...extras) : data;

    if (cache) this.cache.set(id ?? entry.id, entry);
    return entry;
  }
}

module.exports = { CachedManager };
