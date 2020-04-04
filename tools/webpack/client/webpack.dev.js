const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const webpack = require('webpack')

const config = {
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      './app/index.tsx',
    ],
  },
  output: {
		filename: '[name]-bundle.[hash].js',
		chunkFilename: '[name].[hash].js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new WriteFilePlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
};

module.exports = config
