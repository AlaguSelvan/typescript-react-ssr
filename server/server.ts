import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
import render from './render';
import expressStaticGzip from 'express-static-gzip';

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const compiler = webpack(webpackClientConfig);
  const clientCompiler = compiler;
  const devServerProps = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true,
    noInfo: true,
    writeToDisk: true,
    stats: 'minimal',
    serverSideRender: true,
    index: false
  };
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    clientCompiler,
    devServerProps
  );

  const webpackHotMiddlware = require('webpack-hot-middleware')(
    clientCompiler,
    devServerProps
  );
  app.use('/public', express.static(path.resolve('build/client')));
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
}

  app.use(
    '/public',
    expressStaticGzip(path.resolve('build/client'), {
      enableBrotli: true,
    })
  );

app.get('*', (req, res) => {
  render(req, res);
});

app.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.info(`Listening at ${url}`);
});

