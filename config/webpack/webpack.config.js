const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
	CheckerPlugin
} = require('awesome-typescript-loader')

module.exports = {
	module: {
		loaders: [
			{ 
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.tsx?$/,
				loader: [
					'babel-loader',
					{
						loader: 'awesome-typescript-loader',
						options: {
							useCache: true,
							getCustomTransformers: () => ({
								before: [styledComponentsTransformer],
							}),
						},
					},
				],
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				WEBPACK: true,
			},
		}),
		new webpack.HotModuleReplacementPlugin(),
	],}
