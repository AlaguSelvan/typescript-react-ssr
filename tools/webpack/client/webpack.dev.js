import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
const webpack = require('webpack')

const config = {
  mode: 'development',
  entry: {
    main: [
      'react-hot-loader/patch',
      '@babel/runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/app/Client.tsx'
    ]
  },
  output: {
    filename: "[name].bundle.js",
  },
  devtool: 'source-map',
  devServer: {
    contentBase: "src/app",
    overlay: true,
    stats: {
      colors: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
}

module.exports = config
