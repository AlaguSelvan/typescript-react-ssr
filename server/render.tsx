import fs from 'fs';
import { resolve } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import { extractCritical } from 'emotion-server';
// import serialize from "serialize-javascript";
import { getBundles } from 'react-loadable/webpack';
import Loadable from 'react-loadable';

import App from '../app/App';
import configureStore from '../app/redux/configureStore';
import HtmlTemplate from './utils/HtmlTemplate';
import routes from '../app/Router';

const cssCache = createCache();

const preloadData = (routes, path, store) => {
  const branch = matchRoutes(routes, path);
  const promises = branch.map(({ route, match }) => {
    if (route.loadData) {
      return Promise.all(
        route
          .loadData({
            params: match.params,
            getState: store.getState
          })
          .map((item: any) => store.dispatch(item))
      );
    }
    return Promise.resolve(null);
  });
  return Promise.all(promises);
};

const render = async (req: any, res: any) => {
  const { url } = req;
  const { store } = configureStore({ url });
  await preloadData(routes, req.path, store);
  // const statsFile = resolve('build/client/loadable-stats.json');
  const staticContext = {};
  const modules = [];
  const Jsx = (
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
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
  const app = renderToString(Jsx);
  const loadableStats = fs.readFileSync('build/react-loadable.json');
  // let stats = JSON.parse(loadableStats);
  // const loadableStats = resolve('build/react-loadable.json');
  const statsToJson = JSON.stringify(loadableStats);
  const stats = JSON.parse(loadableStats);
  const bundles = getBundles(stats, modules);
  const bundleScripts = bundles
    .map((bundle) => `<script src="${bundle.publicPath}"></script>`)
    .join('');
  // const extractor = new ChunkExtractor({ statsFile });
  const { html, css, ids } = extractCritical(app);
  const head = Helmet.renderStatic();
  const meta = `
    ${head.title.toString()}
    ${head.base.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
  `.trim();
  const { nonce } = res.locals;
  cssCache.nonce = nonce;
  const emotionId = `<script nonce=${nonce}>window.__emotion=${JSON.stringify(
    ids
  )}</script>`;
  const criticalCssIds = `${emotionId}`;
  const style = `<style data-emotion-css="${ids.join(
    ' '
  )}" nonce=${nonce}>${css}</style>`;
  const document = HtmlTemplate(
    html,
    meta,
    style,
    criticalCssIds,
    '',
    initialState,
    bundleScripts
  );
  return res.send(document);
};

export default render;
