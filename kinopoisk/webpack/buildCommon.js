/* eslint-disable no-undef */
const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, "../src/Main.jsx"),
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/",
		clean: true,
	},
	resolve: {
		alias: {
			"~components": path.resolve(__dirname, "../src/components"),
			"~images": path.resolve(__dirname, "../src/images"),
			"~redux": path.resolve(__dirname, "../src/redux"),
			"~data": path.resolve(__dirname, "../src/data"),
			"~helperFunctions": path.resolve(__dirname, "../src/helperFunctions"),
		},
		extensions: [".js", ".jsx"],
	},
};
