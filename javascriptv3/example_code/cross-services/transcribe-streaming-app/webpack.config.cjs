var webpack = require("webpack");
var path = require("path");

var config = {
  entry: {
    index: "./src/index.js"
  },
  mode: "development",
  devtool: "eval-source-map",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};

module.exports = config;
