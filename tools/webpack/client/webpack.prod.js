const { resolve } = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const BrotliPlugin = require('brotli-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const shouldUseSourceMap = false;

const options = {
  filePath: '../../build/robots.txt',
  policy: [
    {
      userAgent: 'Googlebot',
      allow: '/',
      disallow: ['/admin', '/login'],
      crawlDelay: 2
    },
    {
      userAgent: 'OtherBot',
      allow: ['/allow-for-all-bots', '/allow-only-for-other-bot'],
      disallow: ['/admin', '/login'],
      crawlDelay: 2
    },
    {
      userAgent: '*',
      allow: '/',
      // disallow: ["/admin", "/login"],
      crawlDelay: 10,
      cleanParam: 'ref /articles/'
    }
  ],
  sitemap: `http://${process.env.HOST}/sitemap.xml`
  // host: "http://example.com",
};

const config = {
  mode: 'production',
  entry: {
    main: [resolve('app', 'index.tsx')]
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].[id].bundle.js'
  },
  resolve: {
    modules: ['build', 'node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  plugins: [
    new UglifyJSPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|tsx|ts|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.7
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|tsx|ts|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      filename: resolve('build', 'client', 'index.html'),
      template: resolve('public', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new TerserPlugin({
      terserOptions: {
        parse: {
          // We want terser to parse ecma 8 code. However, we don't want it
          // to apply any minification steps that turns valid ecma 5 code
          // into invalid ecma 5 code. This is why the 'compress' and 'output'
          // sections only apply transformations that are ecma 5 safe
          // https://github.com/facebook/create-react-app/pull/4234
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
          // Disabled because of an issue with Terser breaking valid code:
          // https://github.com/facebook/create-react-app/issues/5250
          // Pending further investigation:
          // https://github.com/terser-js/terser/issues/120
          inline: 2
        },
        mangle: {
          safari10: true
        },
        // Added for profiling in devtools
        keep_classnames: true,
        keep_fnames: true,
        output: {
          ecma: 5,
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true
        }
      },
      sourceMap: shouldUseSourceMap
    }),
    new RobotstxtPlugin(options)
  ]
};

module.exports = config;
