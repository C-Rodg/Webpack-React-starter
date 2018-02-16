const webpack = require("webpack"),
	path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	package = require("./package.json"),
	StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

const defaultInclude = [SRC_DIR];

module.exports = {
	target: "web",
	entry: {
		app: SRC_DIR + "/index.js",
		vendor: Object.keys(package.dependencies)
	},
	output: {
		path: OUTPUT_DIR,
		publicPath: "",
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				}),
				include: defaultInclude
			},
			{
				test: /\.jsx?$/,
				use: [{ loader: "babel-loader" }],
				include: defaultInclude
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [{ loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" }],
				include: defaultInclude
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{ loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" }
				],
				include: defaultInclude
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.[chunkhash].js",
			minChunks(module) {
				return module.context && module.context.indexOf("node_modules") >= 0;
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "runtime",
			minChunks: Infinity
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			},
			output: {
				comments: false
			}
		}),
		new HtmlWebpackPlugin({
			title: "Webpack React starter",
			filename: "./index.html",
			favicon: "./src/assets/favicon.ico",
			template: "./src/index.html",
			chunks: ["vendor", "app"],
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true
			}
		}),
		new ExtractTextPlugin({
			filename: "[name].[contenthash].css",
			allChunks: true
		}),
		new StyleExtHtmlWebpackPlugin({
			minify: true
		})
	],
	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false
	}
};
