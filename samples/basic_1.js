"use strict";

const { Client } = require("../src");

const client = new Client();

client.on("ready", () => {
  console.log(client.user);

  console.log(client.user.history.joinedAt);
  console.log(client.user.profile.url);
  console.log(client.user.profile.avatar);
  console.log(client.user.profile.avatarURL());

  //client.user.addComment("<content that you want to send>").then(console.log);
});

client.login("<your account's name>", "<your account's password>");
