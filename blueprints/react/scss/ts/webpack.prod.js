const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MediaQueryPlugin = require("media-query-plugin");
const merge = require("webpack-merge");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const { ProgressPlugin } = require("webpack");
const ResourceHintWebpackPlugin = require("resource-hints-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  entry: ["babel-polyfill", "./src/index.ts"],
  output: {
    path: path.resolve(__dirname, "public"),
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
      },
      {
        test: /\.scss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")]
            }
          },
          "sass-loader"
        ]
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
        react: { test: /node_modules\/react((\-dom))?\//, name: "react", chunks: "all" }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        preset: ["default", { discardComments: { removeComments: true } }]
      }),
      new TerserPlugin({ parallel: 4 })
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: "[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new MediaQueryPlugin({
      include: ["[contenthash].css", "[id].[contenthash].css"],
      queries: { print: "print" }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "public/index.html"),
      template: "./src/template.html",
      inject: "head",
      meta: {
        robots: "index,follow",
        googlebot: "index,follow",
        rating: "general"
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    }),
    new ResourceHintWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
});
