import { Request, Response } from 'express';
import { resolve } from 'path';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { pipeToNodeWritable } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import App from '../app/App';
import configureStore from '../app/redux/configureStore';
import HtmlTemplate from './utils/HtmlTemplate';
import routes from '../app/Router';
import { nanoid } from 'nanoid';

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

export const render = async (req: Request, res: Response): Promise<any> => {
	res.locals.nonce = Buffer.from(nanoid(32)).toString('base64');
	const { url } = req;
	const { store } = configureStore({ url });
	const sheet = new ServerStyleSheet();
	await preloadData(routes, req.path, store);
	const statsFile = resolve('build/client/loadable-stats.json');
	const extractor = new ChunkExtractor({ statsFile });
	const staticContext = {};
	const Jsx = (
		<ChunkExtractorManager extractor={extractor}>
			<Provider store={store}>
				<StaticRouter location={url} context={staticContext}>
					<StyleSheetManager sheet={sheet.instance}>
						<App />
					</StyleSheetManager>
				</StaticRouter>
			</Provider>
		</ChunkExtractorManager>
	);

	const initialState = store.getState();
	let didError = false;
	const { startWriting, abort } = pipeToNodeWritable(Jsx, res, {
		onReadyToStream() {
			// If something errored before we started streaming, we set the error code appropriately.
			res.statusCode = didError ? 500 : 200;
			res.setHeader('Content-type', 'text/html');
			res.write('<!DOCTYPE html>');
			startWriting();
		},
		onError(x: Error) {
			didError = true;
			console.error(x);
		}
	});
	// const html = pipeToNodeWritable(sheet.collectStyles(Jsx));
	// const styleTags = sheet.getStyleTags();
	// const head = Helmet.renderStatic();
	// const meta = `
	// 	${head.title.toString()}
	// 	${head.base.toString()}
	// 	${head.meta.toString()}
	// 	${head.link.toString()}
	// `.trim();
	// const { nonce } = res.locals;
	// const linkTags = `
	// 	${extractor.getLinkTags({ nonce })}
	// `;
	// const scripts = `${extractor.getScriptTags({ nonce })}`;
	// const document = HtmlTemplate({
	// 	html,
	// 	meta,
	// 	styleTags,
	// 	linkTags,
	// 	initialState,
	// 	scripts,
	// 	nonce
	// });
	// return res.send(document);
};

export default function middlewareRenderer(): any {
	return (req: any, res: any) => render(req, res);
}
