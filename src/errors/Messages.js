'use strict';

const { register } = require('./ErrorHandler');

const Messages = {
  CLIENT_INVALID_OPTION: (prop, must) => `The ${prop} option must be ${must}`,

  USERNAME_INVALID: 'An invalid username was provided.',
  PASSWORD_INVALID: 'An invalid password was provided.',

  REQUEST_INVALID: (error) => error,
  RESPONSE_ERRORED: (error) => error,

  LOGIN_REJECTED: (username) =>
    `Could not access the Scratch account (aka ${username}): An incorrect password might be provided.`,

  FETCH_REJECTED: 'The fetch request was rejected.',
  COMMENT_REJECTED: 'The comment request was rejected.',

  NOT_IMPLEMENTED: (what, name) => `Method ${what} not implemented on ${name}.`,

  PROJECT_NOT_YOURS: (projectId) =>
    `You are not author of this project (aka projectID: ${projectId}).\nCan't modify.`,

  PROJECT_NOT_FOUND: (projectId) => `Project (aka projectID: ${projectId}) not found.`,

  ARG_MISSING: (name) => `Missing argument: ${name}`,
};

for (const [name, message] of Object.entries(Messages)) register(name, message);

module.exports = { Messages };
