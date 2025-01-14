/* eslint-disable no-undef */
const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, "../src/Main.tsx"),
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/",
		clean: true,
	},
	resolve: {
		alias: {
			"~root": path.resolve(__dirname, "../"),
			"~components": path.resolve(__dirname, "../src/components"),
			"~images": path.resolve(__dirname, "../src/images"),
			"~redux": path.resolve(__dirname, "../src/redux"),
			"~data": path.resolve(__dirname, "../src/data"),
			"~helperFunctions": path.resolve(__dirname, "../src/helperFunctions"),
			"~testData": path.resolve(__dirname, "../src/testData"),
			"~types": path.resolve(__dirname, "../src/types"),
		},
		extensions: [".js", ".jsx", ".tsx", ".ts"],
	},
};
