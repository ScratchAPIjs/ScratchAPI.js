'use strict';

const code = Symbol('code');
const messages = new Map();

function makeError(Base) {
  return class ModuleError extends Base {
    constructor(key, ...args) {
      super(message(key, args));
      this[code] = key;
      if (Error.captureStackTrace) Error.captureStackTrace(this, ModuleError);
    }

    get name() {
      return `${super.name} [${this[code]}]`;
    }

    get code() {
      return this[code];
    }
  };
}

function message(key, args) {
  if (typeof key !== 'string') throw new Error('Error message key must be a string');
  const message = messages.get(key);
  if (!message) return; //throw new Error(`An invalid error message key was used: ${key}.`);
  if (typeof message === 'function') return message(...args);
  if (!args?.length) return message;
  args.unshift(message);
  return String(...args);
}

function register(symbol, value) {
  messages.set(symbol, typeof value === 'function' ? value : String(value));
}

module.exports = {
  register,
  Error: makeError(Error),
  TypeError: makeError(TypeError),
  RangeError: makeError(RangeError),
};
