# Scratch-API-Librarys

## About
This is a Node.js module that makes it easy to access the Scratch API.
(It is under development.)

## Support
This library allows you to do the following:
- Log in to your Scratch account.
- Send comments to yourself and other users.
- Receive notifications to your account.

_There will be more to come!_

## License
This library contains the following artifacts distributed under the license of the **Apache License, Version 2.0**:
- [`@discordjs/collection`](https://github.com/discordjs/discord.js/tree/main/packages/collection)

## Acknowledgements
This library is based on the design of [Discord.js](https://github.com/discordjs/discord.js). With thanks to Discord.js, the awesome library.

## Example usage
```js
const { Client } = require("../src");
const client = new Client();

client.on("ready", async () => {
  console.log("Ready!");

  //client.messageEvent.start();

  // Stop messageEvent
  //client.messageEvent.clear();

  console.log(client.user.history.joinedAt);
  console.log(client.user.profile.url);
  console.log(client.user.profile.avatar);
  console.log(client.user.profile.avatarURL());

  const project = await client.projects.fetch(ProjectID);
  console.log(project);
  console.log((await project.author.fetch()).profile);

  client.on("message", message => {
    console.log(message);
  })

  console.log(await client.projectManager.getProject(ProjectID));
});

client.login();
```
