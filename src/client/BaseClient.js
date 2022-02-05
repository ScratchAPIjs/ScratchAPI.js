"use strict";

const EventEmitter = require("node:events");

const { TypeError } = require("../errors");
const { Util, DefaultOptions } = require("../utils");
const { Session } = require("../session/Session");

class BaseClient extends EventEmitter {
  constructor(options = {}) {
    super({ captureRejections: true });

    if (typeof options !== "object" || options === null) {
      throw new TypeError("INVALID_TYPE", "options", "object", true);
    }

    this.options = Util.mergeDefault(DefaultOptions.client, options);

    this.session = new Session(this);
    this.adapter = this.session.adapter;
  }
  destroy() {
    this.session.destroy();
  }
}

module.exports = { BaseClient };
