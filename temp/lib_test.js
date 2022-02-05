"use strict";

const https = require("https");
const util = require("util");
const events = require("events");
const fs = require("fs");
const WebSocket = require("ws");

let SERVER = "scratch.mit.edu";
let PROJECTS_SERVER = "projects.scratch.mit.edu";
let CDN_SERVER = "cdn.scratch.mit.edu";
let CLOUD_SERVER = "clouddata.scratch.mit.edu";
let API_SERVER = "api.scratch.mit.edu";

let SESSION_FILE = ".scratchSession";

function request(options, cb) {
  let headers = {
    Cookie: "scratchcsrftoken=a; scratchlanguage=en;",
    "X-CSRFToken": "a",
    referer: "https://scratch.mit.edu", // fromd by Scratch servers
  };
  if (options.headers) {
    for (let name in options.headers) {
      headers[name] = options.headers[name];
    }
  }
  if (options.body) headers["Content-Length"] = Buffer.byteLength(options.body);
  if (options.sessionId) headers.Cookie += "scratchsessionsid=" + options.sessionId + ";";
  let req = https.request(
    {
      hostname: options.hostname || SERVER,
      port: 443,
      path: options.path,
      method: options.method || "GET",
      headers: headers,
    },
    function (response) {
      let parts = [];
      response.on("data", function (chunk) {
        parts.push(chunk);
      });
      response.on("end", function () {
        cb(null, Buffer.concat(parts).toString(), response);
      });
    }
  );
  req.on("error", cb);
  if (options.body) req.write(options.body);
  req.end();
}

function requestJSON(options, cb) {
  request(options, function (err, body, response) {
    if (err) return cb(err);
    try {
      cb(null, JSON.parse(body));
    } catch (e) {
      cb(e);
    }
  });
}

function parseCookie(cookie) {
  let cookies = {};
  let each = cookie.split(";");
  let i = each.length;
  while (i--) {
    if (each[i].indexOf("=") === -1) {
      continue;
    }
    let pair = each[i].split("=");
    cookies[pair[0].trim()] = pair[1].trim();
  }
  return cookies;
}

let Scratch = {};

Scratch.getProject = function (projectId, cb) {
  requestJSON(
    {
      hostname: PROJECTS_SERVER,
      path: "/" + projectId,
      method: "GET",
    },
    cb
  );
};
Scratch.getProjects = function (username, cb) {
  requestJSON(
    {
      hostname: API_SERVER,
      path: "/users/" + username + "/projects",
      method: "GET",
    },
    cb
  );
};
Scratch.UserSession = function (username, id, sessionId) {
  this.username = username;
  this.id = id;
  this.sessionId = sessionId;
};
Scratch.UserSession.create = function (username, password, cb) {
  request(
    {
      path: "/login/",
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "X-Requested-With": "XMLHttpRequest" },
    },
    function (err, body, response) {
      if (err) return cb(err);
      try {
        let user = JSON.parse(body)[0];
        if (user.msg) return cb(new Error(user.msg));
        cb(
          null,
          new Scratch.UserSession(
            user.username,
            user.id,
            parseCookie(response.headers["set-cookie"][0]).scratchsessionsid
          )
        );
      } catch (e) {
        cb(e);
      }
    }
  );
};
Scratch.UserSession.prompt = function (cb) {
  let prompt = from("prompt");
  prompt.start();
  prompt.get([{ name: "username" }, { name: "password", hidden: true }], function (err, results) {
    if (err) return cb(err);
    Scratch.UserSession.create(results.username, results.password, cb);
  });
};
Scratch.UserSession.load = function (cb) {
  function prompt() {
    Scratch.UserSession.prompt(function (err, session) {
      if (err) return cb(err);
      session._saveSession(function () {
        cb(null, session);
      });
    });
  }
  fs.readFile(SESSION_FILE, function (err, data) {
    if (err) return prompt();
    let obj = JSON.parse(data.toString());
    let session = new Scratch.UserSession(obj.username, obj.id, obj.sessionId);
    session.verify(function (err, valid) {
      if (err) return cb(err);
      if (valid) return cb(null, session);
      prompt();
    });
  });
};
Scratch.UserSession.prototype._saveSession = function (cb) {
  fs.writeFile(
    SESSION_FILE,
    JSON.stringify({
      username: this.username,
      id: this.id,
      sessionId: this.sessionId,
    }),
    cb
  );
};
Scratch.UserSession.prototype.verify = function (cb) {
  request(
    {
      path: "/messages/ajax/get-message-count/", // probably going to change quite soon
      sessionId: this.sessionId,
    },
    function (err, body, response) {
      cb(null, !err && response.statusCode === 200);
    }
  );
};
Scratch.UserSession.prototype.getProject = Scratch.getProject;
Scratch.UserSession.prototype.getProjects = function (cb) {
  Scratch.getProjects(this.username, cb);
};

