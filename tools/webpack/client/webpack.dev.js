const { resolve } = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

const config = {
  mode: 'development',
  entry: {
    // vendor: ["react", "react-dom"],
    main: [
      'webpack-hot-middleware/client?reload=true',
      './src/app/Client.tsx'
    ]
  },
  output: {
    filename: "[name].bundle.js",
    // path: resolve('build', 'public'),
    // publicPath: '/public/'
  },
  devServer: {
    contentBase: "build",
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: 'source-map',
  // module: {
    // rules: [
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
    // ]
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new LoadablePlugin({
    //   writeToDisk: true,
    //   filename: '../loadable-stats.json'
    // }),
    new ForkTsCheckerWebpackPlugin()
  ]
}

module.exports = config
