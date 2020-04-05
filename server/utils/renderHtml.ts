import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';
import Helmet from 'react-helmet';
import { resolve } from 'path';
import cheerio from 'cheerio';

// export const renderHtml = (
//   html: string,
//   css: any,
//   ids: any,
//   initialState = {},
//   extractor: any
// ) => {
//   const htmlTemplate = resolve('build', 'index.html');
//   const template = cheerio.load(htmlTemplate);
//   const helmet = Helmet.renderStatic();
//   template('head').append(
//     helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
//   );
//   template('head').append(
//     extractor.getLinkTags().toString() +
//     extractor.getStyleTags().toString()
//   );
//   template('head').append(
//     `<style data-emotion-css="${ids.join(' ')}">${css}</style>`
//   );
//   template('head').append(`<script>window.__INITIAL_STATE__=${serialize(initialState)};</script>`);
//   template('#app').html(`${html}`);
//   return template.html();
// };

export const renderHtml = (
  html: string,
  css: any,
  ids: any,
  initialState = {},
  extractor: any
) => {
  const head = Helmet.renderStatic();
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
        <div id="app">${html}</div>
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
    minifyURLs: true,
  };

  // Minify html in production
  return process.env.NODE_ENV === 'production'
    ? minify(document, minifyConfig)
    : document;
};
