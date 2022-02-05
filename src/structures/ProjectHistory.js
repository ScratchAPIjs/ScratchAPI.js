"use strict";

const { ProjectDetail } = require("./ProjectDetail");

class ProjectHistory extends ProjectDetail {
  constructor(project, data) {
    super(project);

    this._patch(data);
  }

  _patch(data) {
    if ("created" in data) {
      this.createdAt = new Date(data.created);
    } else {
      this.createdAt ??= null;
    }
    if ("modified" in data) {
      this.modifiedAt = new Date(data.modified);
    } else {
      this.modifiedAt ??= null;
    }
    if ("shared" in data) {
      this.sharedAt = new Date(data.shared);
    } else {
      this.sharedAt ??= null;
    }
    return this;
  }
}

module.exports = { ProjectHistory };
