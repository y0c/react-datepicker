const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirSrc = path.join(__dirname, 'src');
const dirExamples = path.join(__dirname, 'examples');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'DatePicker Examples';

/**
 * Webpack Configuration
 */
module.exports = {
	entry: {
		vendor: [
			'lodash'
		],
		bundle: path.join(dirExamples, 'example.tsx')
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	plugins: [
		new webpack.DefinePlugin({
			IS_DEV: IS_DEV
		}),

		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'examples/index.ejs'),
			title: appHtmlTitle
		})
	],
	module: {
		rules: [
			// BABEL
			{
				test: /\.js$|.tsx$|.ts$|.jsx$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/,
				options: {
					compact: true
				}
			},

			// STYLES
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV
						}
					},
				]
			},

			// CSS / SASS
			{
				test: /\.scss/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: IS_DEV,
							includePaths: [dirAssets]
						}
					}
				]
			},

			// IMAGES
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}
		]
	}
};
