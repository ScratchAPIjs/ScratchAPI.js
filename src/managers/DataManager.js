"use strict";

import BaseManager from "./BaseManager";
import { Error } from "../errors";

export default class DataManager extends BaseManager {
  constructor(client, holds) {
    super(client);

    Object.defineProperty(this, "holds", { value: holds });
  }

  get cache() {
    throw new Error("NOT_IMPLEMENTED", "get cache", this.constructor.name);
  }

  valueOf() {
    return this.cache;
  }
}
