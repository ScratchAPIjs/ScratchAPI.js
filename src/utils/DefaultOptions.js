'use strict';

const { Constants } = require('../configs/Constants');
const { Servers } = require('../session/Addresses');

class DefaultOptions extends null {
  static client = {};
  static REST = {
    headers: {
      'user-agent': 'null',
      'X-CSRFToken': 'null',
      'x-requested-with': 'XMLHttpRequest',
      cookie: 'scratchcsrftoken=null; scratchlanguage=en;',
      referer: `https://${Servers.GENERAL}/`,
    },
    timeout: Constants.API.REQUEST_TIMEOUT_MS,
  };
}

module.exports = { DefaultOptions };
