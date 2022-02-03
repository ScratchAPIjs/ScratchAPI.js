"use strict";

const { Error } = require("../errors");
const { Servers } = require("./Addresses");

const { AxiosAdapter } = require("./Adapter");
const { Util, DefaultOptions } = require("../utils");

class Session {
  constructor(client) {
    Object.defineProperty(this, "client", { value: client });

    this.adapter = new AxiosAdapter(DefaultOptions.REST);
    this.id = null;
  }
  async connect(username, password) {
    const response = await this.adapter.request({
      url: `https://${Servers.GENERAL}/accounts/login/`,
      method: "POST",
      data: { username: username, password: password },
    });
    if (response.isAxiosError) throw new Error("LOGIN_REJECTED", username, password);

    this.id = Util.parseCookie(response.headers["set-cookie"][0]).scratchsessionsid;
    this.adapter.defaults.headers.cookie += `scratchsessionsid=${this.id};`;

    return response;
  }
  destroy() {
    this.id = null;
  }

  async addComment(options = {}) {
    let type, identifier;
    if (options.project) {
      type = "project";
      identifier = options.project;
    } else if (options.user) {
      type = "user";
      identifier = options.user;
    } else if (options.studio) {
      type = "gallery";
      identifier = options.studio;
    }
    const response = await this.adapter.request({
      url: `https://${Servers.GENERAL}/site-api/comments/${type}/${identifier}/add/`,
      method: "POST",
      data: {
        content: options?.content,
        parent_id: "",
      },
      responseType: "document",
    });
    if (response.isAxiosError) throw new Error("COMMENT_REJECTED");
    return response;
  }
}

module.exports = { Session };
