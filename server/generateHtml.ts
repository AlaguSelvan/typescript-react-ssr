import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio'
import { Helmet } from 'react-helmet'
import { printDrainHydrateMarks } from 'react-imported-component'

const templatePath = path.join(__dirname, "..", "client", "index.html");
const HTML_TEMPLATE = fs.readFileSync(templatePath).toString();

export default function generateHtml(markup, state, getStream) {
  const helmet = Helmet.renderStatic();
  const template = cheerio.load(HTML_TEMPLATE)
  template("head").append(
    helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
  )
  template("head").append(
    `<script type="type/javascript">
      window.__PRELOADED_STATE__=${JSON.stringify(state)
      .replace(/</g, "\\u003c")};</script>`
  );
  template("head").append(printDrainHydrateMarks(getStream()));
  template("#app").html(markup)
  
  return template.html()
}