const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // Speed up build by using multiple processes
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.log statements in production
          },
        },
      }),
      new CssMinimizerPlugin(), // Minimize CSS
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                quality: 80,
                progressive: true,
              },
              png: {
                quality: 80,
                palette: true,
              },
              gif: {
                quality: 80,
              },
              webp: {
                quality: 80,
              },
            },
          },
        },
        generator: [
          {
            preset: "webp", // Generate WebP images for better compression
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 80,
                },
              },
            },
          },
        ],
      }),
    ],
    splitChunks: {
      chunks: "all", // Ensure large libraries are split for better caching
    },
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: "assets/images/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: "asset/resource",
        generator: {
          filename: "media/[name].[contenthash][ext]",
        },
      },
    ],
  },
});
