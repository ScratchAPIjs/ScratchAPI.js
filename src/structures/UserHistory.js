"use strict";

import Base from "./Base";

export default class UserHistory extends Base {
  constructor(client, data, isObject = false) {
    super(client);
    if (isObject) {
      this.event = Object.keys(data)[0];
      this.date = Object.values(data)[0];
    } else {
      this.event = data.event;
      this.date = data.date;
    }
  }
}
