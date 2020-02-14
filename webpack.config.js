'use strict';

/**
 * Plugins
 */
const path = require('path')
const webpack = require('webpack')
const SvgStore = require('webpack-svgstore-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AsyncChunkNames = require('webpack-async-chunk-names-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')

/**
 * Public Path
 */
const buildPath = '/dist/'

/**
* Module Exports
*/
module.exports = {
	entry: {
		app: ['./src/js/app.js'],
	},
	output: {
		publicPath: buildPath,
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true
				},
			}
		} 
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					},
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ 
						loader: 'css-loader', 
						options: { 
							importLoaders: 1 
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				],
			},
			{
				test: /\.(png|jpg|webp|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=1000&name=[name]-[hash].[ext]'
			}
		],
	},
	plugins: [

		new AsyncChunkNames(),

		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		}),

		new WebpackAssetsManifest(),
		
		new SvgStore({
			svgoOptions: {
				plugins: [
					{ removeTitle: true }
				]
			},
			prefix: ''
		})

	],
};