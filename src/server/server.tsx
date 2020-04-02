import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import compression from 'compression';
import helmet from 'helmet';
import Helmet from 'react-helmet';
import routes from '../client/Router/Routes'
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import createEmotionServer from 'create-emotion-server'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'

import App from '../client/App'
import configureStore from '../client/redux/configureStore';
import htmlTemplate from '../utils/renderHtml';

require('dotenv').config()

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.static(path.resolve('public')));

const cssCache = createCache()
const { extractCritical } = createEmotionServer(cssCache)

if (process.env.NODE_ENV === 'production') {
  const webpackClientConfig = require('../../tools/webpack/client/webpack.config')
  const compiler = webpack(webpackClientConfig);
  const devServerProps = {
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
} else {
  const webpackClientConfig = require('../../tools/webpack/client/webpack.config')
  const webpackServerConfig = require('../../tools/webpack/server/webpack.config')
  const compiler = webpack([webpackClientConfig, webpackServerConfig]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];
  const devServerProps = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    quiet: true,
    noInfo: true,
    writeToDisk: true,
    stats: 'minimal',
    serverSideRender: true
  }
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    clientCompiler,
    devServerProps
  );

  const webpackHotMiddlware = require('webpack-hot-middleware')(
    clientCompiler,
    devServerProps
  );
  // const webpackServerMiddlware = require('webpack-hot-server-middleware')(
  //   compiler
  // );

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddlware);
  // app.use(webpackHotServerMiddleware(compiler));
  console.log('done')
}

export const serverRenderer = async(url: any, req: any, res: any) => {
(async() => {
  try {  const { store } = configureStore({ url });
         const branch = matchRoutes(routes, req.path);
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
         const statsFile = path.resolve('build/loadable-stats.json');
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
         // const extractors = new ChunkExtractor({ statsFile });
         const tree = extractor.collectChunks(<App />);
         const { html, css, ids } = extractCritical(
           ReactDOMServer.renderToString(rootJsx)
         );
         const head = Helmet.renderStatic();
         return res.send(
           htmlTemplate(head, html, css, ids, initialState, extractor)
         );
}
  catch (err) {
      console.log(err.message)
      res.status(404).send('Not Found :(');
    }
  })()
}

app.get('*', (req, res) => {
  console.log('hit routes')
  let { url } = req
  serverRenderer(url, req, res)
});

app.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.info(`Listening at ${url}`);
});
