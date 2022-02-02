"use strict";

const kCode = Symbol("code");
const messages = new Map();

function makeModuleError(Base) {
  return class ModuleError extends Base {
    constructor(key, ...args) {
      super(message(key, args));
      this[kCode] = key;
      if (Error.captureStackTrace) Error.captureStackTrace(this, ModuleError);
    }

    get name() {
      return `${super.name} [${this[kCode]}]`;
    }

    get code() {
      return this[kCode];
    }
  };
}

function message(key, args) {
  if (typeof key !== "string") throw new Error("Error message key must be a string");
  const msg = messages.get(key);
  if (!msg) return; //throw new globalThis.Error(`An invalid error message key was used: ${key}.`);
  if (typeof msg === "function") return msg(...args);
  if (!args?.length) return msg;
  args.unshift(msg);
  return String(...args);
}

export function register(sym, val) {
  messages.set(sym, typeof val === "function" ? val : String(val));
}

export const Error = makeModuleError(globalThis.Error);
export const TypeError = makeModuleError(globalThis.TypeError);
export const RangeError = makeModuleError(globalThis.RangeError);
