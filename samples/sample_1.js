"use strict";

require("dotenv").config();

const { Client } = require("../src");
const client = new Client();

client.on("ready", async () => {
  console.log("Ready!");

  //client.messageEvent.start();
  //client.messageEvent.clear();

  console.log(client.user.history.joinedAt);
  console.log(client.user.profile.url);
  console.log(client.user.profile.avatar);
  console.log(client.user.profile.avatarURL());

  const project = await client.projects.fetch("624134306");
  console.log(project);
  // console.log((await project.author.fetch()));

  ////client.on("message", message => {
  //   console.log(message);
  // })

  // console.log(await project.modify());
});

client.login(process.env.SCRATCH_USERNAME, process.env.SCRATCH_PASSWORD);
