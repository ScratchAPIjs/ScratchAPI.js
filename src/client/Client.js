"use strict";

import { Events } from "../utils";
import { Error } from "../errors";

import BaseClient from "./BaseClient";
import ClientUser from "../structures/ClientUser";

export default class Client extends BaseClient {
  constructor(options) {
    super(options);

    this._validateOptions();

    Object.defineProperties(this, {
      token: { writable: true },
      username: { writable: true },
    });
    this.token = null;
    this.username = null;

    this.user = null;

    this.readyTimestamp = null;
  }

  get readyAt() {
    return this.readyTimestamp && new Date(this.readyTimestamp);
  }

  get uptime() {
    return this.readyTimestamp && Date.now() - this.readyTimestamp;
  }

  async login(username = this.username, password = this.password) {
    if (!password || typeof password !== "string") throw new Error("USERNAME_INVALID");
    if (!password || typeof password !== "string") throw new Error("PASSWORD_INVALID");

    const response = await this.session.connect(username, password);
    response.status = null;
    let user = response.data[0];

    this.user = new ClientUser(this, user);
    await this.user.fetch();

    this.token = user.token;
    this.username = user.username;

    this.readyTimestamp = Date.now();

    this.emit(Events.READY, this.username);

    return this.user;
  }

  isReady() {
    return this.ws.status === Status.READY;
  }

  destroy() {
    super.destroy();
    this.token = this.username = null;
    this.emit(Events.DESTROYED);
  }

  _validateOptions(options = this.options) {}
}
