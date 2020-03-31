const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack')

const config = {
  mode: 'development',
  entry: {
    main: [
      // Migrate to react-refresh on its release https://github.com/facebook/react/issues/16604#issuecomment-528663101
      'react-hot-loader/patch',
      '@babel/runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/client/Client.tsx'
    ]
  },
  output: {
    filename: "[name].bundle.js",
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
}

module.exports = config
