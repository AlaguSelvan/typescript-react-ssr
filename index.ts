if (process.env.NODE_ENV === 'production') {
  require('./build/server/index');
} else {
  require('./server/index');
}
