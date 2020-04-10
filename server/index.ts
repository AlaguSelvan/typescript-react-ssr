/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
import expressStaticGzip from 'express-static-gzip';

require('dotenv').config();

const app = express();
let isBuilt = false;

const { PORT } = process.env;
const done = () => {
  !isBuilt &&
    app.listen(PORT, () => {
      isBuilt = true;
      console.log(
        `Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}🌎...`
      );
    });
};
app.use(helmet());
app.use(compression());
app.use('/public', express.static(path.resolve('build', 'client')));

if (process.env.NODE_ENV === 'production') {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
    if (err) console.log(err.message);
    const server = require('../build/server/index.js').default;
    app.use(server());
    done();
  });
} else {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  const compiler = webpack([webpackClientConfig, webpackServerConfig]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];
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
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    clientCompiler,
    devServerProps
  );
  const devMiddleware = webpackDevMiddleware;

  const webpackHotMiddlware = require('webpack-hot-middleware')(
    clientCompiler,
    devServerProps
  );
  const webpackServerMiddlware = require('webpack-hot-server-middleware')(
    compiler
  );
  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  app.use(webpackServerMiddlware);
  devMiddleware.waitUntilValid(done);
}

app.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.info(`Listening at ${url}`);
});
