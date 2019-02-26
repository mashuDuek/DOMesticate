// const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/env']
        }
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.js', '*']
  }
};

// new HtmlWebPackPlugin({
//   template: "./index.html",
//   filename: "./index.html"
// })