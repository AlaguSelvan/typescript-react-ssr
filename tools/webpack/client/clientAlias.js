const fs = require('fs');
const { resolve } = require('path');

const isProd = process.env.NODE_ENV === 'production';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => resolve(appDirectory, relativePath);

const clientAlias = {
	'@Components': resolve(__dirname, '../../app/components'),
	'@Container': resolve(__dirname, '../../app/container')
};

// const clientAlias = isProd ? prodClientAlias : devClientAlias;

module.exports = clientAlias;
