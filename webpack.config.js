const path = require('path');
const glob = require('glob');

let entries = {};
entries = glob.sync('**/*.scss', {
	cwd: './src/sass',
	ignore: '/core/**.scss'
}).map((key) => {
	console.log(key);
})

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
	},
	{
		entry: entries,
		output: {
			path: path.resolve(__dirname, '/dist/assets/css'),
			filename: '[name].css'
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'sass-loader'
						}
					]
				}
			]
		}
	}
]