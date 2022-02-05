const { BaseManager } = require("./BaseManager");
const { Error } = require("../errors");
const { Routes } = require("../session/Addresses");

class ProjectManager extends BaseManager {
  constructor (client) {
    super(client);
  }

  getProject(projectID) {
    return new Promise(async (resolve) => {
      const response = await this.client.adapter.get(Routes.API.project(projectID));
      resolve(response.data);
    });
  }
}

module.exports = { ProjectManager };