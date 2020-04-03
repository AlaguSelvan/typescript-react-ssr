import path from 'path';
import express, {Request, Response} from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import compression from 'compression';
import helmet from 'helmet';
import Helmet from 'react-helmet';
import routes from '../client/Router/Routes';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import createEmotionServer from 'create-emotion-server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../client/App';
import configureStore from '../client/redux/configureStore';
import htmlTemplate from '../utils/renderHtml';

const cssCache = createCache();
const { extractCritical } = createEmotionServer(cssCache);

//@ts-ignore
export default ({ clientStats }) = async(req: any, res: any) => {
  const { url, path } = req
  const { store } = configureStore({ url })
  const branch = matchRoutes(routes, path)
  const promises = matchRoutes(routes, req.path).map(({ route }) => {
    route.loadData ? route.loadData(store) : null;
  });
  	Promise.all(promises).then(() => {
    const rootJsx = (
      <Provider store={store}>
        <StaticRouter location={url} context={staticContext}>
          <CacheProvider value={cssCache}>
            <App />
          </CacheProvider>
        </StaticRouter>
      </Provider>
    )
      const initialState = store.getState();
      const { html, css, ids } = extractCritical(ReactDOMServer.renderToString(rootJsx))
    })
  // await loadBranchData();
  const head = Helmet.renderStatic();
  return res.send(htmlTemplate(head, html, css, ids, initialState, extractor))
}