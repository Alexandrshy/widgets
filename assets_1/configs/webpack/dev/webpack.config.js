const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const common = require("../webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  output: {
    chunkFilename: "[name].chunk.js"
  },
  devServer: {
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(`${__dirname}/src`),
        loader: "eslint-loader",
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(`${__dirname}/src`),
        loader: "babel-loader"
      },
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader?sourceMap=true", "sass-loader"]
      }
    ]
  }
});
