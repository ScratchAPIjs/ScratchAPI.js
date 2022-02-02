"use strict";

export default class BaseManager {
  constructor(client) {
    Object.defineProperty(this, "client", { value: client });
  }
}
