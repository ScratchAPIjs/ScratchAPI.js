'use strict';

const { BaseManager } = require('./BaseManager');
const { Error } = require('../errors');

class DataManager extends BaseManager {
  constructor(client, holds) {
    super(client);

    Object.defineProperty(this, 'holds', { value: holds });
  }

  get cache() {
    throw new Error('NOT_IMPLEMENTED', 'get cache', this.constructor.name);
  }

  resolve(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance;
    if (typeof idOrInstance === 'string') return this.cache.get(idOrInstance) ?? null;
    return null;
  }

  resolveId(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance.id;
    if (typeof idOrInstance === 'string') return idOrInstance;
    return null;
  }

  valueOf() {
    return this.cache;
  }
}

module.exports = { DataManager };
