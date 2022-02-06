'use strict';

const { Client } = require('../src');
const client = new Client();

client.on('ready', async () => {
  console.log('Ready!');

  //client.messageEvent.start();
  //client.messageEvent.clear();


  console.log(client.user.history.joinedAt);
  console.log(client.user.profile.url);
  console.log(client.user.profile.avatar);
  console.log(client.user.profile.avatarURL());

  const project = await client.projects.fetch('639429724');
  console.log(project);
  // console.log((await project.author.fetch()));

  ////client.on("message", message => {
  //   console.log(message);
  // })

  //console.log(await project.modify({"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["aaa",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"cd21514d0531fdffb22204e0ec5ed84a","name":"aasdfasdfasdf","md5ext":"cd21514d0531fdffb22204e0ec5ed84a.svg","dataFormat":"svg","rotationCenterX":240,"rotationCenterY":180}],"sounds":[{"assetId":"83a9787d4cb6f3b7632b4ddfebf74367","name":"testestest","dataFormat":"wav","format":"","rate":48000,"sampleCount":1123,"md5ext":"83a9787d4cb6f3b7632b4ddfebf74367.wav"}],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"aestasetasetaet","variables":{},"lists":{},"broadcasts":{},"blocks":{"hq8pLnFZb|b.oAntdSUl":{"opcode":"motion_glidesecstoxy","next":null,"parent":null,"inputs":{"SECS":[1,[4,"1"]],"X":[1,[4,"0"]],"Y":[1,[4,"0"]]},"fields":{},"shadow":false,"topLevel":true,"x":8,"y":497}},"comments":{},"currentCostume":0,"costumes":[{"assetId":"bcf454acf82e4504149f7ffe07081dbc","name":"aaaa","bitmapResolution":1,"md5ext":"bcf454acf82e4504149f7ffe07081dbc.svg","dataFormat":"svg","rotationCenterX":48,"rotationCenterY":50},{"assetId":"0fb9be3e8397c983338cb71dc84d0b25","name":"asdfas fasdf asdf ","bitmapResolution":1,"md5ext":"0fb9be3e8397c983338cb71dc84d0b25.svg","dataFormat":"svg","rotationCenterX":46,"rotationCenterY":53}],"sounds":[{"assetId":"83c36d806dc92327b9e7049a565c6bff","name":"testetset","dataFormat":"wav","format":"","rate":48000,"sampleCount":40681,"md5ext":"83c36d806dc92327b9e7049a565c6bff.wav"}],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"0.2.0-prerelease.20220118081555","agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (h;ahfd;asjkdhf laks, like Gecko) Chrome/97.0.4692.99 Hadjfaksjsdfjadsfkasjdfaklds/537.36"}}));
});

client.login();
