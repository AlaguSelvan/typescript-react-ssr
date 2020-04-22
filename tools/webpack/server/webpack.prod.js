const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    filename: 'prod-server-bundle.js',
    output: {
      libraryTarget: 'commonjs2'
    }
  }
};
