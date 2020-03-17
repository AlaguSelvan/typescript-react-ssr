import serialize from 'serialize-javascript'

export default function template(helmet: any, html: any, js: any, styles: any, cssHash: any, initialState: any) {
  const page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="theme-color" content="#810051">
                </head>
                <body>
                <style id="jss-server-side">${styles}</style>
                <div id="root" class="wrap-inner">${html}</div>
                ${js}
                ${cssHash}
                <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
              </body>`
  return page
}