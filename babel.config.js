module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions']
        },
        debug: false
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    'react-hot-loader/babel',
    '@loadable/babel-plugin',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
};
