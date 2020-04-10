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
import { nanoid } from 'nanoid';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import App from '../app/App';
import configureStore from '../app/redux/configureStore';
import HtmlTemplate from './utils/HtmlTemplate';
import routes from '../app/Router';

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

console.log('file hit');

export default ({ clientStats }: any) => async (req: any, res: any) => {
  console.log(clientStats, 'clientStats');
  res.locals.nonce = Buffer.from(nanoid(32)).toString('base64');
  const { url } = req;
  const { store } = configureStore({ url });
  await preloadData(routes, req.path, store);
  const statsFile = resolve('build/client/loadable-stats.json');
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
  const { nonce } = res.locals;
  cssCache.nonce = nonce;
  // const linkTags = `
  //   ${extractor.getLinkTags({ nonce })}
  // `;
  const emotionId = `<script nonce=${nonce}>window.__emotion=${JSON.stringify(
    ids
  )}</script>`;
  // const scripts = `${extractor.getScriptTags({ nonce })}`;
  const criticalCssIds = `${emotionId}`;
  const chunkNames = flushChunkNames();
  const { js, styles, scripts, ...others } = flushChunks(clientStats, {
    chunkNames
  });
  // const style = `<style data-emotion-css="${ids.join(
  //   ' '
  // )}" nonce=${nonce}>${css}</style>`;
  const document = HtmlTemplate(
    html,
    meta,
    styles,
    criticalCssIds,
    scripts,
    initialState,
    js
  );
  return res.send(document);
};
