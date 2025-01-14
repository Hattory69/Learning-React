/* eslint-disable no-undef */
const { merge } = require("webpack-merge");
const common = require("./webpack/buildCommon");
const plugins = require("./webpack/buildPlugins");
const loaders = require("./webpack/buildLoaders");
const devServer = require("./webpack/buildDevServer");

const path = require("path");

let mode = process.env.NODE_ENV === "development" ? "development" : "production";
console.log(mode + " mode");
console.log(path.resolve(__dirname, "dist"));

module.exports = merge(
	common,
	{ plugins: plugins(mode) },
	{
		mode: mode,
		devtool: mode === "development" ? "source-map" : undefined,
	},
	{ module: { rules: loaders(mode) } },
	mode === "development" ? devServer : {}
);
