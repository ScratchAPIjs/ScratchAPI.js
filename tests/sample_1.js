"use strict";

require("dotenv").config();

const { Client } = require("../src");
const client = new Client();

client.on("ready", () => {
  console.log('Ready!');

  console.log(client.user.history.joinedAt);
  console.log(client.user.profile.url);
  console.log(client.user.profile.avatar);
  console.log(client.user.profile.avatarURL());

  client.on("message", message => {
    console.log(message);
  })
});

client.login(process.env.SCRATCH_USERNAME, process.env.SCRATCH_PASSWORD);