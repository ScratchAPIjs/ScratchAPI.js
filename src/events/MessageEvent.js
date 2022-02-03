import { Constants } from "../configs/Constants";

class MessageEvent {
  constructor(client) {
    this.client = client;
  }

  start() {
    this.eventUpdate();
    setInterval(this.eventUpdate.bind(this), Constants.API_MESSAGE_EVENT_FREQUENCE)
  }

  eventUpdate() {
    this.client.adapter.get(`https://api.scratch.mit.edu/users/${this.client.username}/messages/count`).then(res => {
      if (res.data.count > 0) {
        this.client.emit("message", res.data.count); // TODO: Add message data
        this.client.adapter.post('https://scratch.mit.edu/site-api/messages/messages-clear/');
      }
    });
  }
}

export default MessageEvent;