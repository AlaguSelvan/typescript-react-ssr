import fs from 'fs';
import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
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

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('../../config/webpack/webpack.config.js')
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

const renderHtml = (url, store, branch) => {
  // const staticContext = {};
  // let modules = []
  // const Jsx = (
  //   <Loadable.Capture report={moduleName => modules.push(moduleName)}>
  //     <Provider store={store}>
  //       <StaticRouter location={url} context={staticContext}>
  //         <CacheProvider value={cssCache}>
  //         <App />
  //         </CacheProvider>
  //       </StaticRouter>
  //     </Provider>
  //   </Loadable.Capture>
  // );

  // const initialState = store.getState();
  const { html, css, ids } = extractCritical(ReactDOMServer.renderToString(Jsx))
  // // const loadableStats = fs.readFileSync('build/react-loadable.json')
  // // const extractor = new ChunkExtractor({ statsFile });
  // const tree = extractor.collectChunks(<Jsx />);
  // const extractor = new ChunkExtractor({ statsFile });
  // const stats = JSON.parse(loadableStats)
  // const bundles = getBundles(stats, modules)
  // const bundleScripts = bundles.map(bundle => `<script src="${bundle.publicPath}"></script>`).join('')
  // return htmlTemplate(head, htmlContent, extractor, initialState)
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  let { url } = req
  const store = configureStore({url})
  const branch = matchRoutes(routes, req.path)
  const loadBranchData = (): Promise<any> => {
    // @ts-ignore
    const branch = matchRoutes(routes, req.path);
    const promises = branch.map(({ route, match }: any) => {
      if (route.loadData)
        return Promise.all(
          route
            .loadData({ params: match.params, getState: store.getState })
            .map((item: MyAction) => store.dispatch({ isLoaded: true}))
        );

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  };
  (async () => {
    try {
      await loadBranchData();
      const statsFile = path.resolve(
        process.cwd(),
        'build/public/loadable-stats.json'
      );
      const extractor = new ChunkExtractor({ statsFile });
      const staticContext: any = {};
      const JSX = (
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
    // const htmlContent = renderToString(App);
    const { html, css, ids } = extractCritical(ReactDOMServer.renderToString(Jsx))
    const head = Helmet.renderStatic();
    return htmlTemplate(head, html, css, ids, initialState, extractor)
    // return res.send(renderHtml(head, htmlContent, extractor, initialState, bundleScripts))
    } catch (err) {
      res.status(404).send('Not Found :(');
    }
  })()
  // const serverData = routes
  //   .filter(route => matchPath(routes, req.path))
  //   .map(route => route.serverFetch ? route.serverFetch(store) : store)
  // console.log(serverData)
  // Promise.all([serverData]).then(_ => {
    // console.log('test')
    // return res.send(renderHtml(url, store, branch))
  // })
});

// @ts-ignore
app.listen(3000, () => {
  const url = `http://localhost:3000`;

  // if (err) console.error(chalk.red(`==> 😭  OMG!!! ${err}`));

  console.info(console.log(`==> 🌎  Listening at ${url}`));
});
