"use strict";

const { register } = require("./JSALError");

const Messages = {
  CLIENT_INVALID_OPTION: (prop, must) => `The ${prop} option must be ${must}`,
  CLIENT_INVALID_PROVIDED_SHARDS: "None of the provided shards were valid.",
  CLIENT_MISSING_INTENTS: "Valid intents must be provided for the Client.",
  CLIENT_NOT_READY: (action) => `The client needs to be logged in to ${action}.`,

  TOKEN_INVALID: "An invalid token was provided.",
  TOKEN_MISSING: "Request to use token, but token was unavailable to the client.",

  REQUEST_INVALID: (error) => error,
  RESPONSE_ERRORED: (error) => error,

  LOGIN_REJECTED: (username, password) =>
    `Could not access provided Scratch account (${username}) with this password: ${password}`,

  FETCH_REJECTED: "The fetch request was rejected.",
  COMMENT_REJECTED: "The comments' request was rejected.",

  NOT_IMPLEMENTED: (what, name) => `Method ${what} not implemented on ${name}.`,
};

for (const [name, message] of Object.entries(Messages)) register(name, message);

module.exports = { Messages };
