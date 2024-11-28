/* eslint-disable no-undef */
const miniCssConfig = require("./buildMiniCssConfig");

module.exports = (mode) => [
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
			miniCssConfig(mode).loader,
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
];
