const path = require("path");
const { merge } = require("webpack-merge");
const CommonConfig = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const currVersion = require("./../version.json");
const FileSystem = require("fs");
const buildDate = new Date();
const ASSET_PATH = process.env.ASSET_PATH || "/";
const outputPath = path.resolve(__dirname, '../build'); // TODO_CHECK
let VERSION = currVersion && currVersion?.version || 0.00;
VERSION = (parseFloat(VERSION) + 0.01).toFixed(2);

module.exports = merge(CommonConfig, {
    mode: "production",
    entry: {
        bundle: [
            "whatwg-fetch",
            path.resolve(__dirname, "../src/index")
        ]
    },
    output: {
        path: outputPath,
        pathinfo: true,
        filename: "[name]_[contenthash].js",
        chunkFilename: "[name]_[contenthash:8].chunk.js",
        publicPath: ASSET_PATH,
        clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        comparisons: false
                    },
                    parse: {},
                    mangle: true,
                    output: {
                        comments: false,
                        ascii_only: true
                    }
                },
                parallel: true
            })
        ],
        nodeEnv: "production",
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: 10,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ["www", "css", "fonts", "img", "js", "sourceMap", "chunks", "index.html"]
        }, {
            path: path.resolve(__dirname, outputPath),
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            title: "my.project.com",
            buildDate,
            filename: "index.html",
            template: path.resolve(__dirname, "../public/index.html"),
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeRedundantAttributes: true,
            //     useShortDoctype: true,
            //     removeEmptyAttributes: true,
            //     removeStyleLinkTypeAttributes: true,
            //     keepClosingSlash: true,
            //     minifyJS: true,
            //     minifyCSS: true,
            //     minifyURLs: true
            // }
        }),
        // function () {
        //     this.plugin("done", function() {
        //         const fileName = path.resolve(__dirname, "./../version.json");
        //         const file = new Object();
        //         file.version = VERSION;
        //         FileSystem.writeFileSync(fileName, JSON.stringify(file));
        //     });
        // }
    ],
    performance: {
        assetFilter: assetFileName => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFileName)
    }
});