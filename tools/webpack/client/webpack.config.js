const { resolve } = require('path');
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: resolve('build', 'client'),
    publicPath: '/',
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
              useCache: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      fileName: resolve(process.cwd(), 'build/client/webpack-assets.json'),
      filter: (file) => file.isInitial,
    })
  ],
};

module.exports = smart(base, config)