"use strict";

import { Client } from "../src";

const client = new Client();

client.on("ready", () => {
  console.log(client.user);
  client.user.addComment("<content that you want to send>");
});

client.login("<your account's name>", "<your account's password>");