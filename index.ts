require('@babel/register')({
  plugins: ['@babel/plugin-syntax-dynamic-import']
})
require('./src/server/server')
