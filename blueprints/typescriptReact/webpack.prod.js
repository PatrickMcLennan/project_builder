const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path");
const { ProgressPlugin } = require("webpack");
const ResourceHintWebpackPlugin = require("resource-hints-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  entry: ["babel-polyfill", "./src/index.ts"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
        }
      }
    ]
  },
  optimization: {
    namedChunks: true,
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        react: {
          test: /node_modules\/react((\-dom))?\//,
          name: "react",
          chunks: "all"
        },
        css: {
          test: "*.style.ts",
          name: "css",
          chunks: "all"
        },
        styledComponents: {
          test: /node_modules\/styled-components/,
          name: "styled-components",
          chunks: "all"
        }
      }
    },
    minimizer: [new TerserPlugin({ parallel: 4 })]
  },
  plugins: [
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "dist/index.html"),
      template: "./src/template.html",
      inject: "head",
      meta: {
        "application-name": "recordStore",
        robots: "index,follow",
        googlebot: "general",
        rating: "general"
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      title: "recordStore"
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    }),
    new ResourceHintWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
});
