# ScratchAPI.js
A great library for the Scratch API.

## About
This is a [Node.js](https://nodejs.org/en/) module that makes it easy to access the [Scratch](https://scratch.mit.edu/) API.
(It is under development.)

## Features
This library allows you to do the following:
- Log in to your Scratch account.
- Receive notifications to your account.
- Modify project.
- Get user / project data.

## Example usage
```js
const { Client } = require('@scratchapijs/scratchapi.js');
const client = new Client();

client.on('ready', async () => {
  console.log('Ready!');

  console.log(client.user);
  console.log(client.user.history.joinedAt);
  console.log(client.user.profile.url);
  console.log(client.user.profile.avatar);
  console.log(client.user.profile.avatarURL());

  client.user.addComment('Hello, world!');
});
client.on('message', message => {
  console.log(message);
  
  if (message.type === 'commentadd') {
    client.session.addComment({
      content: 'Hello!',
      parent: message.comment_id,
      user: user.username
    });
  }
})

client.login('<username>', '<password>');
```

## Demo
https://scratch.mit.edu/users/comment-bot/

## License
This library is licensed under the **Apache License 2.0**.

## Acknowledgements
**This library is based on the design of [Discord.js](https://github.com/discordjs/discord.js).**
－Thanks to Discord.js, the awesome library.

### Dependencies
The following modules are contained in the dependencies:
- [`@discordjs/collection`](https://github.com/discordjs/discord.js/tree/main/packages/collection)
- [`axios`](https://github.com/axios/axios)

### Others
The following services are being used for development:
- [`ESLint`](https://github.com/eslint/eslint)
- [`dotenv`](https://github.com/motdotla/dotenv)
