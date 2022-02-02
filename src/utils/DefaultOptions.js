"use strict";

import { Constants } from "../configs/Constants";

export default class DefaultOptions extends null {
  static client = {};
  static REST = {
    baseURL: `https://${Constants.API.FQDN.SERVER}`,
    headers: {
      "user-agent": "null",
      "X-CSRFToken": "null",
      "x-requested-with": "XMLHttpRequest",
      cookie: "scratchcsrftoken=null; scratchlanguage=en;",
      referer: `https://${Constants.API.FQDN.SERVER}`,
    },
    timeout: Constants.API.REQUEST_TIMEOUT_MS,
  };
}
