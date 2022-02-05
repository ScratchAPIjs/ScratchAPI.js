"use strict";

const { ProjectDetail } = require("./ProjectDetail");

class ProjectStatistic extends ProjectDetail {
  constructor(project, data) {
    super(project);

    this._patch(data);
  }

  _patch(data) {
    if ("views" in data) {
      this.views = Number(data.views);
    } else {
      this.views ??= null;
    }
    if ("loves" in data) {
      this.loves = Number(data.loves);
    } else {
      this.loves ??= null;
    }
    if ("favorites" in data) {
      this.favorites = Number(data.favorites);
    } else {
      this.favorites ??= null;
    }
    if ("remixes" in data) {
      this.remixes = Number(data.remixes);
    } else {
      this.remixes ??= null;
    }
    return this;
  }
}

module.exports = { ProjectStatistic };
