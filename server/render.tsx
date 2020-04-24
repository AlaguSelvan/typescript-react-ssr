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
import nanoid from 'nanoid';
// import serialize from "serialize-javascript";

import App from '../app/App';
import configureStore from '../app/redux/configureStore';
import HtmlTemplate from './utils/HtmlTemplate';
import routes from '../app/Router';
import { Stats } from 'webpack';

const cssCache = createCache();

const preloadData = (routes: any, path: any, store: any) => {
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

export const render = async (req: any, res: any, clientStats: Stats) => {
  const { url } = req;
  const { store } = configureStore({ url });
  await preloadData(routes, req.path, store);
  const statsFile = resolve('build/client/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  console.log('server hit here');
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
  );
  const initialState = store.getState();
  const app = renderToString(Jsx);
  const { html, css, ids } = extractCritical(app);
  const head = Helmet.renderStatic();
  const meta = `
    ${head.title.toString()}
    ${head.base.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
  `.trim();
  const nonce = '1234';
  cssCache.nonce = nonce;
  const linkTags = `
    ${extractor.getLinkTags({ nonce })}
    ${extractor.getStyleTags({ nonce })}
  `;
  const emotionId = `<script nonce=${nonce}>window.__emotion=${JSON.stringify(
    ids
  )}</script>`;
  const scripts = `${extractor.getScriptTags({ nonce })}`;
  const criticalCssIds = `${emotionId}`;
  const style = `<style data-emotion-css="${ids.join(
    ' '
  )}" nonce=${nonce}>${css}</style>`;
  const document = HtmlTemplate(
    html,
    meta,
    style,
    criticalCssIds,
    linkTags,
    initialState,
    scripts
  );
  return res.send(document);
};

export default function middlewareRenderer({
  clientStats,
  serverStats
}: any): any {
  return (req: any, res: any) => render(req, res, clientStats);
}

if ((module as any).hot) {
  (module as any).hot.accept('../app', () => {
    console.log('server side HMR 🔥');
  });
}
