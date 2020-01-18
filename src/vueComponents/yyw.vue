<template>
	<div class="main-box">
		<div class="breadcrumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/4' }">yyw清理缓存</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="单款产品" name="first">
					<div class="ib-box">
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="delItemsCachePC[0].ids">
							<template slot="prepend">PC</template>
						</el-input>
						<el-button :disabled="delItemsCachePC[0].ids.length<1" type="primary" :loading="delItemsCachePC[0].processing" @click="pcDelCache">清除缓存</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="首页缓存" name="second">首页缓存</el-tab-pane>
				<el-tab-pane label="优惠券缓存" name="third">
					<el-button type="primary" :loading="delCouponPC[0].processing" @click="delCoupon">清除优惠券缓存</el-button>
				</el-tab-pane>
				<el-tab-pane label="搜索页缓存" name="five">
					<el-button type="primary" :loading="delSearchPC[0].processing" @click="delSearch">清除搜索页缓存</el-button>
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
				delPrivatePC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delPrivate',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nPrivate缓存清理",
					processing: false,
				}],
				delSphinxNewPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxNew',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\ndelSphinxNew缓存清理",
					processing: false,
				}],
				delSphinxHotPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxHot',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nsphinx_hotProduct缓存清理",
					processing: false,
				}],
				userTopSellPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=userTopSell',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n用户中心销售排行缓存清理",
					processing: false,
				}],
				delDiyItemsCachePC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delDiyItemsCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n订制化下所有详细页面缓存清理",
					processing: false,
				}],
				delHotCategoryPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delHotCategory',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n热销产品分类页相关缓存清理",
					processing: false,
				}],
				delNewAndHotProdsPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delNewAndHotProds',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n热销产品相关缓存清理",
					processing: false,
				}],
				delCurrencyConverterPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delCurrencyConverter',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n币种转换页面缓存清理",
					processing: false,
				}],
				delBestSellersPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delDesignList',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nbest sellers缓存清理",
					processing: false,
				}],
				delDesignListPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delDesignList',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\ndesign_list缓存清理",
					processing: false,
				}],
				delCollectionsPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delCollections',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\ncollections页面相关缓存清理",
					processing: false,
				}],
				delFinishedJewelryPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delFinishedJewelry',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n成品饰品页面相关缓存清理",
					processing: false,
				}],
				delChristmasCachePC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delChristmasCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n圣诞专题页面相关缓存清理",
					processing: false,
				}],
				delSitemapCachePC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSitemapCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nsitemap页面相关缓存清理",
					processing: false,
				}],
				delSales_promotionCachePC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSales_promotionCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n热销产品页缓存清理",
					processing: false,
				}],
				delRenewCatalogCachePC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delRenewCatalogCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n最新目录页缓存清理",
					processing: false,
				}],
				delProduceCachePC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delProduceCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n最新产品页缓存清理",
					processing: false,
				}],
				delIndexCachePC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delIndexCache',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n首页缓存清理",
					processing: false,
				}],
				delSphinxNewProductPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxNewProduct',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nsphinx新品产品缓存清理",
					processing: false,
				}],
				delSphinxHotProductPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSphinxHotProduct',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nsphinx热销产品缓存清理",
					processing: false,
				}],
				delMostWishPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delMostWish',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n收藏产品页面清理",
					processing: false,
				}],
				delVipPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delVip',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\nVIP介绍页面清理",
					processing: false,
				}],
				delSearchPC: [{
					url: '/' + this.$options.name + '/app/gets/awesomeTool.php?act=delSearch',
					testConditions: ['permission'],
					msg: "站点:" + this.$options.name + "\n搜索页缓存清理",
					processing: false,
				}],
				delCouponPC: [{
					url: '/'+this.$options.name+'/app/gets/awesomeTool.php?act=delCoupon',
					testConditions: ['permission'],
					msg: "站点:"+this.$options.name+"\n优惠券缓存清理",
					processing: false,
				}],
				delItemsCachePC: [
					{
						ids: '',
						url: '/'+this.$options.name+'/app/gets/awesomeTool.php?act=delItemsCache&producesId=',
						testConditions: ['permission'],
						processing: false,
						successIds: []
					}
				],
				delSortCachePC: [
					{
						ids: '',
						url: '/'+this.$options.name+'/app/gets/awesomeTool.php?act=delSortCache&sortsId=',
						testConditions: ['permission'],
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
			delSearch() {
				this.$index.simpleGet(this, this.delSearchPC[0])
			},
			delCoupon() {
				this.$index.simpleGet(this, this.delCouponPC[0])
			},
			pcDelCache() {
				let msg = "站点:"+this.$options.name+"\n产品缓存清理成功\n产品ID"
				this.$index.delItems(this,this.delItemsCachePC[0],msg)
			}
		},
		name: "yyw"
	}
</script>

<style lang="less" scoped>
	.el-select .el-input {
		width: 130px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}

	.el-input-group {
		margin-right: 10px;
	}
</style>