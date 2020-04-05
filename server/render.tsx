import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import createEmotionServer from 'create-emotion-server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';

import App from '../app/App';
import configureStore from '../app/redux/configureStore';
import HtmlTemplate from './utils/HtmlTemplate';
import routes from '../app/Router/Routes';

const cssCache = createCache()
const { extractCritical } = createEmotionServer(cssCache)

const render = async(req: any, res: any) => {
  const { url } = req
  const { store } = configureStore({ url });
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
  const statsFile = path.resolve('build/client/loadable-stats.json');
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
  );
  const initialState = store.getState();
  const { html, css, ids } = extractCritical(
    ReactDOMServer.renderToString(rootJsx)
  );
  const document = HtmlTemplate(html, css, ids, initialState, extractor);
  return res.send(document);
};

export default render