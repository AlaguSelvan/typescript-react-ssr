/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint @typescript-eslint/no-var-requires: 0 */
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
// import expressStaticGzip from 'express-static-gzip';
// import { nanoid } from 'nanoid';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackHotServerMiddleware from 'webpack-hot-server-middleware';
import openBrowser from 'react-dev-utils/openBrowser';

dotenv.config();

const app = express();

app.use(helmet());
app.use(compression());
app.use('/public', express.static(path.resolve('build/client')));
let isBuilt = false;
const done = () => {
  !isBuilt &&
    app.listen(process.env.PORT, () => {
      isBuilt = true;
      const url = `http://localhost:${process.env.PORT}`;
      if (process.env.NODE_ENV === 'development') {
        if (openBrowser(url)) {
          console.info("==> 🖥️  Opened on your browser's tab!");
        }
      }
    });
};

if (process.env.NODE_ENV === 'production') {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
    if (err) throw new Error('build Error');
    //@ts-ignore
    const clientStats = stats.toJson().children[0];
    const render = path.resolve('build', 'server', 'prod-server-bundle.js');
    //@ts-ignore
    app.use(render({ clientStats }));
    console.log('here');
    done();
  });
} else {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  const compiler = webpack([webpackServerConfig, webpackServerConfig]);
  const clientCompiler = compiler.compilers[0];
  // const clientCompiler = compiler.compilers.find(
  //   (compiler) => compiler.name === 'client'
  // );
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
  const webpackDevMiddleware = WebpackDevMiddleware(
    //@ts-ignore
    clientCompiler,
    devServerProps
  );
  app.use(webpackDevMiddleware);
  //@ts-ignore
  app.use(WebpackHotMiddleware(clientCompiler, devServerProps));
  app.use(WebpackHotServerMiddleware(compiler));
  webpackDevMiddleware.waitUntilValid(done);
}
