const webpack = require("webpack")
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = function (env) {
    const isProduction = process.env.NODE_ENV === "production";

    const plugins = [
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
                    from: path.join(__dirname, "src", "manifest", "*.json"),
                    to: path.join("manifest.json"),
                    transformAll(assets) {
                        const browserManifest = env.BROWSER_MANIFEST ?? "chrome";
                        const manifestIndent = isProduction ? 0 : 4;

                        const getManifestObject = fileName => {
                            const manifestAsStr = assets.find(a => a.sourceFilename.endsWith(fileName));
                            return JSON.parse(Buffer.from(manifestAsStr.data).toString());
                        };

                        const base = getManifestObject("base.json");
                        const browserSpecific = getManifestObject(`${browserManifest}.json`);
                        const combined = Object.assign(base,
                            {
                                version: process.env.npm_package_version
                            },
                            browserSpecific);

                        return Buffer.from(JSON.stringify(combined, null, manifestIndent));
                    }
                },
                { from: path.join(__dirname, "src", "images", "icon16.png") },
                { from: path.join(__dirname, "src", "images", "icon32.png") },
                { from: path.join(__dirname, "src", "images", "icon48.png") },
                { from: path.join(__dirname, "src", "images", "icon128.png") },
            ],
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new ESLintPlugin({
            failOnError: isProduction
        }),
    ];

    if (isProduction) {
        plugins.push(new WebpackObfuscator({
            rotateStringArray: true
        }));
    }

    return {
        mode: isProduction ? "production" : "development",
        devtool: isProduction ? undefined : "inline-source-map",
        entry: {
            popup: path.join(__dirname, "src", "js", "popup.js"),
            background: path.join(__dirname, "src", "js", "background.js"),
            contentScript: path.join(__dirname, "src", "js", "contentScript.js"),
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist")
        },
        resolve: {
            extensions: [".js"],
        },
        plugins: plugins
    };
};
