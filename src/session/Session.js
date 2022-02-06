'use strict';

const { Error } = require('../errors');
const { Routes } = require('./Addresses');

const { AxiosAdapter } = require('./Adapter');
const { Util, DefaultOptions } = require('../utils');

class Session {
  constructor(client) {
    Object.defineProperty(this, 'client', { value: client });

    Object.defineProperties(this, {
      token: { writable: true },
      id: { writable: true },
    });
    this.id = this.token = null;

    this.adapter = new AxiosAdapter(DefaultOptions.REST);
  }

  async connect(username, password) {
    const response = await this.adapter.post(Routes.login, {
      username: username,
      password: password,
    });
    if (response.isAxiosError) throw new Error('LOGIN_REJECTED', username);

    this.id = Util.parseCookie(response.headers['set-cookie'][0]).scratchsessionsid;
    this.token = response.data[0].token;

    this.adapter.defaults.headers.cookie += `scratchsessionsid=${this.id};`;
    Object.assign(this.adapter.defaults.headers, { 'x-token': this.token });

    return response;
  }
  destroy() {
    this.id = null;
  }

  async addComment(options = {}) {
    const { type, identifier } = parseOptions() ?? {};
    const response = await this.adapter.post(
      Routes.API.postComment(type, identifier),
      { content: options?.content, parent_id: options.parent ?? '' },
      { responseType: 'document' },
    );
    if (response.isAxiosError) throw new Error('COMMENT_REJECTED');
    return response;

    function parseOptions() {
      if (options.project) {
        return { type: 'project', identifier: options.project };
      } else if (options.user) {
        return { type: 'user', identifier: options.user };
      } else if (options.studio) {
        return { type: 'gallery', identifier: options.studio };
      }
    }
  }
}

module.exports = { Session };
