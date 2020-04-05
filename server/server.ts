import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
import render from './render';

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.static(path.resolve('public')));

if (process.env.NODE_ENV === 'production') {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const compiler = webpack(webpackClientConfig);
  const devServerProps = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true,
    noInfo: true,
    writeToDisk: true,
    stats: 'minimal',
    serverSideRender: true,
  };
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    devServerProps
  );

  const webpackHotMiddlware = require('webpack-hot-middleware')(
    compiler,
    devServerProps
  );

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
} else {
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
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  console.log('done');
}
app.use('/public', express.static('build/client'));

app.get('*', (req, res) => {
  render(req, res);
});


app.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.info(`Listening at ${url}`);
});
