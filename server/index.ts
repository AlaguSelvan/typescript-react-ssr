/* eslint-disable @typescript-eslint/ban-ts-ignore */
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
      console.log(`Server listening on http://localhost:${process.env.PORT}`);
    });
};
app.use(helmet());
app.use(compression());
app.use('/public', express.static(path.resolve('build', 'client')));

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackServerConfig = require('../tools/webpack/server/webpack.config');
  webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
    //@ts-ignore
    const clientStats = stats.toJson().children[0];
    //../../build/prod-server-bundle.js
    const render = path.resolve('build', 'server', 'prod-server-bundle.js');
    app.use(
      expressStaticGzip('build', {
        enableBrotli: true
      })
    );
    //@ts-ignore
    app.use(render({ clientStats }));
    done();
  });
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackClientConfig = require('../tools/webpack/client/webpack.config');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    clientCompiler,
    devServerProps
  );
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackServerDevMiddleware = require('webpack-dev-middleware')(
    serverCompiler,
    devServerProps
  );
  const devMiddleware = webpackDevMiddleware;

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
  // app.use(webpackServerDevMiddleware);
  devMiddleware.waitUntilValid(done);
}

app.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.info(`Listening at ${url}`);
});
