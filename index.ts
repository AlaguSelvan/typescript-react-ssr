require('@babel/register')({
  plugins: ['dynamic-import-node']
})

require('./src/server')