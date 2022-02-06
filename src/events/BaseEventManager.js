'use strict';

class BaseEventManager {
  constructor(client) {
    Object.defineProperty(this, 'client', { value: client });
  }
}

module.exports = {
  BaseEventManager,
};
