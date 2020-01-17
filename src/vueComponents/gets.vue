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
					<el-button type="primary" :loading="delCouponsProcessing" @click="delCoupons">清除优惠券缓存</el-button>
				</el-tab-pane>
				<el-tab-pane label="搜索页缓存" name="five">
					<el-button type="primary" :loading="delSearchProcessing" @click="delSearch">清除搜索页缓存</el-button>
				</el-tab-pane>

			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pcBaseUrl: '//www.gets.com/app/gets/awesomeTool.php',
				mobileBaseUrl: '//m.gets.com/gets/awesomeTool.php',
				activeName: 'first',
				pcProcessing: false,
				delCouponsProcessing: false,
				delSearchProcessing: false,
				delItemsCachePC: [
					{
						ids: '',
						pro: '产品',
						url: '/gets/app/gets/awesomeTool.php?act=delItemsCache&producesId=',
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
			async delSearch() {
				this.delSearchProcessing = true
				let url = "/gets/app/gets/awesomeTool.php?act=delSearch"
				let msg = "站点:gets\n\n搜索页缓存清理"
				this.$index.simpleGet(this, url, msg)
				this.delSearchProcessing = false
			},
			async delCoupons() {
				this.delCouponsProcessing = true
				let url = "/gets/app/gets/awesomeTool.php?act=delCoupons"
				let msg = "站点:gets\n\n\t优惠券清理"
				this.$index.simpleGet(this, url, msg)
				this.delCouponsProcessing = false
			},
			pcDelCache() {
				this.delItems(this.delItemsCachePC[0])
			},
			async delItems(item) {
				let that = this
				item.processing = true
				let idsArr = this.$index.unique(item.ids.split(','))
				await Promise.all(idsArr.map(async (id, ss) => {
					that.$index.isIntNum(id) && await that.$axios.get(item.url + id).then(res => {
						if((res.status === 200) ? (item.testConditions.every((s, i) => (res.data.indexOf(s) < 0))) : false){
							item.successIds.push(id)
							that.$notify({
								title: '成功',
								message: res.data,
								type: 'success'
							});
						}else {
							that.$notify({
								title: '失败',
								message: res.data,
								type: 'fail'
							});
						}
					})
				}))
				item.successIds.length>0 && this.$index.successRtx(this, "站点:gets\n  产品id:[" +item.successIds.join(',')+"]缓存清理成功")
				item.processing = false
			}
		},
		name: "gets"
	}
</script>

<style lang="less" scoped>
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