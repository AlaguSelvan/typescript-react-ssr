const webpack = require('webpack')
const { resolve } = require('path');
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const externals = require('./node-externals');

const config =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.prod')
    : require('./webpack.dev')

const base = {
  name: 'server',
  target: 'node',
  entry: '../../src/server/server.tsx',
  output: {
    path: resolve('build', 'server'),
    publicPath: '/public/',
    // libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV
      }
    })
  ]
};

module.exports = smart(base, config)