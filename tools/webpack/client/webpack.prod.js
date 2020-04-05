const { resolve } = require('path')
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new BrotliPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new ManifestPlugin()
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
