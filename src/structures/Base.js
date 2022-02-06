"use strict";

class Base {
  constructor(client) {
    Object.defineProperty(this, "client", { value: client });
  }

  _clone() {
    return Object.assign(Object.create(this), this);
  }
  _patch(data) {
    return data;
  }
  _update(data) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }

  _makeAssigner(data) {
    return (properties, wrapt, init) => {
      let target, source;
      if (Array.isArray(properties)) {
        [target, source = target] = properties;
      } else {
        target = source = properties;
      }
      wrapt ??= data[source];

      if (source in data) {
        this[target] = wrapt;
      } else if (init !== void 0) {
        this[target] = init;
      }
    };
  }

  valueOf() {
    return this.id;
  }
}

module.exports = { Base };
