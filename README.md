# Scratch-API-Librarys
## About
### Example usage
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

## License
This library contains the following artifacts distributed under the license of the Apache License, Version 2.0:
- [`@discordjs/collection`](https://github.com/discordjs/discord.js/tree/main/packages/collection)

## Acknowledgements
This library is based on the design of Discord.js. With thanks to Discord.js, the awesome library.
