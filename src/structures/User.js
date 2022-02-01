"use strict";

import Base from "./Base";

/**
 * Represents a user on Discord.
 * @implements {TextBasedChannel}
 * @extends {Base}
 */
export default class User extends Base {
  constructor(client, data) {
    super(client);

    /**
     * The user's username
     * @type {String}
     */
    this.username = data.username;

    this._patch(data);
  }

  _patch(data) {
    if ("id" in data) {
      /**
       * The id of the user
       * @type {?string}
       */
      this.id = data.id;
    } else {
      this.id ??= null;
    }

    if ("avatar" in data) {
      /**
       * The user avatar's url
       * @type {?string}
       */
      this.avatar = data.avatar;
    } else {
      this.avatar ??= null;
    }
  }

  /**
   * The timestamp the user was created at
   * @type {number}
   * @readonly
   */
  get createdTimestamp() {
    return DiscordSnowflake.timestampFrom(this.id);
  }

  /**
   * The time the user was created at
   * @type {Date}
   * @readonly
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * A link to the user's avatar.
   * @param {ImageURLOptions} [options={}] Options for the image URL
   * @returns {?string}
   */
  avatarURL(options = {}) {
    return this.avatar && this.client.rest.cdn.avatar(this.id, this.avatar, options);
  }

  /**
   * Send a comment to top of the user page.
   * @param {String} content Content to send
   * @returns {Promise<Message>}
   */
  async addComment(content) {
    await this.client.adapter.request({
      url: `/site-api/comments/user/${this.username}/add/`,
      method: "POST",
      data: {
        content: content,
        parent_id: "",
      },
      responseType: "document",
    });
    return "Message Object (Coming Soon)";
  }

  /**
   * When concatenated with a string, this automatically returns the user's mention instead of the User object.
   * @returns {string}
   * @example
   * // Logs: Hello from <@123456789012345678>!
   * console.log(`Hello from ${user}!`);
   */
  toString() {
    return `@${this.username}`;
  }
}

/**
 * @external APIUser
 * @see {@link https://discord.com/developers/docs/resources/user#user-object}
 */
