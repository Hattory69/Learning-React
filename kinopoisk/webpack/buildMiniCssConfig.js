/* eslint-disable no-undef */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (mode) => ({
	loader: mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
	plugin: new MiniCssExtractPlugin({
		filename: "[name].[contenthash].css",
	}),
});
