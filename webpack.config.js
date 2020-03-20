const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let entries = {};
const cwd = './src/assets/sass';
glob.sync('**/*.scss', {
	ignore: '_inc/**/**.scss',
	cwd: cwd
}).map((key) => {
	const {name} = path.parse(key);
	entries[name] = cwd + '/' + key;
});

module.exports = [
	{
		entry: {
			'index': './src/assets/ts/index.ts'
		},
		output: {
			path: path.resolve(__dirname, 'dist/assets/js'),
			filename: '[name].bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									[
										'@babel/preset-env',
										{
											useBuiltIns: 'usage',
											modules: false,
											corejs: 3
										}
									]
								]
							}
						},
						{
							loader: 'ts-loader'
						}
					],
					exclude: '/node_modules/'
				}
			]
		},
		resolve: {
			extensions: ['.ts']
		}
	},
	{
		entry: entries,
		output: {
			path: path.resolve(__dirname, 'dist/assets/css'),
			filename: '[name].min.css'
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false
							}
						},
						'sass-loader'
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin()
		]
	}
];