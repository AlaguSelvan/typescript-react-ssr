const webpack = require('webpack');
const { join, resolve } = require('path');
const { merge } = require('webpack-merge');
const externals = require('./node-externals');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

require('dotenv').config();

const config =
	process.env.NODE_ENV === 'production'
		? require('./webpack.prod')
		: require('./webpack.dev');
const filename =
	process.env.NODE_ENV === 'production'
		? 'prod-server-bundle.js'
		: 'dev-server-bundle.js';

const base = {
	name: 'server',
	target: 'node',
	entry: resolve('server', 'render.tsx'),
	output: {
		filename,
		path: resolve('build', 'server'),
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				loader: [
					'babel-loader',
					{
						loader: 'ts-loader'
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	],
	externals: [nodeExternals()]
};

module.exports = merge(base, config);
