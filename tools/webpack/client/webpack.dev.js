const webpack = require('webpack')
const { resolve } = require('path');

const config = {
  mode: 'development',
  entry: {
    main: [
      // Migrate to react-refresh on its release https://github.com/facebook/react/issues/16604#issuecomment-528663101
      'react-hot-loader/patch',
      '@babel/runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      resolve('src', 'client', 'Client.tsx')
    ]
  },
  output: {
    filename: '[name].bundle.js'
  },
  resolve: {
    // alias: {
    //   'react-dom': '@hot-loader/react-dom',
    // },
  },
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config
