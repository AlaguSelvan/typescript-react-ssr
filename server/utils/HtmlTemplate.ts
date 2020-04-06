import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';
// import cheerio from 'cheerio';

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

const HtmlTemplate = (
  html: string,
  meta: string,
  style: any,
  linkTags: any,
  initialState = {},
  scripts: any
) => {
  const document = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="shortcut icon" href="/favicon.ico">
        ${meta}
        <!-- Insert bundled Js into <link> tag -->
        ${linkTags}
        ${style}
      </head>
      <body>
        <!-- Insert the router, which passed from server-side -->
        <div id="app">${html}</div>
        <!-- Insert bundled scripts into <script> tag -->
        ${scripts}
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
  // TODO ? minify(document, minifyConfig)
  return process.env.NODE_ENV === 'production' ? document : document;
};

export default HtmlTemplate