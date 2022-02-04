const { Constants } = require("../configs/Constants");
const { Routes } = require("../session/Addresses");

class MessageEvent {
  constructor(client) {
    this.client = client;
  }

  start() {
    this.eventUpdate();
    setInterval(this.eventUpdate.bind(this), Constants.API.MESSAGE_EVENT_FREQUENCE);
  }

  eventUpdate() {
    this.client.adapter.get(`${Routes.API.user(this.client.username)}messages/count/`).then(res => {
      if (res.data.count > 0) {
        this.client.emit("message", res.data.count); // TODO: Add message data
        this.client.adapter.post('https://scratch.mit.edu/site-api/messages/messages-clear/');
      }
    });
  }
}


module.exports = { MessageEvent };