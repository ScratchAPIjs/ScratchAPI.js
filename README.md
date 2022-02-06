# Scratch-API-Librarys

### Example usage
```js
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

### プロフィールにコメントする
```js
$jsal.postProfileComment(username,content)
```
### project.jsonを書き換える
```js
$jsal.changeProject(projectid,json)
```
### プロフィールのコメント欄を閉じる・開ける
```js
$jsal.toggleProfileComments(username)
```
### sessionを読み込み、新たな関数を追加する
```js
$jsal.readSession(読み込んだ後実行する関数)
```
### プロジェクトにコメントする
```js
$jsal.postProjectComment(projectid,content)
```
### スタジオにコメントする
```js
$jsal.postStudioComment(studioid,content)
```
