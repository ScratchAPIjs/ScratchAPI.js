"use strict";

const { request } = require("../functions/Request");

let Scratch = {};

function parseCookie(cookie) {
  var cookies = {};
  var each = cookie.split(";");
  var i = each.length;
  while (i--) {
    if (each[i].indexOf("=") === -1) {
      continue;
    }
    var pair = each[i].split("=");
    cookies[pair[0].trim()] = pair[1].trim();
  }
  return cookies;
}

Scratch.UserSession = function (username, id, sessionId) {
  this.username = username;
  this.id = id;
  this.sessionId = sessionId;
};

Scratch.UserSession.create = async function (username, password) {
  const response = await request({
    path: "/accounts/login/",
    method: "POST",
    body: { username: username, password: password },
    headers: {
      "x-requested-with": "XMLHttpRequest",
    },
  });
  const user = response.data[0];
  //console.log(user);
  //console.log(parseCookie(response.headers["set-cookie"][0]).scratchsessionsid);
  return new Scratch.UserSession(
    user.username,
    user.id,
    parseCookie(response.headers["set-cookie"][0]).scratchsessionsid
  );
};
Scratch.UserSession.prototype.addComment = async function (options) {
  var type, id;
  if (options.project) {
    type = "project";
    id = options.project;
  } else if (options.user) {
    type = "user";
    id = options.user;
  } else if (options.studio) {
    type = "gallery";
    id = options.studio;
  }
  return await request({
    path: "/site-api/comments/" + type + "/" + id + "/add/",
    method: "POST",
    body: {
      content: options.content,
      parent_id: options.parent || "",
      commentee_id: options.replyto || "",
    },
    headers: {
      "x-requested-with": "XMLHttpRequest",
      cookie: `scratchcsrftoken=null; scratchsessionsid=${this.sessionId};`,
    },
    responseType: "document",
  });
};
