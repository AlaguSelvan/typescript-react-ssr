/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint @typescript-eslint/no-var-requires: 0 */
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
// import render from './render';
import expressStaticGzip from 'express-static-gzip';
// import { nanoid } from 'nanoid';
import openBrowser from 'react-dev-utils/openBrowser';

dotenv.config();

const app = express();

app.use(helmet());
app.use(compression());
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

if (process.env.NODE_ENV === 'development') {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  const compiler = webpack([webpackClientConfig, webpackServerConfig]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];
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
  const webpackServerMiddlware = require('webpack-hot-server-middleware')(
    compiler
  );
  app.use('/public', express.static(path.resolve('build/client')));
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  app.use(webpackServerMiddlware);
  // webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
  //   console.log({ stats });
  // });
  webpackDevMiddleware.waitUntilValid(done);
} else {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    //../../build/prod-server-bundle.js
    const render = path.resolve('build', 'server', 'prod-server-bundle.js');
    // app.use(
    //   expressStaticGzip('build', {
    //     enableBrotli: true
    //   })
    // );
    //@ts-ignore
    app.use(render({ clientStats }));
    done();
  });
}
app.use(
  '/public',
  expressStaticGzip(path.resolve('build/client'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  })
);

// app.get('*', (req, res) => {
//   res.locals.nonce = Buffer.from(nanoid(32)).toString('base64');
//   render(req, res);
// });

// app.listen(process.env.PORT, () => {
//   const url = `http://localhost:${process.env.PORT}`;
//   if (process.env.NODE_ENV === 'development') {
//     if (openBrowser(url)) {
//       console.info("==> 🖥️  Opened on your browser's tab!");
//     }
//   }
// });
