<template>
	<div class="main-box">
		<div class="breadcrumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/1' }">gets清理缓存</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="单款产品" name="delItemsCache">
					<div class="ib-box">
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="delItemsCachePC[0].ids">
							<template slot="prepend">PC</template>
						</el-input>
						<el-button :disabled="delItemsCachePC[0].ids.length<1" type="primary" :loading="delItemsCachePC[0].processing" @click="pcDelCache(delItemsCachePC)">清除缓存</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane :label="delSortCachePC[0].name" :name="delSortCachePC[0].func">
					<div class="ib-box">
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="delSortCachePC[0].ids">
							<template slot="prepend">PC</template>
						</el-input>
						<el-button :disabled="delSortCachePC[0].ids.length<1" type="primary" :loading="delSortCachePC[0].processing" @click="pcDelCache(delSortCachePC)">清除缓存</el-button>
					</div>
				</el-tab-pane>

				<!--<el-tab-pane label="首页缓存" :name="delIndexCachePC[0].func">-->
					<!--<el-button type="primary" :loading="delIndexCachePC[0].processing" @click.stop="allMost(delIndexCachePC[0])">清除首页缓存</el-button>-->
				<!--</el-tab-pane>-->
				<!--<el-tab-pane label="优惠券缓存" :name="delCouponPC[0].func">-->
					<!--<el-button type="primary" :loading="delCouponPC[0].processing" @click="allMost(delCouponPC[0])">清除优惠券缓存</el-button>-->
				<!--</el-tab-pane>-->
				<!--<el-tab-pane label="搜索页缓存" :name="delSearchPC[0].func">-->
					<!--<el-button type="primary" :loading="delSearchPC[0].processing" @click="allMost(delSearchPC[0])">清除搜索页缓存</el-button>-->
				<!--</el-tab-pane>-->
				<!--<el-tab-pane :label="delProduceCachePC[0].name" :name="delProduceCachePC[0].func">-->
					<!--<el-button type="primary" :loading="delProduceCachePC[0].processing" @click.stop="allMost(delProduceCachePC[0])">清除{{delProduceCachePC[0].name}}缓存</el-button>-->
				<!--</el-tab-pane>-->
				<!--<el-tab-pane :label="delNewHotProducePC[0].name" :name="delNewHotProducePC[0].func">-->
					<!--<el-button type="primary" :loading="delNewHotProducePC[0].processing" @click.stop="allMost(delNewHotProducePC[0])">清除{{delNewHotProducePC[0].name}}缓存</el-button>-->
				<!--</el-tab-pane>-->
				<el-tab-pane label="首页" :name="delIndexCachePC[0].func">
				<el-button type="primary" :loading="delIndexCachePC[0].processing" @click.stop="allMost(delIndexCachePC[0])">清除首页缓存</el-button>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				allSimpleApiData : {
					delPrivate: [{
						name:"PC私有产品",
						func:"delPrivate",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delPrivate',
						testConditions: ['删除成功'],
						msg: "站点:" + this.$options.name + "\nPrivate缓存清理",
						processing: false,
					},{
						name:"Mobile私有产品",
						func:"delPrivate",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delPrivate',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\nPrivate缓存清理",
						processing: false,
					}],
					delSphinxNew: [{
						name:"SphinxNew缓存PC",
						func:"delSphinxNew",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxNew',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\ndelSphinxNew缓存清理",
						processing: false,
					},{
						name:"SphinxNew缓存",
						func:"delSphinxNew",
						url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxNew',
						testConditions: ['permission'],
						msg: "站点:" + this.$options.name + "\ndelSphinxNew缓存清理",
						processing: false,
					}],
				},
				delSphinxNewPC: [{
					func:"delSphinxNew",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxNew',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\ndelSphinxNew缓存清理",
					processing: false,
				}],
				delSphinxHotPC: [{
					func:"delSphinxHot",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxHot',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nsphinx_hotProduct缓存清理",
					processing: false,
				}],
				userTopSellPC: [{
					func:"userTopSell",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=userTopSell',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n用户中心销售排行缓存清理",
					processing: false,
				}],
				delDiyItemsCachePC: [{
					func:"delDiyItemsCache",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delDiyItemsCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n订制化下所有详细页面缓存清理",
					processing: false,
				}],
				delHotCategoryPC: [{
					func:"delHotCategory",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delHotCategory',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n热销产品分类页相关缓存清理",
					processing: false,
				}],
				delNewHotProducePC: [{
					name:'热销新品的缓存',
					func:"delNewHotProduce",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delNewHotProduce',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n热销产品相关缓存清理",
					processing: false,
				}],
				delCurrencyConverterPC: [{
					func:"delCurrencyConverter",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delCurrencyConverter',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n币种转换页面缓存清理",
					processing: false,
				}],
				delBestSellersPC: [{
					func:"delBestSellers",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delBestSellers',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nbest sellers缓存清理",
					processing: false,
				}],
				delDesignListPC: [{
					func:"delDesignList",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delDesignList',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\ndesign_list缓存清理",
					processing: false,
				}],
				delCollectionsPC: [{
					func:"delCollections",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delCollections',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\ncollections页面相关缓存清理",
					processing: false,
				}],
				delFinishedJewelryPC: [{
					func:"delFinishedJewelry",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delFinishedJewelry',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n成品饰品页面相关缓存清理",
					processing: false,
				}],
				delChristmasCachePC: [{
					func:"delChristmasCache",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delChristmasCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n圣诞专题页面相关缓存清理",
					processing: false,
				}],
				delSitemapCachePC: [{
					func:"delSitemapCache",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSitemapCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nsitemap页面相关缓存清理",
					processing: false,
				}],
				delSales_promotionCachePC: [{
					func:"delSales_promotionCache",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSales_promotionCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n热销产品页缓存清理",
					processing: false,
				}],
				delRenewCatalogCachePC: [{
					func:"delRenewCatalogCache",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delRenewCatalogCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n最新目录页缓存清理",
					processing: false,
				}],
				delProduceCachePC: [{
					name:'新品缓存',
					func:"delProduceCache",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delProduceCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n最新产品页缓存清理",
					processing: false,
				}],
				delIndexCachePC: [{
					func:"delIndexCache",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delIndexCache',
					testConditions: ['en删除成功<br>'],
					msg: "站点:" + this.$options.name + "\n首页缓存清理",
					processing: false,
				}],
				delSphinxNewProductPC: [{
					func:"delSphinxNewProduct",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxNewProduct',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nsphinx新品产品缓存清理",
					processing: false,
				}],
				delSphinxHotProductPC: [{
					func:"delSphinxHotProduct",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxHotProduct',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nsphinx热销产品缓存清理",
					processing: false,
				}],
				delMostWishPC: [{
					func:"delMostWish",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delMostWish',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n收藏产品页面清理",
					processing: false,
				}],
				delVipPC: [{
					func:"delVip",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delVip',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nVIP介绍页面清理",
					processing: false,
				}],
				delSearchPC: [{
					func:"delSearch",
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSearch',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n搜索页缓存清理",
					processing: false,
				}],
				delCouponPC: [{
					func:"delCoupon",
					url: '/'+this.$options.name+'/app/gets/awesomeTool.php?act=delCoupon',
					testConditions: ['permission'],
					msg: "站点:"+this.$options.name+"\n优惠券缓存清理",
					processing: false,
				}],
				delItemsCachePC: [
					{
						name: '产品缓存',
						func: 'delItemsCache',
						ids: '',
						url: '/'+this.$options.name+'/app/gets/awesomeTool.php?act=delItemsCache&producesId=',
						testConditions: ['producesId'],
						msg: '产品缓存清理成功\n产品ID\n',
						processing: false,
						successIds: []
					}
				],
				delSortCachePC: [
					{
						name: '类别缓存',
						func: 'delSortCache',
						ids: '',
						url: '/'+this.$options.name+'/app/gets/awesomeTool.php?act=delSortCache&sortsId=',
						testConditions: ['删除成功<br>','所有头部导航删除成功'],
						msg: '类别缓存清理成功\n类别ID\n',
						processing: false,
						successIds: []
					}
				],
				delCrumbsSearchPC: [
					{
						ids: '',
						url: '/'+this.$options.name+'/app/gets/awesomeTool.php?act=delCrumbsSearch&sortsId=',
						testConditions: ['permission'],
						processing: false,
						successIds: []
					}
				]
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event)
			},
			allMost(obj){
				let funStr = "this.$index.simpleGet(this, this."+obj.func+"PC[0])"
				eval(funStr)
			},
			pcDelCache(data) {
				let msg = "站点:"+this.$options.name+"\n" + data[0].msg
				this.$index.delItems(this, data[0], msg)
			}
		},
		name: "gets"
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
</style>