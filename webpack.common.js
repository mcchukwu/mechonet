const Path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: {
        index: Path.resolve(__dirname, "./src/script/index.ts"),
    },
    output: {
        path: Path.resolve(__dirname, "./build"),
        filename: "js/[name].js",
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            name: false,
        },
    },

    plugins: [new ForkTsCheckerWebpackPlugin()],

    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },

            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },

                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                type: "asset/resource",
            },
        ],
    },
};
