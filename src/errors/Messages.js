'use strict';

const { register } = require('./ErrorHandler');

const Messages = {
  CLIENT_INVALID_OPTION: (prop, must) => `The ${prop} option must be ${must}`,
  CLIENT_INVALID_PROVIDED_SHARDS: 'None of the provided shards were valid.',
  CLIENT_MISSING_INTENTS: 'Valid intents must be provided for the Client.',
  CLIENT_NOT_READY: (action) => `The client needs to be logged in to ${action}.`,

  TOKEN_INVALID: 'An invalid token was provided.',
  TOKEN_MISSING: 'Request to use token, but token was unavailable to the client.',

  REQUEST_INVALID: (error) => error,
  RESPONSE_ERRORED: (error) => error,

  LOGIN_REJECTED: (username) =>
    `Could not access the Scratch account (aka ${username}): An incorrect password might be provided.`,

  FETCH_REJECTED: 'The fetch request was rejected.',
  COMMENT_REJECTED: "The comments' request was rejected.",

  NOT_IMPLEMENTED: (what, name) => `Method ${what} not implemented on ${name}.`,

  PROJECT_NOT_YOURS: (projectId) =>
    `You are not author of this project (aka id: ${projectId}).\nCan't modify.`,

  PROJECT_NOT_FOUND: (projectId) => `Project (aka id: ${projectId}) not found.`,

  ARG_MISSING: (name) => `Missing argument: ${name}`,

  TEST_ERROR: 'This is an error for the test.',
};

for (const [name, message] of Object.entries(Messages)) register(name, message);

module.exports = { Messages };
