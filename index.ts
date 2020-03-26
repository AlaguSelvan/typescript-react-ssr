require('@babel/register')({
  plugins: ['@babel/plugin-syntax-dynamic-import', 'dynamic-import-node']
})
require('./src/server/server')
