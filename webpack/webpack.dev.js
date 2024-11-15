const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map", // Provides better debugging in development
  output: {
    filename: "assets/scripts/[name].bundle.js", // Unhashed filenames in dev for fast iteration
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/", // Correct public path for assets
  },
  
  devServer: {
    static: {
      directory: path.join(__dirname, "../dist"), // Serve from dist folder
    },
    hot: true, // Enable Hot Module Replacement
    compress: true, // Enable gzip compression for faster transfers
    historyApiFallback: true, // For single-page apps
    open: true, // Open browser automatically
    port: 3000, // Development server port
    client: {
      overlay: {
        errors: true, // Display errors in browser
        warnings: false, // Avoid warnings in browser
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
    ],
  },
});
