<template>
	<div class="main-box">
		<div class="breadcrumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/4' }">YYW清理缓存</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="tabBox">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="电脑端" name="pc">
					<section v-for="item in pcItems[0]">
						<div class="ib-box">
							<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="item.ids" @keyup="removeComma">
								<template slot="prepend">{{item.name}}</template>
							</el-input>
							<el-button :disabled="item.ids.length<1" type="primary" :loading="item.processing" @click="pcDelCache(item)">清除缓存</el-button>
						</div>
					</section>
					<section class="el-mt-2">

					</section>
					<el-divider></el-divider>
					<div class="simple-div" v-for="item in pcSimpleGet[0]">
						<div class="simple-box">
							<el-button type="primary" :loading="item.processing" @click="allMost(item)">{{item.name}}</el-button>
						</div>
					</div>
				</el-tab-pane>

				<el-tab-pane label="手机端" name="mobile">
					<section v-for="item in mobileItems[0]">
						<div class="ib-box">
							<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="item.ids">
								<template slot="prepend">{{item.name}}</template>
							</el-input>
							<el-button :disabled="item.ids.length<1" type="primary" :loading="item.processing" @click="pcDelCache(item)">清除缓存</el-button>
						</div>
					</section>
					<section class="el-mt-2">

					</section>
					<el-divider></el-divider>
					<div class="simple-div" v-for="item in mobileSimpleGet[0]">
						<div class="simple-box">
							<el-button type="primary" :loading="item.processing" @click="allMost(item)">{{item.name}}</el-button>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'pc',
				pcSimpleGet:[{
					delIndexCache: {
						name:"首页缓存",
						func:"delIndexCache",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delIndexCache',
						testConditions: ['首页缓存删除成功'],
						msg: "站点:" + this.$options.name + "\n首页缓存清理",
						processing: false,
					},
					delHead: {
						name:"头部部导航缓存",
						func:"delHead",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delHead',
						testConditions: ['导航菜单缓存删除'],
						msg: "站点:" + this.$options.name + "\n头部，底部，导航菜单缓存删除成功",
						processing: false,
					},
					allSort: {
						name:"更新allSort缓存",
						func:"allSort",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=allSort',
						testConditions: ['已经更新'],
						msg: "站点:" + this.$options.name + "\nallSort已经更新成功",
						processing: false,
					},
					delSales_promotionCache: {
						name:"热销产品页缓存",
						func:"delSales_promotionCache",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSales_promotionCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n热销产品页缓存清理",
						processing: false,
					},
					delProduceCache: {
						name:'新品缓存',
						func:"delProduceCache",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delProduceCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n最新产品页缓存清理",
						processing: false,
					},
					delSphinxNewProduct: {
						name:"sphinx新品产品缓存",
						func:"delSphinxNewProduct",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxNewProduct',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nsphinx新品产品缓存清理",
						processing: false,
					},
					delSearch: {
						name:"搜索页缓存",
						func:"delSearch",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSearch',
						testConditions: ['缓存删除成功'],
						msg: "站点:" + this.$options.name + "\n搜索页缓存清理",
						processing: false,
					},
					delCoupon: {
						name:"优惠券缓存",
						func:"delCoupon",
						url: '/'+this.$options.name+'/app/gets/awesomeTool.php?act=delCoupon',
						testConditions: ['permission'],
						msg: "站点:"+this.$options.name+"\n优惠券缓存清理",
						processing: false,
					},
					delSphinxNew: {
						name:"delSphinxNew",
						func:"delSphinxNew",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxNew',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\ndelSphinxNew缓存清理",
						processing: false,
					},
					delSphinxHot: {
						name:"delSphinxHot",
						func:"delSphinxHot",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxHot',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nsphinx_hotProduct缓存清理",
						processing: false,
					},
					userTopSellPC: {
						name:"销售排行缓存",
						func:"userTopSell",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=userTopSell',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n用户中心销售排行缓存清理",
						processing: false,
					},
					delDiyItemsCache: {
						name:"订制页面缓存",
						func:"delDiyItemsCache",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delDiyItemsCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n订制化下所有详细页面缓存清理",
						processing: false,
					},
					delHotCategory: {
						name:"热销分类页缓存",
						func:"delHotCategory",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delHotCategory',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n热销产品分类页相关缓存清理",
						processing: false,
					},
					delNewHotProduce: {
						name:'热销新品的缓存',
						func:"delNewHotProduce",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delNewHotProduce',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n热销产品相关缓存清理",
						processing: false,
					},
					delCurrencyConverter: {
						name:"币种转换页缓存",
						func:"delCurrencyConverter",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delCurrencyConverter',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n币种转换页面缓存清理",
						processing: false,
					},
					delBestSellers: {
						name:"bestSellers缓存",
						func:"delBestSellers",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delBestSellers',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nbest sellers缓存清理",
						processing: false,
					},
					delDesignList: {
						name:"DesignList",
						func:"delDesignList",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delDesignList',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\ndesign_list缓存清理",
						processing: false,
					},
					delCollections: {
						name:"Collections",
						func:"delCollections",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delCollections',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\ncollections页面相关缓存清理",
						processing: false,
					},
					delFinishedJewelry: {
						name:"成品饰品页面缓存",
						func:"delFinishedJewelry",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delFinishedJewelry',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n成品饰品页面相关缓存清理",
						processing: false,
					},
					delChristmasCache: {
						name:"圣诞页面缓存",
						func:"delChristmasCache",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delChristmasCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n圣诞专题页面相关缓存清理",
						processing: false,
					},
					delSitemapCache: {
						name:"sitemap页面缓存",
						func:"delSitemapCache",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSitemapCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nsitemap页面相关缓存清理",
						processing: false,
					},
					delRenewCatalogCache: {
						name:"最新目录页缓存",
						func:"delRenewCatalogCache",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delRenewCatalogCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n最新目录页缓存清理",
						processing: false,
					},
					delSphinxHotProduct: {
						name:"sphinx热销产品缓存",
						func:"delSphinxHotProduct",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxHotProduct',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nsphinx热销产品缓存清理",
						processing: false,
					},
					delMostWish: {
						name:"收藏产品页面",
						func:"delMostWish",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delMostWish',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n收藏产品页面清理",
						processing: false,
					},
					delVip: {
						name:"VIP介绍页面",
						func:"delVip",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delVip',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nVIP介绍页面清理",
						processing: false,
					},

				}],
				pcItems: [{
					delItemsCache: {
						name: '产品缓存',
						func: 'delItemsCache',
						ids: '',
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delItemsCache&producesId=',
						testConditions: ['producesId','所有产品缓存删除成功'],
						processing: false,
						successMsg: "站点:"+this.$options.name+"\n产品缓存清理成功\n产品ID",
						successIds: []
					},
					delSortCache: {
						name: '分类缓存',
						func: 'delSortCache',
						ids: '',
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSortCache&sortsId=',
						testConditions: ['类别列表删除成功','所有头部导航删除成功'],
						processing: false,
						successMsg: "站点:"+this.$options.name+"\n分类缓存清理成功\n分类ID",
						successIds: []
					} ,
				}],
				mobileItems: [{
					delItemsCache: {
						name: '产品缓存',
						func: 'delItemsCache',
						ids: '',
						url: '/m/' + this.$options.name + '/gets/awesomeTool.php?act=delItemsCache&producesId=',
						testConditions: ['producesId','所有产品缓存删除成功'],
						processing: false,
						successMsg: "站点:"+this.$options.name+"\n产品缓存清理成功\n产品ID",
						successIds: []
					},
					delSortCache: {
						name: '分类缓存',
						func: 'delSortCache',
						ids: '',
						url: '/m/' + this.$options.name + '/gets/awesomeTool.php?act=delSortCache&sortsId=',
						testConditions: ['类别列表删除成功','所有头部导航删除成功'],
						processing: false,
						successMsg: "站点:"+this.$options.name+"\n分类缓存清理成功\n分类ID",
						successIds: []
					} ,
				}],
				mobileSimpleGet:[{
					delIndexCache: {
						name:"首页缓存",
						func:"delIndexCache",
						url: '/m/' + this.$options.name + '/gets/awesomeTool.php?act=delIndexCache',
						testConditions: ['首页缓存删除成功'],
						msg: "站点:" + this.$options.name + "\n移动端首页缓存清理",
						processing: false,
					},
					delHead: {
						name:"头部部导航缓存",
						func:"delHead",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delHead',
						testConditions: ['导航菜单缓存删除'],
						msg: "站点:" + this.$options.name + "\n头部，底部，导航菜单缓存删除成功",
						processing: false,
					},
					delSales_promotionCache: {
						name:"热销产品页缓存",
						func:"delSales_promotionCache",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delSales_promotionCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n热销产品页缓存清理",
						processing: false,
					},
					delProduceCache: {
						name:'新品缓存',
						func:"delProduceCache",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delProduceCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n最新产品页缓存清理",
						processing: false,
					},
					delSphinxNewProduct: {
						name:"sphinx新品产品缓存",
						func:"delSphinxNewProduct",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delSphinxNewProduct',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nsphinx新品产品缓存清理",
						processing: false,
					},
					delSearch: {
						name:"搜索页缓存",
						func:"delSearch",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delSearch',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n搜索页缓存清理",
						processing: false,
					},
					delCoupon: {
						name:"优惠券缓存",
						func:"delCoupon",
						url: '/'+this.$options.name+'/gets/awesomeTool.php?act=delCoupon',
						testConditions: ['permission'],
						msg: "站点:"+this.$options.name+"\n优惠券缓存清理",
						processing: false,
					},
					delSphinxNew: {
						name:"delSphinxNew",
						func:"delSphinxNew",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delSphinxNew',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\ndelSphinxNew缓存清理",
						processing: false,
					},
					delSphinxHot: {
						name:"delSphinxHot",
						func:"delSphinxHot",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delSphinxHot',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nsphinx_hotProduct缓存清理",
						processing: false,
					},
					userTopSellPC: {
						name:"销售排行缓存",
						func:"userTopSell",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=userTopSell',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n用户中心销售排行缓存清理",
						processing: false,
					},
					delDiyItemsCache: {
						name:"订制页面缓存",
						func:"delDiyItemsCache",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delDiyItemsCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n订制化下所有详细页面缓存清理",
						processing: false,
					},
					delHotCategory: {
						name:"热销分类页缓存",
						func:"delHotCategory",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delHotCategory',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n热销产品分类页相关缓存清理",
						processing: false,
					},
					delNewHotProduce: {
						name:'热销新品的缓存',
						func:"delNewHotProduce",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delNewHotProduce',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n热销产品相关缓存清理",
						processing: false,
					},
					delCurrencyConverter: {
						name:"币种转换页缓存",
						func:"delCurrencyConverter",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delCurrencyConverter',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n币种转换页面缓存清理",
						processing: false,
					},
					delBestSellers: {
						name:"bestSellers缓存",
						func:"delBestSellers",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delBestSellers',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nbest sellers缓存清理",
						processing: false,
					},
					delDesignList: {
						name:"DesignList",
						func:"delDesignList",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delDesignList',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\ndesign_list缓存清理",
						processing: false,
					},
					delCollections: {
						name:"Collections",
						func:"delCollections",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delCollections',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\ncollections页面相关缓存清理",
						processing: false,
					},
					delFinishedJewelry: {
						name:"成品饰品页面缓存",
						func:"delFinishedJewelry",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delFinishedJewelry',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n成品饰品页面相关缓存清理",
						processing: false,
					},
					delChristmasCache: {
						name:"圣诞页面缓存",
						func:"delChristmasCache",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delChristmasCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n圣诞专题页面相关缓存清理",
						processing: false,
					},
					delSitemapCache: {
						name:"sitemap页面缓存",
						func:"delSitemapCache",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delSitemapCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nsitemap页面相关缓存清理",
						processing: false,
					},
					delRenewCatalogCache: {
						name:"最新目录页缓存",
						func:"delRenewCatalogCache",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delRenewCatalogCache',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n最新目录页缓存清理",
						processing: false,
					},
					delSphinxHotProduct: {
						name:"sphinx热销产品缓存",
						func:"delSphinxHotProduct",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delSphinxHotProduct',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nsphinx热销产品缓存清理",
						processing: false,
					},
					delMostWish: {
						name:"收藏产品页面",
						func:"delMostWish",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delMostWish',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\n收藏产品页面清理",
						processing: false,
					},
					delVip: {
						name:"VIP介绍页面",
						func:"delVip",
						url: '/' + this.$options.name + '/gets/awesomeTool.php?act=delVip',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nVIP介绍页面清理",
						processing: false,
					},
				}],
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event)
			},
			allMost(obj){
				console.log(obj)
				let funStr = "this.$index.simpleGet(this, obj)"
				eval(funStr)
			},
			pcDelCache(obj) {
				this.$index.delItems(this, obj)
			},
			removeComma(){
				console.log(11111111)
			}
		},
		name: "yyw"
	}
</script>

<style lang="less" scoped>
	.top {
		text-align: center;
	}
	.el-select .el-input {
		display: inline-block;
	}

	.el-input-group {
		margin-right: 10px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
	.el-mt-2{
		margin-top: 2px;
	}
	.ib-box-span{
		width: 100px;
		margin-right: 5px;
	}
	.simple-div{
		float: left;
	}
	.simple-box{
		width: 200px;
		height: 80px;
	}
</style>