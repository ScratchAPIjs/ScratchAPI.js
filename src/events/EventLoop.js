import messageEvent from "./MessageEvent";

class EventLoop {
  constructor(client) {
    this.client = client;
  }

  start() {
    setTimeout(this.eventUpdate(), 10000);
  }

  eventUpdate() {
    this.client.adapter.get("/api/v1/channels/1/messages").then(res => {
      console.log(res.data);
      messageEvent.emit("message", res.data);
    });
  }
}

class EventItem {
  constructor(client, event) {
    this.client = client;
    this.event = event;
  }

  start() {
    setTimeout(eventUpdate(), 10000);
  }
}

export { EventLoop };