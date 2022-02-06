'use strict';

void (function consoleLogColorizer() {
  let isColorKept = false;
  const colors = {
    black: '\u001b[30m',
    red: '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    blue: '\u001b[34m',
    magenta: '\u001b[35m',
    cyan: '\u001b[36m',
    white: '\u001b[37m',
    default: '\u001b[39m',
  };
  const coloResetter = {
    apply: function (target, thisArg, argumentsList) {
      target(...argumentsList);
      if (!isColorKept) thisArg?.resetColor();
      return console;
    },
  };
  console.log = new Proxy(console.log, coloResetter);
  console.setColor = (color, permanent = false) => {
    color = color.toLowerCase();
    if (!(typeof color === 'string' && color in colors)) color = 'default';
    process.stdout.write(colors[color]);
    isColorKept = permanent;
    return console;
  };
  console.resetColor = () => {
    process.stdout.write(colors.default);
    isColorKept = false;
  };
})();

class Util extends null {
  isObject(d) {
    return typeof d === 'object' && d !== null;
  }
  static cloneObject(obj) {
    return Object.assign(Object.create(obj), obj);
  }

  static mergeDefault(def, given) {
    if (!given) return def;
    for (const key in def) {
      if (!Object.hasOwn(given, key) || given[key] === undefined) {
        given[key] = def[key];
      } else if (given[key] === Object(given[key])) {
        given[key] = Util.mergeDefault(def[key], given[key]);
      }
    }

    return given;
  }

  static parseCookie(cookie) {
    var cookies = {};
    var each = cookie.split(';');
    var i = each.length;
    while (i--) {
      if (each[i].indexOf('=') === -1) {
        continue;
      }
      var pair = each[i].split('=');
      cookies[pair[0].trim()] = pair[1].trim();
    }
    return cookies;
  }
}

module.exports = { Util };
