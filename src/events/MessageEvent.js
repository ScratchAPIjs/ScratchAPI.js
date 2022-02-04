const { Constants } = require("../configs/Constants");
const { Routes } = require("../session/Addresses");

class MessageEvent {
  constructor(client) {
    this.client = client;
    this.messageCount = 0;
  }

  async start() {
    await this.client.adapter.get(`${Routes.API.user(this.client.username)}messages/count/`).then(res => {
      this.messageCount = res.data.count;
    });

    this.eventUpdate();
    setInterval(this.eventUpdate.bind(this), Constants.API.MESSAGE_EVENT_FREQUENCE);
  }

  eventUpdate() {
    this.client.adapter.get(`${Routes.API.user(this.client.username)}messages/count/`).then(res => {
      if (this.messageCount > res.data.count) {
        this.client.emit("message", res.data.count); // TODO: Add message data
      }
      this.messageCount = res.data.count;
    });
  }
}


module.exports = { MessageEvent };