const webpack = require('webpack');
const { resolve } = require('path');
const { smart } = require('webpack-merge');
const externals = require('./node-externals');

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
  externals,
  mode: process.env.NODE_ENV,
  entry: './server/render.tsx',
  output: {
    path: resolve('build', 'server'),
    filename
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
            loader: 'ts-loader'
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
  ]
};

module.exports = smart(base, config);
