module.exports = {
  compact: true,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 9']
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@loadable/babel-plugin'
  ]
}
