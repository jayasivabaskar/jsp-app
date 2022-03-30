const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".less"],
        modules: [path.resolve(__dirname, "../src"), "node_modules"],
        mainFields: ["main", "module", "browser"],
        alias: {
            Images: path.resolve(__dirname, "../src/Assets/Images")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                enforce: "pre",
                loader: "eslint-loader",
                exclude: /node_modules/,
                options: {
                    emitWarnings: true,
                    configFile: "./.eslintrc.json", // TODO-CHECK
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                    limit: 81928,
                    name: "fonts/[name].[ext]"
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 81928,
                    name: "img/[name].[ext]"
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "my.project.com",
            template: path.resolve(__dirname, "../public/index.html"),
            publicPath: ASSET_PATH
        }),
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash].css",
            chunkFilename: "[name]_[contenthash].css"
        }),
        new webpack.WatchIgnorePlugin({ paths: ["src/test"] }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    }
};