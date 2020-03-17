import webpack from 'webpack'
const { resolve } = require('path');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  name: 'client',
  entry: {
    main: [
      'react-hot-loader/patch',
      '@babel/runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './app/Client.tsx',
    ],
  },
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: '[name]-bundle.[hash].js',
    chunkFilename: '[name].[hash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: [
          'babel-loader',
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true,
              modules: {
                mode: 'local',
                localIdentName:
                  '[name]__[local]--[hash:base64:5]',
              },
            },
          }
        ],
      }
    ],
  },
  // resolve: {
  //   alias: {
  //     'react-dom': '@hot-loader/react-dom',
  //   },
  //   extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.scss'],
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
