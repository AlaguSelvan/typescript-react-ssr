const { resolve } = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")

const config = {
  mode: 'production',
  entry: {
    main: [
      './src/client/index.tsx'
    ]
  },
  output: {
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].bundle.js',
    // path: resolve('build', 'public'),
    // publicPath: '/public/',
  },
  // module: {
  //   rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader'
      // },
      // {
      //   test: /\.ts(x?)$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader', 'ts-loader'], // The orders are important
      // },
  //   ]
  // },
  plugins: [
    // new LoadablePlugin({
    //   writeToDisk: true,
    //   filename: '../loadable-stats.json'
    // }),
    new ForkTsCheckerWebpackPlugin(),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin()
  ]
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 1,
  //     maxInitialRequests: 1,
  //     automaticNameDelimiter: '.',
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         chunks: 'all',
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // }
}

module.exports = config
