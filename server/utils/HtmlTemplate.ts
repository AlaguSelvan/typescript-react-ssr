/* eslint @typescript-eslint/no-var-requires: 0 */
import fs from 'fs';
import { resolve } from 'path';
import serialize from 'serialize-javascript';
import cheerio from 'cheerio';

interface IProps {
	html: string;
	meta: string;
	styleTags: string;
	linkTags: string;
	initialState: any;
	scripts: string;
	nonce: string;
}

const HtmlTemplate = ({
	html,
	meta,
	styleTags,
	linkTags,
	initialState = {},
	scripts,
	nonce
}: IProps): string => {
	const htmlTemplate = resolve('build', 'client', 'index.html');
	const HTML_TEMPLATE = fs.readFileSync(htmlTemplate).toString();
	const initialStateScript = `<script nonce="${nonce}">window.__INITIAL_STATE__ = ${serialize(
		initialState
	)}</script>`;
	const template = cheerio.load(HTML_TEMPLATE);
	template('head').append(meta);
	template('head').append(linkTags);
	template('head').append(styleTags);
	template('head').append(initialStateScript);
	template('#root').html(html);
	template('body').append(scripts);
	return template.html();
};

export default HtmlTemplate;
