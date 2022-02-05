"use strict";

const { Routes } = require("../session/Addresses");

const { Project } = require("../structures/Project");

const { CachedManager } = require("./CachedManager");

class ProjectManager extends CachedManager {
  constructor(client, iterable) {
    super(client, Project, iterable);
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
