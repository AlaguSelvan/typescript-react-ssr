if (process.env.NODE_ENV === 'production') {
  require('./build/server/prod-server-bundle.js');
} else {
  require('./server/index');
}
