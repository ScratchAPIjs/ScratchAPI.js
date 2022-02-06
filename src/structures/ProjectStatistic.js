"use strict";

const { ProjectDetail } = require("./ProjectDetail");

class ProjectStatistic extends ProjectDetail {
  constructor(project, data) {
    super(project);

    this._patch(data);
  }

  _patch(data) {
    const assign = this._makeAssigner(data);

    assign("views");
    assign("loves");
    assign("favorites");
    assign("remixes");

    return this;
  }
}

module.exports = { ProjectStatistic };
