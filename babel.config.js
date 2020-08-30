module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['last 2 versions'],
					node: 'current'
				},
				debug: false
			}
		],
		'@babel/preset-typescript',
		'@babel/preset-react'
	],
	plugins: [
		'@babel/plugin-transform-async-to-generator',
		['@babel/plugin-proposal-class-properties', { loose: true }],
		'@babel/plugin-syntax-dynamic-import',
		'@loadable/babel-plugin',
		'@babel/plugin-transform-runtime',
		[
			'babel-plugin-styled-components',
			{
				ssr: true,
				displayName: true,
				preprocess: false
			}
		]
	],
	env: {
		development: {
			plugins: ['react-hot-loader/babel']
		}
	}
};
