/* eslint @typescript-eslint/no-var-requires: 0 */
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import Loadable from 'react-loadable';
import helmet from 'helmet';
import webpack from 'webpack';
import render from './render';
import expressStaticGzip from 'express-static-gzip';
import { nanoid } from 'nanoid';
import openBrowser from 'react-dev-utils/openBrowser';

dotenv.config();

const app = express();

app.use(helmet());
app.use(compression());
app.use('/public', express.static(path.resolve('build/client')));
app.use(
  '/public/react-loadable.json',
  express.static(path.resolve('build/react-loadable.json'))
);
if (process.env.NODE_ENV === 'development') {
  const webpackClientConfig = require('../tools/webpack/webpack.config');
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
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  // app.use(webpackHotServerMiddleware(compiler));
}

app.get('*', (req, res) => {
  res.locals.nonce = Buffer.from(nanoid(32)).toString('base64');
  render(req, res);
});

Loadable.preloadAll().then(() => {
  app.listen(process.env.PORT, () => {
    const url = `http://localhost:${process.env.PORT}`;
    console.info(`Listening at ${url}`);
    if (process.env.NODE_ENV === 'development') {
      // if (openBrowser(url)) {
      //   console.info("==> 🖥️  Opened on your browser's tab!");
      // }
    }
  });
});
