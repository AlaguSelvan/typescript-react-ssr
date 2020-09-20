module.exports = {
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true
		}
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'eslint:recommended',
				'plugin:prettier/recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:react/recommended'
			],
			plugins: ['@typescript-eslint', 'react', 'react-hooks'],
			parser: '@typescript-eslint/parser',
			rules: {
				'@typescript-eslint/interface-name-prefix': 0,
				'@typescript-eslint/no-empty-function': 0,
				'@typescript-eslint/no-use-before-define': 0, // bug?
				'@typescript-eslint/explicit-function-return-type': 0,
				'@typescript-eslint/no-explicit-any': 0, // for tests
				'react/display-name': 0, // for tests
				'react/prop-types': 0
			}
		}
	]
};
