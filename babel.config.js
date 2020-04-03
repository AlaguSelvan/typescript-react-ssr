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
    "@babel/plugin-syntax-dynamic-import",
    "universal-import",
    "@babel/plugin-proposal-class-properties",
  ],
  env: {
    development: {
      plugins: [
        "react-hot-loader/babel"
      ]
    }
  }
}
