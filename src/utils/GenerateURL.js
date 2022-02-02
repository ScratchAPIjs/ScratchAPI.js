"use strict";

import { Constants } from "../configs/Constants";
const SERVER = Constants.API.FQDN.SERVER;
const CDN_SERVER = Constants.API.FQDN.CDN_SERVER;

export default class GenerateURL extends null {
  static user(username) {
    return `https://${SERVER}/users/${username}/`;
  }
  static userAvatar(userId, size = 90) {
    return `https://${CDN_SERVER}/get_image/user/${userId}_${size}x${size}.png?v=`;
  }
  static project(id) {
    return `https://${SERVER}/projects/${id}/`;
  }
  static studio(id) {
    return `https://${SERVER}/studios/${id}/`;
  }
}
