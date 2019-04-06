const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },

  plugins: [new CheckerPlugin()]
};
