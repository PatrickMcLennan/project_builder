const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = merge(common, {
  mode: "development",
  entry: ["babel-polyfill", "./src/index.ts"],
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
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: ["react-hot-loader/webpack", "babel-loader"]
      },
      {
        test: /\.scss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hrm: true, reloadAll: true }
          },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        enforce: "pre",
        test: /\.(ts|tsx)$/,
        loader: "source-map-loader"
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({ parallel: 4, sourceMap: true })]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/template.html"),
      inject: "body"
    })
  ],
  devtool: "source-map"
});
