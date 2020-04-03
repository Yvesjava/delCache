// 入口文件
import '@babel/polyfill'
import './css/index.css'
import './css/index.less'
// import './css/index.scss'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router.js'
import app from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import index from './lib/index.js'
import axios from 'axios'
import 'http-proxy-middleware'
import store from './store/index.js'
Vue.config.devtools = true;
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$axios = axios;
Vue.prototype.$index = index;

var vm = new Vue( {
	el: '#app',
	data: {
		msg: '123'
	},
	render: c => c( app ),
	router,
	store
} )
