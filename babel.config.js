module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
				targets: {
					browsers: [
						"last 2 versions"
					]
				},
				debug: false
			}
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    // "@loadable/babel-plugin",
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "universal-import"
  ],
  env: {
    development: {
      plugins: [
        "react-hot-loader/babel"
      ]
    }
  }
}
