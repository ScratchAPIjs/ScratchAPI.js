require('./utils/Util.js');

module.exports = {
  ...require('./client/BaseClient'),
  ...require('./client/Client'),

  ...require('./structures/Base'),
  ...require('./structures/User'),
};
