import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';

const renderHtml =  (
  head: any,
  html: string,
  css: any,
  ids: any,
  initialState = {},
  extractor: any
) => {
  const document = `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="shortcut icon" href="/favicon.ico">

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <!-- Insert bundled styles into <link> tag -->
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
        <style data-emotion-css="${ids.join(' ')}">${css}</style>
      </head>
      <body>
        <!-- Insert the router, which passed from server-side -->
        <div id="root">${html}</div>
        <!-- Insert bundled scripts into <script> tag -->
        ${extractor.getScriptTags()}
        ${head.script.toString()}
                <!-- Store the initial state into window -->
        <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
      </body>
    </html>
  `;
  // html-minifier configuration, refer to "https://github.com/kangax/html-minifier" for more configuration
  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true
  };

  // Minify html in production
  return process.env.NODE_ENV === 'production' ? minify(document, minifyConfig) : document;
};

export default renderHtml