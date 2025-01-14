/* eslint-disable no-undef */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");
const miniCssConfig = require("./buildMiniCssConfig");
const path = require("path");

module.exports = (mode) => [
	miniCssConfig(mode).plugin,
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, "../src", "index.html"),
	}),
	new SpriteLoaderPlugin({
		plainSprite: true,
		spriteAttrs: {
			id: "[name]",
		},
	}),
	new webpack.DefinePlugin({
		"process.env.TOKEN": JSON.stringify(process.env.TOKEN),
	}),
	new BundleAnalyzerPlugin({
		analyzerMode: mode === "development" ? "server" : "disabled",
		openAnalyzer: true,
	}),
];
