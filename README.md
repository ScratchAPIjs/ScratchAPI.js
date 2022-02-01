# Scratch-API-Librarys


## 機能解説

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
