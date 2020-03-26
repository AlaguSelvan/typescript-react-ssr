const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const config = {
  mode: 'production',
  entry: ['./src/app/index.tsx'],
  output: {
    path: resolve('build', 'public'),
    publicPath: '/public/',
    filename: '[name].[chunkhash:8].bundle.js',
    // chunkFilename: '[name].[chunkhash:8].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         publicPath: '/public/',
      //         hmr: process.env.NODE_ENV === 'development'
      //       }
      //     },
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    //   chunkFilename: '[name].css'
    // }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 20 },
      threshold: 10240,
      minRatio: 1.6,
      deleteOriginalAssets: false
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 1.6
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ManifestPlugin()
    // new webpack.optimize.AggressiveMergingPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js$/,
        cache: true,
        parallel: 4,
        exclude: /node_modules/
      }),
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: false,
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

module.exports = config