module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["last 2 versions"],
          node: "current",
        },
        debug: false,
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    "react-hot-loader/babel",
    "emotion",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "@loadable/babel-plugin",
    "@babel/plugin-transform-runtime",
  ],
};
