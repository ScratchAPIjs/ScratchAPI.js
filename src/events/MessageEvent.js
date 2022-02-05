const { Constants } = require("../configs/Constants");
const { Routes, Servers } = require("../session/Addresses");
const { Events } = require("../utils");

class MessageEvent {
  constructor(client) {
    this.client = client;
    this.unreadMessage = 0;
  }

  async start() {
    this.unreadMessage = await this.client.adapter.get(`${Routes.API.user(this.client.username)}messages/count/`);
    // console.log(messages)
    setInterval(this.eventUpdate.bind(this), Constants.API.MESSAGE_EVENT_FREQUENCE);
  }

  async eventUpdate() {
    let unreadMessage = (await this.client.adapter.get(
      `${Routes.API.user(this.client.username)}messages/count/?timestamp=${new Date().getTime()}`
    )).data.count;
    if (unreadMessage > this.unreadMessage) {
      let uncheckedMessage = unreadMessage - this.unreadMessage;
      let xToken = (await this.client.adapter.request(`https://${Servers.GENERAL}/session/`)).data.user.token;
      let messages = (await this.client.adapter.request({
        url: `${Routes.API.user(this.client.username)}messages?limit=${uncheckedMessage}&offset=0?timestamp=${new Date().getTime()}`,
        method: 'GET',
        headers: {
          'x-token': xToken
        }
      })).data;
      messages.forEach(message => {
        this.client.emit(Events.READY, message);
      });
    }
    this.unreadMessage = unreadMessage;
  }
}


module.exports = { MessageEvent };