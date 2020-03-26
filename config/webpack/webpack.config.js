const webpack = require('webpack');
const { resolve } = require('path');
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin

const config =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.client.prod')
    : require('./webpack.client.dev')

const base = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: resolve('build', 'public'),
    publicPath: '/public/'
  },
  plugins: [
    new ReactLoadablePlugin({
      filename: './build/public/react-loadable.json'
    }),
    // new webpack.DefinePlugin({
    //   'process.env.IS_BROWSER': JSON.stringify(true)
    // }),
    // new CleanWebpackPlugin({
    //   dry: true
    // }),
  ]
}

module.exports = smart(base, config)