const webpack = require('webpack');
const { join, resolve } = require('path');
const { smart } = require('webpack-merge');
const externals = require('./node-externals');
const nodeExternals = require('webpack-node-externals');

const config =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.prod')
    : require('./webpack.dev');
const filename =
  process.env.NODE_ENV === 'production'
    ? 'dev-server-bundle.js'
    : 'prod-server-bundle.js';

const base = {
  name: 'server',
  target: 'node',
  mode: process.env.NODE_ENV,
  entry: resolve('server', 'render.tsx'),
  output: {
    filename,
    path: resolve('build', 'server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader',
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true
            }
          }
        ]
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
  ],
  externals: [nodeExternals()]
};

module.exports = smart(base, config);
