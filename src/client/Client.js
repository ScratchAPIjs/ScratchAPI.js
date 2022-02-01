"use strict";

import AxiosAdapter from "../functions/Adapter";
import { Util } from "../utils";
import { Constants } from "../configs/Constants";
import { Error } from "../errors";

import BaseClient from "./BaseClient";
import User from "../structures/User";

/**
 * The main hub for interacting with the Discord API, and the starting point for any bot.
 * @extends {BaseClient}
 */
export default class Client extends BaseClient {
  /**
   * @param {ClientOptions} options Options for the client
   */
  constructor(options) {
    super(options);

    this._validateOptions();

    Object.defineProperties(this, {
      token: { writable: true },
      username: { writable: true },
      sessionId: { writable: true },
    });
    this.token = null;
    this.username = null;
    this.sessionId = null;

    this.adapter = new AxiosAdapter({
      baseURL: Constants.API_BASE_URL,
      headers: {
        "user-agent": "null",
        "X-CSRFToken": "null",
        "x-requested-with": "XMLHttpRequest",
        cookie: "scratchcsrftoken=null; scratchlanguage=en;",
        referer: Constants.API_BASE_URL,
      },
      timeout: Constants.API_REQUEST_TIMEOUT_MS,
    });

    /**
     * User that the client is logged in as
     * @type {?ClientUser}
     */
    this.user = null;
  }

  /**
   * Time at which the client was last regarded as being in the `READY` state
   * (each time the client disconnects and successfully reconnects, this will be overwritten)
   * @type {?Date}
   * @readonly
   */
  get readyAt() {
    return this.readyTimestamp && new Date(this.readyTimestamp);
  }

  /**
   * How long it has been since the client last entered the `READY` state in milliseconds
   * @type {?number}
   * @readonly
   */
  get uptime() {
    return this.readyTimestamp && Date.now() - this.readyTimestamp;
  }

  /**
   * Logs the client in, establishing a WebSocket connection to Discord.
   * @param {string} [token=this.token] Token of the account to log in with
   * @returns {Promise<string>} Token of the account used
   * @example
   * client.login('my token');
   */
  async login(username = this.username, password = this.password) {
    if (!password || typeof password !== "string") throw new Error("USERNAME_INVALID");
    if (!password || typeof password !== "string") throw new Error("PASSWORD_INVALID");
    const response = await this.adapter.request({
      url: "/accounts/login/",
      method: "POST",
      data: { username: username, password: password },
    });
    if (response.isAxiosError) throw new Error("MISSING_ACCESS", username, password);
    const user = response.data[0];
    this.user = new User(this, user);
    this.token = user.token;
    this.username = user.username;
    this.sessionId = Util.parseCookie(response.headers["set-cookie"][0]).scratchsessionsid;
    this.adapter.defaults.headers.cookie += ` scratchsessionsid=${this.sessionId};`;
    this.emit("ready", this.user);
    return this.user;
  }
  /**
   * Returns whether the client has logged in, indicative of being able to access
   * properties such as `user` and `application`.
   * @returns {boolean}
   */
  isReady() {
    return this.ws.status === Status.READY;
  }
  /**
   * Logs out, terminates the connection to Discord, and destroys the client.
   * @returns {void}
   */
  destroy() {
    super.destroy();

    this.sweepers.destroy();
    this.ws.destroy();
    this.token = null;
    this.rest.setToken(null);
  }

  /**
   * Validates the client options.
   * @param {ClientOptions} [options=this.options] Options to validate
   * @private
   */
  _validateOptions(options = this.options) {}
}
