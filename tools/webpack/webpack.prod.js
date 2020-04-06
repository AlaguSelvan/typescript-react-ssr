const { resolve } = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const BrotliPlugin = require("brotli-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

const options = {
  filePath: "../../build/robots.txt",
  policy: [
    {
      userAgent: "Googlebot",
      allow: "/",
      disallow: ["/admin", "/login"],
      crawlDelay: 2,
    },
    {
      userAgent: "OtherBot",
      allow: ["/allow-for-all-bots", "/allow-only-for-other-bot"],
      disallow: ["/admin", "/login"],
      crawlDelay: 2,
    },
    {
      userAgent: "*",
      allow: "/",
      // disallow: ["/admin", "/login"],
      crawlDelay: 10,
      cleanParam: "ref /articles/",
    },
  ],
  sitemap: `http://${process.env.HOST}/sitemap.xml`,
  // host: "http://example.com",
};

const config = {
  mode: "production",
  entry: {
    main: [resolve("app", "index.tsx")],
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].[id].bundle.js",
  },
  plugins: [
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: "brotliCompress",
    }),
    new BrotliPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new ManifestPlugin(),
    new RobotstxtPlugin(options),
  ],
};

module.exports = config;
