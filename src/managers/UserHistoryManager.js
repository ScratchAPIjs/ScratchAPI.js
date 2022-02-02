"use strict";

import CachedManager from "./CachedManager";
import UserHistory from "../structures/UserHistory";

export default class UserHistoryManager extends CachedManager {
  constructor(user, iterable) {
    super(user.client, UserHistory, iterable);
  }
  //  _add(data, cache = true, { id, extras = [] } = {}) {
  _add(data, cache = true, event = data.event) {
    return super._add(data, cache, { id: event });
  }
}
