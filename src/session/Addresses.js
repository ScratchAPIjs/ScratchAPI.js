'use strict';

const Servers = {
  GENERAL: 'scratch.mit.edu',
  API: 'api.scratch.mit.edu',
  CDN: 'uploads.scratch.mit.edu',
  PROJECTS: 'projects.scratch.mit.edu',
};

const Routes = {
  get LOGIN() {
    return `https://${Servers.GENERAL}/accounts/login/`;
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
