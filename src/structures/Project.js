"use strict";

const { Base } = require("./Base");
const { User } = require("./User");

const { ProjectHistory } = require("./ProjectHistory");
const { ProjectStatistic } = require("./ProjectStatistic");
const { ProjectRemix } = require("./ProjectRemix");

class Project extends Base {
  constructor(client, data) {
    super(client);

    this.id = String(data.id);

    this._patch(data);
  }

  _patch(data) {
    const assign = this._makeAssigner(data);

    assign("title");

    assign("description");
    assign("instructions");

    assign("visibility");
    assign("public");
    assign(["published", "is_published"]);

    assign(["commentsAllowed", "comments_allowed"]);

    assign("image");
    assign("images");

    assign("author", new User(this.client, data.author));

    assign("history", new ProjectHistory(this, data.history));
    assign("stats", new ProjectStatistic(this, data.stats));
    assign("remix", new ProjectRemix(this, data.remix));

    return this;
  }

  async addComment(content) {
    await this.client.session.addComment({
      project: this.id,
      content: content,
    });
    return "Message Object (Coming Soon)";
  }

  fetch(force = true) {
    return this.client.projects.fetch(this.id, { force });
  }
}

module.exports = { Project };
