const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/scripts/index.ts",
  },
  output: {
    filename: "assets/scripts/[name].[contenthash].js", // Hashing for cache-busting
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/", 
    clean: true, 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          "css-loader", // Converts CSS to CommonJS
          {
            loader: "postcss-loader", 
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer"), // Add vendor prefixes
                  require("cssnano")(), // Minify CSS
                ],
              },
            },
          },
          "sass-loader", 
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon.ico",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash].css", // Extracted CSS files with hash
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // Split code for better caching and faster load times
    },
  },
};
