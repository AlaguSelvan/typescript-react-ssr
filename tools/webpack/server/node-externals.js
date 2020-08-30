const fs = require('fs');
const path = require('path');

// const res = (p) => path.resolve(__dirname, p);
// const nodeModules = res('../../../node_modules');
// const externals = fs
//   .readdirSync(nodeModules)
//   .filter(
//     (x) => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x),
//   )
//   .reduce((externals, mod) => {
//     externals[mod] = `commonjs ${mod}`;
//     return externals;
//   }, {});
// externals['react-dom/server'] = 'commonjs react-dom/server';

const res = (p) => path.resolve(__dirname, p);

const nodeModules = res('../../../node_modules');
// const entry = res('../../server/render.js');
// const output = res('../../buildServer');

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
	.readdirSync(nodeModules)
	.filter(
		(x) => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x)
	)
	.reduce((externals, mod) => {
		externals[mod] = `commonjs ${mod}`;
		return externals;
	}, {});
externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = externals;
