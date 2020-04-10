/* eslint @typescript-eslint/no-var-requires: 0 */
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
import expressStaticGzip from 'express-static-gzip';
import openBrowser from 'react-dev-utils/openBrowser';

dotenv.config();

const app = express();
let isBuilt = false;

app.use(helmet());
app.use(compression());

const done = () => {
  !isBuilt &&
    app.listen(process.env.PORT, () => {
      isBuilt = true;
      console.log(`Server listening on http://localhost:${process.env.PORT}.`);
    });
};

app.use('/public', express.static(path.resolve('build/client')));

if (process.env.NODE_ENV === 'production') {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
    console.log(webpackServerConfig, 'webpackServerConfig');
    const clientStats = stats.toJson().children[0];
    //../../build/prod-server-bundle.js
    const render = require('../build/server/prod-server-bundle').default;
    console.log(
      stats.toString({
        colors: true
      })
    );
    app.use(
      expressStaticGzip('build', {
        enableBrotli: true
      })
    );
    app.use(render({ clientStats }));
    done();
  });
} else {
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
  const webpackHotServerMiddlware = require('webpack-hot-server-middleware')(
    compiler
  );
  app.use(webpackHotServerMiddlware);
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  webpackDevMiddleware.waitUntilValid(done);
}
app.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.info(`Listening at ${url}`);
  if (process.env.NODE_ENV === 'development') {
    if (openBrowser(url)) {
      console.info("==> 🖥️  Opened on your browser's tab!");
    }
  }
});
