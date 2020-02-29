const path = require('path');

const jsEntries = {};


module.exports = [
	{
		entry: {
			'index': 'src/assets/ts/index.ts'
		},
		output: {
			path: path.resolve(__dirname, '/dist/assets/js'),
			filename: '[name].bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									[
										'@babel/preset-env',
										{
											useBuiltIns: 'entry',
											modules: false
										}
									]
								]
							}
						}
					]
				}
			]
		}
	}
]