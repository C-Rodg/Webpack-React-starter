const webpack = require("webpack"),
	path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	package = require("./package.json");

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
		publicPath: "/",
		filename: "[name].bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }],
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
			"process.env.NODE_ENV": JSON.stringify("development")
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.[hash].js",
			minChunks(module) {
				return module.context && module.context.indexOf("node_modules") >= 0;
			}
		}),
		new HtmlWebpackPlugin({
			title: "Webpack React starter",
			filename: "./index.html",
			favicon: "./src/assets/favicon.ico",
			template: "./src/index.html",
			chunks: ["vendor", "app"]
		})
	],
	devtool: "cheap-source-map",
	devServer: {
		contentBase: OUTPUT_DIR,
		stats: {
			colors: true,
			chunks: false,
			children: false
		}
	}
};
