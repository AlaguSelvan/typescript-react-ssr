import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import compression from 'compression';
import helmet from 'helmet';
import Helmet from 'react-helmet';
import routes from '../app/Router/Routes'
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import webpack from 'webpack';
import createEmotionServer from 'create-emotion-server'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'
require('dotenv').config()

import App from '../app/App'
import configureStore from '../app/redux/configureStore';
import htmlTemplate from '../utils/renderHtml';

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.static(path.resolve(process.cwd(), 'public')));

const cssCache = createCache()
const { extractCritical } = createEmotionServer(cssCache)

if (process.env.NODE_ENV === 'development') {
  console.log('development')
  const webpackClientConfig = require('../../config/webpack/webpack.client.dev.js')
  const webpackServerConfig = require('../../config/webpack/webpack.server.dev.js')
  // const compiler = webpack([webpackClientConfig, webpackServerConfig]);
  const compiler = webpack(webpackClientConfig);
  compiler.apply(new webpack.ProgressPlugin())
  const devServerProps = {
    path: path.resolve('build', 'public'),
    publicPath: '/public/',
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true,
    noInfo: true,
    writeToDisk: true,
    stats: 'minimal',
    serverSideRender: true
  }
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
  console.log('Middleware enabled');
  console.log('Done');
} else {
  console.log('development')
  const webpackClientConfig = require('../../config/webpack/webpack.client.dev.js')
  // const webpackServerConfig = require('../../config/webpack/webpack.server.dev.js')
  // const compiler = webpack([webpackClientConfig, webpackServerConfig]);
  const compiler = webpack(webpackClientConfig);
  compiler.apply(new webpack.ProgressPlugin())
  const devServerProps = {
    path: path.resolve('build', 'public'),
    publicPath: '/public/',
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true,
    noInfo: true,
    writeToDisk: true,
    stats: 'minimal',
    serverSideRender: true
  }
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
  console.log('Middleware enabled');
  console.log('Done');
}

app.get('*', async (req, res) => {
  let { url } = req
  const { store } = configureStore({ url })
  const branch = matchRoutes(routes, req.path)
  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.path);
    const promises = branch.map(({ route, match }) => {
      if (route.loadData)
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map((item : any) => store.dispatch(item))
        );
      return Promise.resolve(null);
    });
    return Promise.all(promises);
  };
  await loadBranchData();
  const statsFile = path.resolve(
    process.cwd(),
    'build/public/loadable-stats.json'
  );
  const extractor = new ChunkExtractor({ statsFile });
  const staticContext = {};
  const rootJsx = (
    <ChunkExtractorManager extractor={extractor}>
      <Provider store={store}>
        <StaticRouter location={url} context={staticContext}>
          <CacheProvider value={cssCache}>
            <App />
          </CacheProvider>
        </StaticRouter>
      </Provider>
    </ChunkExtractorManager>
  )
  const initialState = store.getState();
  console.log(initialState)
  const { html, css, ids } = extractCritical(ReactDOMServer.renderToString(rootJsx))
  const head = Helmet.renderStatic();
  return res.send(htmlTemplate(head, html, css, ids, initialState, extractor))
});

app.listen(3000, () => {
  const url = `http://localhost:3000`;

  console.info(console.log(`==> 🌎  Listening at ${url}`));
});
