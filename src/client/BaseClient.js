"use strict";

import EventEmitter from "node:events";
import { TypeError } from "../errors";
import { Util, Options } from "../utils";

/**
 * The base class for all clients.
 * @extends {EventEmitter}
 */
export default class BaseClient extends EventEmitter {
  constructor(options = {}) {
    super({ captureRejections: true });

    if (typeof options !== "object" || options === null) {
      throw new TypeError("INVALID_TYPE", "options", "object", true);
    }

    /**
     * The options the client was instantiated with
     * @type {ClientOptions}
     */
    this.options = Util.mergeDefault(Options.createDefault(), options);
  }
}
