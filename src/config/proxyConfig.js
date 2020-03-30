module.exports = {
	proxyList:{
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
	}
}