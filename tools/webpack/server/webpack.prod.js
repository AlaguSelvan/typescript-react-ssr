const webpack = require("webpack")

module.exports = {
  mode: "production",
  output: {
    filename: "prod-server-bundle.js",
    chunkFilename: "[name].js"
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
}
