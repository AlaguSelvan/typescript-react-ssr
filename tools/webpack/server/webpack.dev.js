const { resolve } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  output: {
    filename: 'dev-server-bundle.js'
    // chunkFilename: '[name].js'
  },
  plugins: [
    // new WriteFilePlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'public'
    //   }
    // ])
  ]
};
