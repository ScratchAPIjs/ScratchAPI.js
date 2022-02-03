"use strict";

class BaseManager {
  constructor(client) {
    Object.defineProperty(this, "client", { value: client });
  }
}

module.exports = { BaseManager };
