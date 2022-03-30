const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const CommonConfig = require("./webpack.common");
const hotMiddlewareScript = "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true";

module.exports = merge(CommonConfig, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    entry: {
        bundle: [
            "eventsource-polyfill",
            hotMiddlewareScript,
            "whatwg-fetch",
            path.resolve(path.resolve(__dirname, "../src"), "index")
        ]
    },
    output: {
        filename: "js/[name]_[chunkhash].js",
        sourceMapFilename: "js/[name]_[chunkhash].map",
        chunkFilename: "js/[id]_[chunkhash].js",
        publicPath: "/"
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify("development")
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    performance: {
        hints: false
    }
});