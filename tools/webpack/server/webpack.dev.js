const {resolve} = require("path")
const webpack = require("webpack")
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  output: {
    filename: 'dev-server-bundle.js',
    chunkFilename: '[name].js',
  //   chunkFilename: '[name].js',
    // path: resolve('dist', 'server'),
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    // new WriteFilePlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'public'
    //   }
    // ])
  ]
};
