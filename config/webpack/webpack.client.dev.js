const webpack = require('webpack')
const { resolve } = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

const config = {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?reload=true', './src/app/index.tsx'],
  output: {
    path: resolve('build', 'public'),
    publicPath: '/public/'
  },
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'], // The orders are important
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin({
      writeToDisk: true,
      filename: '../loadable-stats.json'
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

module.exports = config
