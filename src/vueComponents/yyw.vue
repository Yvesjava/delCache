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
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="pcIds">
							<template slot="prepend">PC</template>
						</el-input>
						<el-button :disabled="pcIds.length<1" type="primary" :loading="pcProcessing" @click="pcDelCache">清除缓存</el-button>
					</div>
					<div class="ib-box">
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="mobileIds">
							<template slot="prepend">Mobile</template>
						</el-input>
						<el-button :disabled="mobileIds.length<1" type="primary" :loading="mobileProcessing" @click="mobileDelCache">清除缓存</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="首页缓存" name="second">
					<el-button type="primary" @click="pcDelCacheIndex">清除PC首页缓存</el-button>
				</el-tab-pane>
				<el-tab-pane label="折扣缓存" name="third">
					<el-button type="primary" :loading="discountProcessing" @click="pcDelCacheDiscount">清除PC折扣缓存</el-button>
				</el-tab-pane>
				<el-tab-pane label="优惠券缓存" name="fourth">
					<el-button type="primary" @click="pcDelCouponCache">清除优惠券缓存</el-button>
				</el-tab-pane>
				<el-tab-pane label="促销产品缓存" name="five">
					<el-button type="primary" :loading="delPromotionProductProcessing" @click="delPromotionProduct">清除促销产品缓存</el-button>
				</el-tab-pane>
				<el-tab-pane label="产品详情页缓存" name="six">
					<el-button type="primary" :loading="delItemsCacheProcessing" @click="delItemsCache">清除产品详情页缓存</el-button>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pcIds: '',
				mobileIds: '',
				activeName: 'first',
				mobileProcessing: false,
				pcProcessing: false,
				successIds:[],
				discountProcessing:false,
				delItemsCacheProcessing:false,
				delPromotionProductProcessing:false
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event)
			},
			async delItemsCache() {
				this.delItemsCacheProcessing = true
				let url = "yyw/app/gets/awesomeTool.php?act=delItemsCache&producesId=0"
				await this.$axios.get(url).then(res => {
					console.log(res)
				})
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;李盛希;',
					'msg':'站点:yyw  产品详情页缓存删除成功;'
				}).then(res=>{
					console.log(res)
				})
				this.delItemsCacheProcessing = false
			},
			async delPromotionProduct() {
				this.delPromotionProductProcessing = true
				let url = "yyw/app/gets/awesomeTool.php?act=delPromotionProduct"
				await this.$axios.get(url).then(res => {
					console.log(res)
				})
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;李盛希;方丹琼;蒋姣芳;',
					'msg':'站点:yyw  推广产品的缓存删除成功;'
				}).then(res=>{
					console.log(res)
				})
				this.delPromotionProductProcessing = false
			},
			async pcDelCacheDiscount() {
				this.discountProcessing = true
				let url = "yyw/app/gets/awesomeTool.php?act=delDiscount"
				await this.$axios.get(url).then(res => {
					console.log(res)
				})
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;李盛希;方丹琼;蒋姣芳;',
					'msg':'站点:yyw  折扣缓存清理成功;'
				}).then(res=>{
					console.log(res)
				})
				this.discountProcessing = false
			},
			async pcDelCacheIndex() {
				let url = "yyw/app/gets/awesomeTool.php?act=delIndexCache"
				await this.$axios.get(url).then(res => {
					console.log(res)
				})
				this.$axios.post("/rtx",{
					'sender':'系统机器人',
					'receivers':'全建誉;李盛希;',
					'msg':'站点:yyw  首页缓存清理成功;'
				}).then(res=>{
					console.log(res)
				})
			},
			async pcDelCache() {
				let that = this
				this.pcProcessing = true
				let pcidsArr = this.pcIds.split(',')
				pcidsArr = this.$index.unique(pcidsArr)
				let urlArr = []
				for (let id of pcidsArr) {
					if (that.$index.isIntNum(id)) {
						urlArr.push({url : "/yyw/app/gets/awesomeTool.php?act=delItemsCache&producesId=" + id , id:id})
					}
				}
				for (const url of urlArr) {
					await that.del(url)
				}
				let successIdsStr = this.successIds.join(',')
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;方丹琼;',
					'msg':'站点:yyw  产品id:['+successIdsStr+']缓存清理成功;'
				}).then(res=>{
					console.log(res)
				})
				this.pcProcessing = false
				this.successIds = []
			},
			pcDelCouponCache() {
				let url = this.pcBaseUrl + "?act=delCoupons"
				let p = this.del(url)
				p.then(res => {
					console.log(res)
					if (res.status === 200) {
						this.successMsg(res.data)
					} else {
						this.failMsg(res.data)
					}
				})
			},
			async mobileDelCache() {
				let that = this
				this.mobileProcessing = true
				let idsArr = this.mobileIds.split(',')
				idsArr = this.$index.unique(idsArr)
				let urlArr = []
				for (let id of idsArr) {
					if (that.$index.isIntNum(id)) {
						urlArr.push({url : "/m/yyw/gets/awesomeTool.php?act=delItemsCache&producesId=" + id , id:id})
					}
				}
				for (const url of urlArr) {
					await that.del(url)
				}
				let successIdsStr = this.successIds.join(',')
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;李盛希;',
					'msg':'站点:m.yyw  产品id:['+successIdsStr+']缓存清理成功;'
				}).then(res=>{
					console.log(res)
				})
				this.mobileProcessing = false
				this.successIds = []
			},
			del(url) {
				return this.$axios.get(url.url).then(res => {
					if (res.status === 200) {
						this.successMsg(res.data)
						if (/producesId/.test(res.data)){
							this.successIds.push(url.id)
						}
					} else {
						this.failMsg(res.data)
					}
				})
			},
			successMsg(msg) {
				this.$notify({
					title: '成功',
					message: msg,
					type: 'success'
				})
			},
			failMsg(msg) {
				this.$notify.error({
					title: '错误',
					message: msg
				})
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