'use strict';

const { Base } = require('./Base');

class ProjectDetail extends Base {
  constructor(project) {
    super(project.client);

    Object.defineProperty(this, 'project', { value: project });
  }
}

module.exports = { ProjectDetail };
