'use strict';

const Servers = {
  GENERAL: 'scratch.mit.edu',
  API: 'api.scratch.mit.edu',
  CDN: 'uploads.scratch.mit.edu',
  PROJECTS: 'projects.scratch.mit.edu',
};

const Routes = {
  get login() {
    return `https://${Servers.GENERAL}/accounts/login/`;
  },
  get session() {
    return `https://${Servers.GENERAL}/session/`;
  },
  Web: {
    user(username) {
      return `https://${Servers.GENERAL}/users/${username}/`;
    },
    project(id) {
      return `https://${Servers.GENERAL}/projects/${id}/`;
    },
  },
  Image: {
    user(id, size = 90) {
      return `https://${Servers.CDN}/get_image/user/${id}_${size}x${size}.png?v=`;
    },
  },
  API: {
    user(username) {
      return `https://${Servers.API}/users/${username}/`;
    },
    messages(username) {
      return `${Routes.API.user(username)}messages/`;
    },
    messagesCount(username) {
      return `${Routes.API.messages(username)}count/`;
    },
    postComment(type, identifier) {
      return `https://${Servers.GENERAL}/site-api/comments/${type}/${identifier}/add/`;
    },
    project(id) {
      return `https://${Servers.API}/projects/${id}/`;
    },
    projectSource(id) {
      return `https://${Servers.PROJECTS}/${id}/`;
    },
  },
};

module.exports = {
  Servers,
  Routes,
};
