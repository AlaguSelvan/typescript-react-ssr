/* eslint @typescript-eslint/no-var-requires: 0 */
import fs from 'fs';
import { resolve } from 'path';
import serialize from 'serialize-javascript';
// import { minify } from "html-minifier";
import cheerio from 'cheerio';

const HtmlTemplate = (
  html: string,
  meta: string,
  style: any,
  criticalCssIds: any,
  linkTags: any,
  initialState = {},
  scripts: any
) => {
  const htmlTemplate = resolve('build', 'client', 'index.html');
  const HTML_TEMPLATE = fs.readFileSync(htmlTemplate).toString();
  const initialStateScript = `<script>window.__INITIAL_STATE__ = ${serialize(
    initialState
  )}</script>`;
  const template = cheerio.load(HTML_TEMPLATE);
  template('head').append(meta);
  template('head').append(linkTags);
  template('head').append(style);
  template('head').append(style);
  template('#root').html(html);
  template('body').append(scripts);
  template('head').append(initialStateScript);
  return template.html();
};

// const HtmlTemplate = (
//   html: string,
//   meta: string,
//   style: any,
//   linkTags: any,
//   initialState = {},
//   scripts: any
// ) => {
//   const document = `
//     <!doctype html>
//     <html lang="en">
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//         <!--[if IE]>
//           <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
//         <![endif]-->
//         <link rel="apple-touch-icon" href="apple-touch-icon.png">
//         <link rel="shortcut icon" href="/public/favicon.ico">
//         ${meta}
//         <!-- Insert bundled Js into <link> tag -->
//         ${linkTags}
//         ${style}
//       </head>
//       <body>
//         <!-- Insert the router, which passed from server-side -->
//         <div id="app">${html}</div>
//         <!-- Insert bundled scripts into <script> tag -->
//         ${scripts}
//         <!-- Store the initial state into window -->
//         <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
//       </body>
//     </html>
//   `;
//   // html-minifier configuration, refer to "https://github.com/kangax/html-minifier" for more configuration
//   // const minifyConfig = {
//   //   collapseWhitespace: true,
//   //   removeComments: true,
//   //   trimCustomFragments: true,
//   //   minifyCSS: true,
//   //   minifyJS: true,
//   //   minifyURLs: true
//   // };

//   return document;
// };

export default HtmlTemplate;
