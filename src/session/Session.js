"use strict";

import { Error } from "../errors";
import { Constants } from "../configs/Constants";

import AxiosAdapter from "../functions/Adapter";
import { Util, DefaultOptions } from "../utils";

export default class Session {
  constructor(client) {
    Object.defineProperty(this, "client", { value: client });

    this.adapter = new AxiosAdapter(DefaultOptions.REST);
    this.id = null;
  }
  async connect(username, password) {
    const response = await this.adapter.request({
      url: "/accounts/login/",
      method: "POST",
      data: { username: username, password: password },
    });
    if (response.isAxiosError) throw new Error("LOGIN_REJECTED", username, password);

    this.id = Util.parseCookie(response.headers["set-cookie"][0]).scratchsessionsid;
    this.adapter.defaults.headers.cookie += ` scratchsessionsid=${this.id};`;

    return response;
  }
  destroy() {
    this.id = null;
  }

  async fetchUser(username) {
    const response = await this.adapter.request({
      baseURL: `https://${Constants.API.FQDN.API_SERVER}`,
      url: `/users/${username}/`,
    });
    if (response.isAxiosError) throw new Error("FETCH_REJECTED");
    return response;
  }

  async addComment(content) {
    const response = await this.adapter.request({
      url: `/site-api/comments/user/${this.client.username}/add/`,
      method: "POST",
      data: {
        content: content,
        parent_id: "",
      },
      responseType: "document",
    });
    if (response.isAxiosError) throw new Error("COMMENT_REJECTED");
    return response;
  }
}
