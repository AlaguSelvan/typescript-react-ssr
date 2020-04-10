const webpack = require('webpack');
const { resolve } = require('path');
const { smart } = require('webpack-merge');
const externals = require('./node-externals');

const config =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.prod')
    : require('./webpack.dev');

const base = {
  name: 'server',
  target: 'node',
  externals,
  mode: process.env.NODE_ENV,
  entry: resolve('server', 'render.tsx'),
  output: {
    path: resolve('build', 'server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};

module.exports = smart(base, config);
