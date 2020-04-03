const {resolve} = require('path')
const webpack = require("webpack")

module.exports = {
  output: {
    filename: "prod-server-bundle.js"
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
