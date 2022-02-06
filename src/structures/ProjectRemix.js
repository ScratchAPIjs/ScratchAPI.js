'use strict';

const { ProjectDetail } = require('./ProjectDetail');

class ProjectRemix extends ProjectDetail {
  constructor(project, data) {
    super(project);

    this._patch(data);
  }

  _patch(data) {
    const assign = this._makeAssigner(data);

    assign('parent');
    assign('root');
    return this;
  }
}

module.exports = { ProjectRemix };
