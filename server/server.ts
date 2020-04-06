import path from "path";
import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import webpack from "webpack";
import render from "./render";
import expressStaticGzip from "express-static-gzip";
import { nanoid } from "nanoid";
import webpackHotMiddlware from "webpack-hot-middleware";

import webpackClientConfig from "../tools/webpack/webpack.config";
import webpackDevMiddleware from "webpack-dev-middleware";

dotenv.config();

const app = express();

app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === "development") {
  const compiler = webpack(webpackClientConfig);
  const clientCompiler = compiler;
  const devServerProps = {
    headers: { "Access-Control-Allow-Origin": "*" },
    hot: true,
    quiet: true,
    noInfo: true,
    writeToDisk: true,
    stats: "minimal",
    serverSideRender: true,
    index: false
  };
  const webpackDevServer = webpackDevMiddleware(clientCompiler, devServerProps);

  const webpackHotServer = webpackHotMiddlware(clientCompiler, devServerProps);
  app.use("/public", express.static(path.resolve("build/client")));
  app.use(webpackDevServer);
  app.use(webpackHotServer);
}
app.use("/public", express.static(path.resolve("build/client")));
app.use(
  "/public",
  expressStaticGzip(path.resolve("build/client"), {
    enableBrotli: true
  })
);

app.get("*", (req, res) => {
  res.locals.nonce = Buffer.from(nanoid(32)).toString("base64");
  render(req, res);
});

app.listen(process.env.PORT, () => {
  const url = `http://localhost:${process.env.PORT}`;
  console.info(`Listening at ${url}`);
});
