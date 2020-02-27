module.exports = {
  compact: true,
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
    '@babel/preset-react'
  ],
  plugins: [
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-syntax-dynamic-import",
    "universal-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
        displayName: true,
        preprocess: false
      }
    ]
  ],
  env: {
    development: {
      plugins: [
        "react-hot-loader/babel"
      ]
    }
  }
}
