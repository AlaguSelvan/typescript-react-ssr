import { resolve } from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { Provider } from "react-redux";
import Helmet from "react-helmet";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/core";
import { extractCritical } from "emotion-server";
import App from "../app/App";
import configureStore from "../app/redux/configureStore";
import HtmlTemplate from "./utils/HtmlTemplate";
import routes from "../app/Router/Routes";

const cssCache = createCache();

const preloadData = (routes, path, store) => {
  const branch = matchRoutes(routes, path);
  const promises = branch.map(({ route, match }) => {
    if (route.loadData) {
      return Promise.all(
        route
          .loadData({
            params: match.params,
            getState: store.getState,
          })
          .map((item: any) => store.dispatch(item)),
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
  const statsFile = resolve("build/client/loadable-stats.json");
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
  const { html, css, ids } = extractCritical(renderToString(Jsx));
  const head = Helmet.renderStatic();
  const meta = `
    ${head.title.toString()}
    ${head.base.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
  `.trim();
  const { nonce } = res.locals;
  const linkTags = `
    ${extractor.getLinkTags({ nonce })}
  `;
  const scripts = extractor.getScriptTags({ nonce });
  const style = `<style data-emotion-css="${ids.join(
    " ",
  )}" nonce=${nonce}>${css}</style>`;
  const document = HtmlTemplate(
    html,
    meta,
    style,
    linkTags,
    initialState,
    scripts,
  );
  return res.send(document);
};

export default render;
