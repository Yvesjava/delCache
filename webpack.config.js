const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: 'development',
	entry: ["@babel/polyfill", path.join(__dirname, './src/main.js')],
	stats: {children: false},
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	//这是配置dev-server 命令参数的第二种形式,4+版本的不需要引入下面的热更新插件也可以
	devServer: {
		proxy: {
			'/gets': { // api表示当前项目请求的key
				target: 'https://www.gets.com', // 代理服务器路径
				pathRewrite: {'^/gets': ''}, // 重写路径
				changeOrigin: true
			},
			'/yyw': { // api表示当前项目请求的key
				target: 'https://www.yyw.com', // 代理服务器路径
				pathRewrite: {'^/yyw': ''}, // 重写路径
				changeOrigin: true
			},
			'/m/yyw': { // api表示当前项目请求的key
				target: 'https://m.yyw.com', // 代理服务器路径
				pathRewrite: {'^/m/yyw': ''}, // 重写路径
				changeOrigin: true
			},
			'/beads': { // api表示当前项目请求的key
				target: 'https://www.beads.us', // 代理服务器路径
				pathRewrite: {'^/beads': ''}, // 重写路径
				changeOrigin: true
			},
			'/m/beads': {
				target: 'https://m.beads.us',
				pathRewrite: {'^/m/beads': ''},
				changeOrigin: true
			},
			'/wbeads': {
				target: 'https://wbeads.com',
				pathRewrite: {'^/wbeads': ''},
				changeOrigin: true
			},
			'/m/wbeads': {
				target: 'https://m.wbeads.com',
				pathRewrite: {'^/m/wbeads': ''},
				changeOrigin: true
			},
			'/rtx': {
				target: 'http://rtx.fbeads.cn:8012/sendInfo.php',
				pathRewrite: {'^/rtx': ''},
				changeOrigin: true
			}
		},
		open: true,
		port: 3001,
		host: 'localhost',
		contentBase: 'src',
		hot: true,
		overlay: {
			errors: true,
		},
		//开发环境可以设置为true
		disableHostCheck: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// 创建一个在内存中生成html 页面的插件
		new htmlWebpackPlugin({
			//指定模板页面路径,根据这个路径生成内存中的页面
			template: path.join(__dirname, './src/index.html'),
			// 指定生成页面的名称,可以随便改
			filename: "index.html"
		}),
		new VueLoaderPlugin()
	],
	// 用于配置所有的第三方模块 加载器
	module: {
		rules: [
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
			{test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
			{
				test: /\.(jpg|png|gif|bmp|jpeg)$/,
				use: {loader: 'url-loader', options: {limit: 150, name: '[hash:8]-[name].[ext]'}}
			},
			{test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
			{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
			{test: /\.vue$/, use: 'vue-loader'}
		]
	},
	resolve: {
		alias: {
			"vue$": "vue/dist/vue.js"
		}
	}
}