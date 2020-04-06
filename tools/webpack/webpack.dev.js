const webpack = require("webpack");
const { resolve } = require("path");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const config = {
  mode: "development",
  entry: {
    main: [
      // Migrate to react-refresh on its release https://github.com/facebook/react/issues/16604#issuecomment-528663101
      "@hot-loader/react-dom",
      `webpack-hot-middleware/client`,
      resolve("app", "index.tsx")
    ]
  },
  output: {
    filename: "[name]-bundle.[hash].js",
    chunkFilename: "[name].[hash].js"
  },
  resolve: {
    modules: ["app", "node_modules"],
    descriptionFiles: ["package.json"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: { "react-dom": "@hot-loader/react-dom" }
  },
  devtool: "inline-cheap-module-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin()
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   inject: true,
    //   filename: resolve("build", "index.html"),
    //   template: resolve("app", "index.html")
    // }),
  ]
};

module.exports = config;
