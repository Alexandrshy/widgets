const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("../webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",
  bail: true,
  output: {},
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(`${__dirname}/../../../dist`)
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.s?css/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  }
});
