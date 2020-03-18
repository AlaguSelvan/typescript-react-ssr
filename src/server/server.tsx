import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import routes from '../app/Router/Routes'
import hpp from 'hpp';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import matchPath from 'react-router-dom/matchPath'
import createEmotionServer from 'create-emotion-server'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'

import App from '../app/App'
import configClient from '../../config/webpack/client/webpack.config';
import configServer from '../../config/webpack/server/webpack.config';

import configureStore from '../app/redux/configureStore';
import htmlTemplate from '../utils/renderHtml';
import config from './config';
import { MyAction } from './types';

const app = express();

app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));
app.use(express.static(path.resolve(process.cwd(), 'public')));

const cssCache = createCache()
const { extractCritical } = createEmotionServer(cssCache)


if (process.env.NODE_ENV === 'development') {
  const compiler = webpack([configClient, configServer]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];
  compiler.apply(new webpack.ProgressPlugin())
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    configClient.devServer,
  );

  const webpackHotMiddlware = require('webpack-hot-middleware')(
    clientCompiler,
    configClient.devServer,
  );

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  app.use(webpackHotServerMiddleware(compiler));
  console.log('Middleware enabled');
  console.log('Done');
}

const renderHtml = (req, store, branch) => {
  const { url } = req
  const staticContext: any = {};
  let modules: Array<any> = []
  const jsx = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={url} context={staticContext}>
          <CacheProvider value={cssCache}>
          <App />
          </CacheProvider>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );

  const initialState = store.getState();
  let { html, css, ids } = extractCritical(renderToString(jsx))
  const loadableStats = fs.readFileSync('build/react-loadable.json')
  const stats = JSON.parse(loadableStats)
  const bundles = getBundles(stats, modules)
  const bundleScripts = bundles.map(bundle => `<script src="${bundle.publicPath}"></script>`).join('')
  return htmlTemplate(helmet, html, css, ids, initialState, bundleScripts)
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  const store = configureStore(req.url)
  let { url } = req
  const branch = matchRoutes(routes, req.path)

  const serverData = routes
    .filter(route => matchPath(url, route))
    .map(route => route.serverFetch ? route.serverFetch(store) : store)
  Promise.all([serverData]).then(_ => {
    return res.send(renderHtml(url, store, branch))
  })
});

// @ts-ignore
app.listen(3000, config.host, err => {
  const url = `http://localhost:3000`;

  // if (err) console.error(chalk.red(`==> 😭  OMG!!! ${err}`));

  console.info(console.log(`==> 🌎  Listening at ${url}`));
});
