// 路由器
import VueRouter from 'vue-router'
import gets from './vueComponents/gets.vue'
import beads from './vueComponents/beads.vue'
import wbeads from './vueComponents/wbeads.vue'
import yyw from './vueComponents/yyw.vue'
import suitshe from './vueComponents/suitshe.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

var router = new VueRouter({
	routes: [
		{path: '/', name: '主页面', redirect: '/1'},
		{path: '/1', component: gets},
		{path: '/2', component: beads},
		{path: '/3', component: wbeads},
		{path: '/4', component: yyw},
		{path: '/5', component: suitshe}
	]
})

// 把路由对象暴露出去
export default router