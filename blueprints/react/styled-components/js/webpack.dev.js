const common = require("./webpack.common");
const merge = require("webpack-merge");
const path = require("path");
const HtmlWebbpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = merge(common, {
  mode: "development",
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "app.js"
  },
  devServer: {
    open: true,
    port: 8080,
    overlay: true,
    historyApiFallback: true,
    stats: "minimal"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: ["react-hot-loader/webpack", "babel-loader"]
      },
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        loader: "source-map-loader"
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({ parallel: 4, sourceMap: true })]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebbpackPlugin({
      template: path.resolve(__dirname, "src/template.html"),
      inject: "body"
    })
  ],
  devtool: "source-map"
});
