const webpack = require('webpack');

module.exports = {
	mode: 'development',
	output: {
		filename: 'dev-server-bundle.js'
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};
