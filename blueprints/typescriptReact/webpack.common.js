const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: { loader: "url-loader" }
      },
      {
        test: /\.(jpg|png)$/,
        use: { loader: "url-loader" }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      Component: path.resolve(__dirname, "src/components/"),
      Context: path.resolve(__dirname, "src/contexts/"),
      Font: path.resolve(__dirname, "src/assets/fonts/"),
      Hook: path.resolve(__dirname, "src/hooks/"),
      Image: path.resolve(__dirname, "src/assets/images"),
      Utility: path.resolve(__dirname, "src/utils/"),
      View: path.resolve(__dirname, "src/views")
    }
  }
};
