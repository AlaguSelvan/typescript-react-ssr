/* eslint-disable @typescript-eslint/ban-ts-ignore */
import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
import expressStaticGzip from 'express-static-gzip';
import openBrowser from 'react-dev-utils/openBrowser';
import { render } from './render';

require('dotenv').config();

const app = express();
let isBuilt = false;

const { PORT } = process.env;
const done = () => {
  !isBuilt &&
    app.listen(PORT, () => {
      isBuilt = true;
      const url = `http://localhost:${process.env.PORT}`;
      openBrowser(url);
      console.info(`Client Running on ${url}`);
    });
};
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(
    '/public',
    expressStaticGzip('build/client', {
      enableBrotli: true,
      orderPreference: ['br', 'gz']
    })
  );
  app.get('*', (req, res) => {
    render(req, res);
  });
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  const compiler = webpack([webpackClientConfig, webpackServerConfig]);
  const clientCompiler = compiler.compilers[0];
  compiler.apply(new webpack.ProgressPlugin());
  const devServerProps = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true,
    noInfo: true,
    writeToDisk: true,
    stats: 'minimal',
    serverSideRender: true
  };
  app.use('/public', express.static(path.resolve('build', 'client')));
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    devServerProps
  );
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackHotMiddlware = require('webpack-hot-middleware')(
    clientCompiler,
    devServerProps
  );
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackServerMiddlware = require('webpack-hot-server-middleware')(
    compiler
  );
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  app.use(webpackServerMiddlware);
  webpackDevMiddleware.waitUntilValid(done);
}
