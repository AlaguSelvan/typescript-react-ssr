import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import webpack from 'webpack';
const expressStaticGzip = require('express-static-gzip');

require('dotenv').config()

const app = express();
let isBuilt = false;

const {PORT} = process.env
const done = () => {
  !isBuilt &&
    app.listen(PORT, () => {
      isBuilt = true;
      console.log(
        `Server listening on \x1b[42m\x1b[1mhttp://localhost:${PORT}\x1b[0m in \x1b[41m${process.env.NODE_ENV}\x1b[0m 🌎...`
      );
    });
};
app.use(helmet());
app.use(compression());
app.use(express.static(path.resolve('build', 'client')));

if (process.env.NODE_ENV === 'production') {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    //../../build/prod-server-bundle.js
    const render = require('../build/server/prod-server-bundle').default;
    app.use(
      expressStaticGzip('build', {
        enableBrotli: true
      })
    );
    app.use(render({ clientStats }));
    done();
  });
} else {
  const webpackClientConfig = require('../tools/webpack/client/webpack.config')
  const webpackServerConfig = require('../tools/webpack/server/webpack.config')
  const compiler = webpack([webpackClientConfig, webpackServerConfig])
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
  }
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    clientCompiler,
    devServerProps
  );
  const webpackServerDevMiddleware = require('webpack-dev-middleware')(
    serverCompiler,
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
  // app.use(webpackServerDevMiddleware);
  devMiddleware.waitUntilValid(done);
}

app.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.info(`Listening at ${url}`);
});
