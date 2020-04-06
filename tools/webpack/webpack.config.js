const webpack = require("webpack");
const { resolve } = require("path");
const { smart } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const config =
  process.env.NODE_ENV === "production"
    ? require("./webpack.prod")
    : require("./webpack.dev");

const base = {
  name: "client",
  entry: {
    vendor: ["react", "react-dom"]
  },
  output: {
    path: resolve("build", "client"),
    publicPath: "/public/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"]
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new LoadablePlugin({
      writeToDisk: true,
      fileName: resolve(process.cwd(), "build/client/loadable-stats.json")
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: ".",
      name: true,
      cacheGroups: {
        vendors: {
          chunks: "all",
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
  },
  node: {
    fs: "empty",
    vm: "empty",
    net: "empty",
    tls: "empty"
  }
};

module.exports = smart(base, config);
