const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: path.join(__dirname, '/src/client/index.js')
    },
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(tsx|jsx|js|ts)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                "css-loader"
            ]
        },]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        hot:true,
        port: 9000,
        proxy: {
            "/api": {
                target: "http://localhost:" + process.env.REACT_LOCAL_PORT,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            inject: 'body'
        })
    ]
};