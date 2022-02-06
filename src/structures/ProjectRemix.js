'use strict';

const { ProjectDetail } = require('./ProjectDetail');

class ProjectRemix extends ProjectDetail {
  constructor(project, data) {
    super(project);

    this._patch(data);
  }

  _patch(data) {
    if ('parent' in data) {
      this.parent = data.parent;
    } else {
      this.parent ??= null;
    }
    if ('root' in data) {
      this.root = data.root;
    } else {
      this.root ??= null;
    }
    return this;
  }
}

module.exports = { ProjectRemix };
