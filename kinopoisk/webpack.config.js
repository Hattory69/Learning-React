/* eslint-disable no-undef */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

let mode = process.env.NODE_ENV === "development" ? "development" : "production";
console.log(mode + " mode");
console.log(path.resolve(__dirname, "dist"));

module.exports = {
	mode: mode,
	entry: path.resolve(__dirname, "src", "Main.jsx"),
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		clean: true,
	},
	devtool: mode === "development" ? "source-map" : undefined,
	devServer: {
		historyApiFallback: true,
		port: 7070,
		open: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src/index.html"),
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
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("postcss-preset-env")],
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "images/[name].[ext]",
						},
					},
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
			{
				test: /\.svg$/,
				loader: "svg-sprite-loader",
				options: {
					extract: true,
					publicPath: "/images/",
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name][ext]",
				},
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
};
