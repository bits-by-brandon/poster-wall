const path = require("path");

module.exports = {
  mode: "development",
  watch: true,
  devtool: "inline-cheap-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  entry: path.resolve(__dirname, "src/entry.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
