'use strict';

const { Constants } = require('../configs/Constants');
const { Routes } = require('../session/Addresses');

const { BaseEventManager } = require('./BaseEventManager');

const { Events } = require('../utils');

class MessageEventManager extends BaseEventManager {
  constructor(client) {
    super(client);

    this.unreadMessageCount_old = 0;
  }

  async start() {
    this.unreadMessageCount_old = await this.#getUnreadMessageCount();
    // console.log(messages)
    this.id = setInterval(this.eventUpdate.bind(this), Constants.API.MESSAGE_EVENT_FREQUENCE);
  }

  async eventUpdate() {
    const unreadMessageCount = await this.#getUnreadMessageCount();

    if (unreadMessageCount > this.unreadMessageCount_old) {
      const newMessagesCount = unreadMessageCount - this.unreadMessageCount_old;

      const newMessages = await this.#getNewMessages(newMessagesCount);

      newMessages.forEach((message) => {
        this.client.emit(Events.MESSAGE, message);
      });
    }
    this.unreadMessageCount_old = unreadMessageCount;
  }

  async #getUnreadMessageCount() {
    const response = await this.client.adapter.get(Routes.API.messagesCount(this.client.username), {
      params: { timestamp: Date.now() },
    });
    return response.data.count;
  }

  async #getNewMessages(limit) {
    const response = await this.client.adapter.get(Routes.API.messages(this.client.username), {
      params: {
        limit: limit,
        offset: 0,
        timestamp: Date.now(),
      },
    });
    return response.data;
  }

  clear() {
    clearInterval(this.id);
  }
}

module.exports = { MessageEventManager };
