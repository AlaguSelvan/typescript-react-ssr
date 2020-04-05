const { smart } = require('webpack-merge');
const base = require('../webpack/webpack.config');

module.exports = async ({ config, mode }) => {
  // delete files of an entry point
  base.entry = [];

  return smart(base, config);
};
