const { resolve } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    filename: 'dev-server-bundle.js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
