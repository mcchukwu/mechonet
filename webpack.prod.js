const Path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    stats: "errors-only",
    bail: true,

    output: {
        filename: "js/[name].[chunkhash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].chunk.js",
    },

    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },

    plugins: [
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "css/[name].[chunkhash:8].chunk.css",
        }),
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, "./src/index.html"),
            filename: "index.html",
            minify: {
                collapseWhitespace: true, // Minify HTML
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /\.s?css/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
        ],
    },
});
