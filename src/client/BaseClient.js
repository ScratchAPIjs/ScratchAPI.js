"use strict";

import EventEmitter from "node:events";

import { TypeError } from "../errors";
import { Util, DefaultOptions } from "../utils";
import Session from "../session/Session";

export default class BaseClient extends EventEmitter {
  constructor(options = {}) {
    super({ captureRejections: true });

    if (typeof options !== "object" || options === null) {
      throw new TypeError("INVALID_TYPE", "options", "object", true);
    }

    this.options = Util.mergeDefault(DefaultOptions.client, options);

    this.session = new Session(this);
  }
  destroy() {
    this.session.destroy();
  }
}
