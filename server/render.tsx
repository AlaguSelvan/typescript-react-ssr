import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { HelmetProvider } from "react-helmet-async";
import serialize from 'serialize-javascript';

import routes from '../app/Router/Routes';
import App from '../app/App';
import configureStore from '../app/redux/configureStore';
// import htmlTemplate from '../utils/renderHtml';

const cssCache = createCache();
const { extractCritical } = createEmotionServer(cssCache);

export default ({ clientStats }: any) => (req: any, res: any) => {
  const { url, path } = req;
  const { store } = configureStore({ url });
  const promises = matchRoutes(routes, path).map(({ route }) => {
    route.loadData ? route.loadData(store) : null;
  });
  Promise.all(promises).then(() => {
    const staticContext = {};
    const helmetContext = {};
    const rootJsx = (
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <StaticRouter location={url} context={staticContext}>
            <CacheProvider value={cssCache}>
              <App />
            </CacheProvider>
          </StaticRouter>
        </Provider>
      </HelmetProvider>
    );
    const html = renderToString(rootJsx)
    const app = extractCritical(html);
    //@ts-ignore
    const { helmet } = helmetContext;
    const chunkNames = flushChunkNames()
    const { js, styles, cssHash, scripts } = flushChunks(clientStats, {
      chunkNames
    });
    console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
    console.log('SCRIPTS SERVED', scripts);
    const initialState = store.getState();
    const template = `<!DOCTYPE html><html lang="en"><head><meta name="theme-color" content="#000000"/>${styles}${helmet.title}${helmet.meta.toString()}
    ${helmet.link.toString()}</head>
    <body><div id="react-root">${html}</div>${js}${cssHash}
    <script>window.__INITIAL_STATE__ = ${serialize(store.getState())}</script>
    </body></html>`;
    return res
      .status(200)
      // .cookie(LOCALE_COOKIE_NAME, lang, {
      //   maxAge: COOKIE_MAX_AGE,
      //   httpOnly: false
      // })
      .header('Content-Type', 'text/html')
      .send(template);
    // return res.send(htmlTemplate(head, html, css, ids, initialState, extractor))
  }).catch(error => {
    return res.send(error.message)
  })
  // await loadBranchData();
  const head = Helmet.renderStatic();
};
