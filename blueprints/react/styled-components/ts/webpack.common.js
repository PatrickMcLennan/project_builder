const path = require("path");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      Component: path.resolve(__dirname, "src/components/"),
      Context: path.resolve(__dirname, "src/contexts/"),
      Hook: path.resolve(__dirname, "src/hooks/"),
      View: path.resolve(__dirname, "src/views/"),
      Util: path.resolve(__dirname, "src/utils/")
    }
  }
};
