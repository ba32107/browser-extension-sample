const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        popup: path.join(__dirname, "src", "js", "popup.js"),
        background: path.join(__dirname, "src", "js", "background.js"),
        contentScript: path.join(__dirname, "src", "js", "contentScript.js"),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            LOG_LEVEL: JSON.stringify(isProduction ? "silent" : "debug"),
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "html", "popup.html"),
            filename: "popup.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "src", "manifest.json"),
                    transform: function (content) {
                        return Buffer.from(JSON.stringify({
                            ...JSON.parse(content.toString()),
                            version: process.env.npm_package_version,
                        }))
                    }
                },
                { from: path.join(__dirname, "src", "images", "icon16.png") },
                { from: path.join(__dirname, "src", "images", "icon32.png") },
                { from: path.join(__dirname, "src", "images", "icon48.png") },
                { from: path.join(__dirname, "src", "images", "icon128.png") },
            ],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new ESLintPlugin({
            failOnError: isProduction
        }),
    ],
};