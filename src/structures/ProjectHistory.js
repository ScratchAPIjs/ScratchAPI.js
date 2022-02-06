"use strict";

const { ProjectDetail } = require("./ProjectDetail");

class ProjectHistory extends ProjectDetail {
  constructor(project, data) {
    super(project);

    this._patch(data);
  }

  _patch(data) {
    const assign = this._makeAssigner(data);

    assign(["createdAt", "created"], new Date(data.created));
    assign(["modifiedAt", "modified"], new Date(data.modified));
    assign(["sharedAt", "shared"], new Date(data.shared));

    return this;
  }
}

module.exports = { ProjectHistory };
