const { resolve } = require('path');
const { smart } = require('webpack-merge')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
// const LoadablePlugin = require('@loadable/webpack-plugin');

const config =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.prod')
    : require('./webpack.dev')

const base = {
  name: 'client',
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: {
    vendor: ['react', 'react-dom']
  },
  output: {
    path: resolve('build', 'client'),
    publicPath: '/'
  },
  module: {
    rules: [
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
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new ManifestPlugin({
      fileName: resolve(process.cwd(), 'build/webpack-assets.json'),
      filter: file => file.isInitial
    }),
    // new LoadablePlugin({
    //   writeToDisk: true,
    //   fileName: resolve(process.cwd(), 'build/loadable-stats.json')
    // })
  ]
};

module.exports = smart(base, config)