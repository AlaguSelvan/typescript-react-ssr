import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import Helmet from 'react-helmet';
require('dotenv').config()

// import Loadable from 'react-loadable'
// import { getBundles } from 'react-loadable/webpack'
import routes from '../app/Router/Routes'
// import hpp from 'hpp';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
// import matchPath from 'react-router-dom/matchPath'
import createEmotionServer from 'create-emotion-server'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'

import App from '../app/App'
// import configClient from '../../config/webpack/server/webpack.config';
// import configServer from '../../config/webpack/server/webpack.config';

import configureStore from '../app/redux/configureStore';
import htmlTemplate from '../utils/renderHtml';

const app = express();

app.use(helmet());
// app.use(hpp());
app.use(compression());
app.use(express.static(path.resolve(process.cwd(), 'public')));

const cssCache = createCache()
const { extractCritical } = createEmotionServer(cssCache)


const statsFile = 
  process.env.NODE_ENV !== 'production'
    ? '../../build/client/loadable-stats.json'
    : '../../build/client/loadable-stats.json'

if (process.env.NODE_ENV !== 'production') {
  console.log('development')
  const webpackConfig = require('../../config/webpack/webpack.config.dev.js')
  const compiler = webpack(webpackConfig);
  // const serverCompiler = compiler.compilers[1];
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
  // app.use(webpackHotServerMiddleware(compiler));
  console.log('Middleware enabled');
  console.log('Done');
}

const renderHtml = (store: any, url: any, res: any) => {
  const statsFile = path.resolve(
    process.cwd(),
    'build/public/loadable-stats.json'
  );
  const extractor = new ChunkExtractor({ statsFile });
  const staticContext = {};
  const Jsx = (
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
  const { html, css, ids } = extractCritical(ReactDOMServer.renderToString(Jsx))
  const head = Helmet.renderStatic();
  res.send(htmlTemplate(head, html, css, ids, initialState, extractor))
}

// Register server-side rendering middleware
app.get('*', async(req, res) => {
  let { url } = req
  const {store} = configureStore({url})
  const branch = matchRoutes(routes, req.path)
  const loadBranchData = () => {
    const branch = matchRoutes(routes, req.path);
    const promises = branch.map(({ route, match }) => {
      if (route.loadData)
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map((item: any) => store.dispatch(item))
        );

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  };
    await loadBranchData();
    return renderHtml(store, url, res)
    // return res.send(renderHtml(head, htmlContent, extractor, initialState, bundleScripts))
});

// @ts-ignore
app.listen(3000, () => {
  const url = `http://localhost:3000`;

  // if (err) console.error(chalk.red(`==> 😭  OMG!!! ${err}`));

  console.info(console.log(`==> 🌎  Listening at ${url}`));
});
