"use strict";

const { Events } = require("../utils");
const { Error } = require("../errors");
const { Routes } = require("../session/Addresses");

const { BaseClient } = require("./BaseClient");
const { ClientUser } = require("../structures/ClientUser");
const { UserManager } = require("../managers/UserManager");
const { MessageEvent } = require('../events/messageEvent');

require("dotenv").config();

class Client extends BaseClient {
  constructor(options) {
    super(options);

    this._validateOptions();

    Object.defineProperties(this, {
      token: { writable: true },
      username: { writable: true },
    });
    this.token = null;
    this.username = process.env.SCRATCH_USERNAME;
    this.password = process.env.SCRATCH_PASSWORD;

    this.user = null;
    this.readyTimestamp = null;

    this.messageEvent = new MessageEvent(this);

    this.users = new UserManager(this);
  }

  get readyAt() {
    return this.readyTimestamp && new Date(this.readyTimestamp);
  }

  get uptime() {
    return this.readyTimestamp && Date.now() - this.readyTimestamp;
  }

  async login(username = this.username, password = this.password) {
    if (!username || typeof username !== "string") throw new Error("USERNAME_INVALID");
    if (!password || typeof password !== "string") throw new Error("PASSWORD_INVALID");

    const loginResponse = await this.session.connect(username, password);
    const userResponse = await this.adapter.get(Routes.API.user(username));
    this.user = new ClientUser(this, userResponse.data);

    this.token = loginResponse.data.token;
    this.username = username;

    this.readyTimestamp = Date.now();

    this.emit(Events.READY, this.username);

    this.messageEvent.start();

    return this.user;
  }

  isReady() {
    // eslint-disable-next-line no-undef
    return this.session.status === Status.READY;
  }

  destroy() {
    super.destroy();
    this.token = this.username = null;
    this.emit(Events.DESTROYED);
  }

  // eslint-disable-next-line no-unused-vars
  _validateOptions(options = this.options) {}
}

module.exports = { Client };
