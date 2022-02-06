'use strict';

const { Base } = require('./Base');

const { UserHistory } = require('./UserHistory');
const { UserProfile } = require('./UserProfile');

class User extends Base {
  constructor(client, data) {
    super(client);

    this.username = data.username;

    this._patch(data);
  }

  _patch(data) {
    const assign = this._makeAssigner(data);

    assign('id', String(data.id));
    assign(['scratchTeam', 'scratchteam']);
    assign('history', new UserHistory(this, data.history));

    assign('profile', new UserProfile(this, data.profile));

    return this;
  }

  get partial() {
    return typeof this.username === 'string';
  }

  async addComment(content) {
    await this.client.session.addComment({
      user: this.username,
      content: content,
    });
    return 'Message Object (Coming Soon)';
  }

  fetch(force = true) {
    return this.client.users.fetch(this.username, { force });
  }

  toString() {
    return `@${this.username}`;
  }
}

module.exports = { User };
