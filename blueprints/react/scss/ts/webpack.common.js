const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        exclude: /\.module.(s(a|c)cc)$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader", "postcss-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx"],
    alias: {
      Component: path.resolve(__dirname, "src/components/"),
      Context: path.resolve(__dirname, "src/contexts/"),
      Hook: path.resolve(__dirname, "src/hooks/"),
      View: path.resolve(__dirname, "src/views/"),
      Util: path.resolve(__dirname, "src/utils/")
    }
  }
};