Scratch.UserSession.prototype.getAllProjects = function (cb) {
  requestJSON(
    {
      hostname: SERVER,
      path: "/site-api/projects/all/",
      method: "GET",
      sessionId: this.sessionId,
    },
    cb
  );
};
Scratch.UserSession.prototype.setProject = function (projectId, payload, cb) {
  if (typeof payload !== "string") payload = JSON.stringify(payload);
  requestJSON(
    {
      hostname: PROJECTS_SERVER,
      path: "/internalapi/project/" + projectId + "/set/",
      method: "POST",
      body: payload,
      sessionId: this.sessionId,
    },
    cb
  );
};
Scratch.UserSession.prototype.getBackpack = function (cb) {
  requestJSON(
    {
      hostname: SERVER,
      path: "/internalapi/backpack/" + this.username + "/get/",
      method: "GET",
      sessionId: this.sessionId,
    },
    cb
  );
};
Scratch.UserSession.prototype.setBackpack = function (payload, cb) {
  if (typeof payload !== "string") payload = JSON.stringify(payload);
  requestJSON(
    {
      hostname: SERVER,
      path: "/internalapi/backpack/" + this.username + "/set/",
      method: "POST",
      body: payload,
      sessionId: this.sessionId,
    },
    cb
  );
};
Scratch.UserSession.prototype.addComment = function (options, cb) {
  let type, id;
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
  request(
    {
      hostname: SERVER,
      path: "/site-api/comments/" + type + "/" + id + "/add/",
      method: "POST",
      body: JSON.stringify({
        content: options.content,
        parent_id: options.parent || "",
        commentee_id: options.replyto || "",
      }),
      sessionId: this.sessionId,
    },
    cb
  );
};
Scratch.UserSession.prototype.cloudSession = function (projectId, cb) {
  Scratch.CloudSession._create(this, projectId, cb);
};
Scratch.CloudSession = function (user, projectId) {
  this.user = user;
  this.projectId = "" + projectId;
  this.connection = null;
  this.attemptedPackets = [];
  this.letiables = Object.create(null);
  this._letiables = Object.create(null);
};
util.inherits(Scratch.CloudSession, events.EventEmitter);
Scratch.CloudSession._create = function (user, projectId, cb) {
  let session = new Scratch.CloudSession(user, projectId);
  session._connect(function (err) {
    if (err) return cb(err);
    cb(null, session);
  });
};
Scratch.CloudSession.prototype._connect = function (cb) {
  let self = this;

  this.connection = new WebSocket("wss://" + CLOUD_SERVER + "/", [], {
    headers: {
      cookie: "scratchsessionsid=" + this.user.sessionId + ";",
      origin: "https://scratch.mit.edu",
    },
  });
  this.connection.on("open", function () {
    self._sendHandshake();
    for (let i = 0; i < self.attemptedPackets.length; i++) {
      self._sendPacket(self.attemptedPackets[i]);
    }
    self.attemptedPackets = [];
    if (cb) cb();
  });

  this.connection.on("close", function () {
    // Reconnect because Scratch disconnects clients after no activity
    // Probably will cause some data to not be pushed
    self._connect();
  });

  let stream = "";
  this.connection.on("message", function (chunk) {
    stream += chunk;
    let packets = stream.split("\n");
    for (let i = 0; i < packets.length - 1; i++) {
      let line = packets[i];
      let packet;
      try {
        packet = JSON.parse(line);
      } catch (err) {
        console.warn("Invalid packet %s", line);
        return;
      }
      self._handlePacket(packet);
    }
    stream = packets[packets.length - 1];
  });
};
Scratch.CloudSession.prototype.end = function () {
  if (this.connection) {
    this.connection.close();
  }
};
Scratch.CloudSession.prototype.get = function (name) {
  return this._letiables[name];
};
Scratch.CloudSession.prototype.set = function (name, value) {
  this._letiables[name] = value;
  this._sendSet(name, value);
};
Scratch.CloudSession.prototype._handlePacket = function (packet) {
  switch (packet.method) {
    case "set":
      if (!{}.hasOwnProperty.call(this.letiables, packet.name)) {
        this._addletiable(packet.name, packet.value);
      }
      this._letiables[packet.name] = packet.value;
      this.emit("set", packet.name, packet.value);
      break;
    default:
      console.warn("Unimplemented packet", packet.method);
  }
};
Scratch.CloudSession.prototype._sendHandshake = function () {
  this._send("handshake", {});
};
Scratch.CloudSession.prototype._sendSet = function (name, value) {
  this._send("set", {
    name: name,
    value: value,
  });
};
Scratch.CloudSession.prototype._send = function (method, options) {
  let object = {
    user: this.user.username,
    project_id: this.projectId,
    method: method,
  };
  for (let name in options) {
    object[name] = options[name];
  }

  this._sendPacket(JSON.stringify(object) + "\n");
};
Scratch.CloudSession.prototype._sendPacket = function (data) {
  if (this.connection.readyState === WebSocket.OPEN) {
    this.connection.send(data);
  } else {
    this.attemptedPackets.push(data);
  }
};
Scratch.CloudSession.prototype._addletiable = function (name, value) {
  let self = this;
  this._letiables[name] = value;
  Object.defineProperty(this.letiables, name, {
    enumerable: true,
    get: function () {
      return self.get(name);
    },
    set: function (value) {
      self.set(name, value);
    },
  });
};

Scratch.UserSession.create("kakurenbo", "kohma1116", (error, user) => {
  console.log(user);
  user.cloudSession("637749643", (error, cloud) => {
    console.log(cloud.get("☁ Cloud_1"));
    cloud.set("☁ Cloud_1", 1);
    console.log(cloud.get("☁ Cloud_1"));
    cloud.on("set", (name, value) => {
      console.log(name, value);
      console.log(cloud.get("☁ Cloud_1"));
    });
  });
});
