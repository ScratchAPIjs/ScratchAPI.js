'use strict';

const { Base } = require('./Base');
const { User } = require('./User');

const { ProjectHistory } = require('./ProjectHistory');
const { ProjectStatistic } = require('./ProjectStatistic');
const { ProjectRemix } = require('./ProjectRemix');

class Project extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('title' in data) {
      this.title = String(data.title);
    } else {
      this.title ??= null;
    }
    if ('description' in data) {
      this.description = String(data.description);
    } else {
      this.description ??= null;
    }
    if ('instructions' in data) {
      this.instructions = String(data.instructions);
    } else {
      this.instructions ??= null;
    }
    if ('visibility' in data) {
      this.visibility = String(data.visibility);
    } else {
      this.visibility ??= null;
    }
    if ('public' in data) {
      this.public = Boolean(data.public);
    } else {
      this.public ??= null;
    }
    if ('comments_allowed' in data) {
      this.commentsAllowed = Boolean(data.comments_allowed);
    } else {
      this.commentsAllowed ??= null;
    }
    if ('is_published' in data) {
      this.published = Boolean(data.is_published);
    } else {
      this.published ??= null;
    }
    if ('author' in data) {
      this.author = new User(this.client, data.author);
    } else {
      this.author ??= null;
    }
    if ('image' in data) {
      this.image = String(data.image);
    } else {
      this.image ??= null;
    }
    if ('images' in data) {
      this.images = data.images;
    } else {
      this.images ??= null;
    }
    if ('history' in data) {
      this.history = new ProjectHistory(this, data.history);
    } else {
      this.history ??= null;
    }
    if ('stats' in data) {
      this.stats = new ProjectStatistic(this, data.stats);
    } else {
      this.stats ??= null;
    }
    if ('remix' in data) {
      this.remix = new ProjectRemix(this, data.remix);
    } else {
      this.remix ??= null;
    }
    return this;
  }

  async addComment(content) {
    await this.client.session.addComment({
      project: this.id,
      content: content,
    });
    return 'Message Object (Coming Soon)';
  }

  async modify(data) {
    if (this.author.username !== this.client.username) {
      throw new Error('PROJECT_NOT_YOURS', this.id);
    }
    return this.client.projects.modify(this.id, data);
  }

  async modify(data) {
    if (this.author.username !== this.client.username) {
      throw new Error('PROJECT_NOT_YOURS', this.id);
    }
    return this.client.projects.modify(this.id, data);
  }

  fetch(force = true) {
    return this.client.projects.fetch(this.id, { force });
  }
}

module.exports = { Project };
