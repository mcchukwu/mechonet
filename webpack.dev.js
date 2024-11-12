const Path = require("path");
const common = require("./webpack.common");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        chunkFilename: "js/[name].chunk.js",
    },
    devtool: "eval-cheap-source-map",
    devServer: {
        client: {
            logging: "warn",
        },
        static: {
            directory: Path.resolve(__dirname, "public"),
        },
        watchFiles: ["src/**/*", "public/**/*"],
        port: 9000,
        hot: true,
    },

    plugins: [
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        new ESLintPlugin({
            context: Path.resolve(__dirname),
            extensions: ["js", "ts"],
            files: ["src/**/*.js", "src/**/*.ts"],
        }),
        new StylelintPlugin({
            files: Path.resolve(__dirname, "src/**/*.s?(a|c)ss"),
        }),
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    "postcss-loader",
                ],
            },
        ],
    },
});
