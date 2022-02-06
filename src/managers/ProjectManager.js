'use strict';

const { Routes } = require('../session/Addresses');
const { Error } = require('../errors');

const { Project } = require('../structures/Project');

const { CachedManager } = require('./CachedManager');

class ProjectManager extends CachedManager {
  constructor(client, iterable) {
    super(client, Project, iterable);
  }

  async modify(id, dataArg) {
    if (dataArg === undefined) throw new Error('ARG_MISSING', 'data');
    let data = dataArg;

    if (typeof data !== 'string' && typeof data !== 'object') {
      throw new TypeError('TYPE_INVALID');
    }

    // eslint-disable-next-line no-unused-vars
    const response = await this.client.adapter.put(Routes.API.projectSource(id), data);

    return 'Message Object (Coming Soon)';
  }

  async fetch(project, { cache = true, force = false } = {}) {
    const id = this.resolveId(project);
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const response = await this.client.adapter.get(Routes.API.project(id));

    return this._add(response.data, cache);
  }
}

module.exports = { ProjectManager };
