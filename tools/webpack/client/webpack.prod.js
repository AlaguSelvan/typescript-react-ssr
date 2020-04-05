const { resolve } = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BrotliPlugin = require("brotli-webpack-plugin")

const config = {
  mode: 'production',
  entry: {
    main: [resolve('app', 'index.tsx')],
  },
  output: {
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].bundle.js',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new BrotliPlugin(),
  ],
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
};

module.exports = config
