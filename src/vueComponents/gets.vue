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
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="pcIds">
							<template slot="prepend">PC</template>
						</el-input>
						<el-button :disabled="pcIds.length<1" type="primary" :loading="pcProcessing" @click="pcDelCache">清除缓存</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="首页缓存" name="second">首页缓存</el-tab-pane>
				<el-tab-pane label="优惠券缓存" name="third">
					<el-button type="primary" :loading="delCouponsProcessing" @click="delCoupons">清除优惠券缓存</el-button>
				</el-tab-pane>

			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pcBaseUrl : '//www.gets.com/app/gets/awesomeTool.php',
				mobileBaseUrl : '//m.gets.com/gets/awesomeTool.php',
				pcIds: '',
				activeName: 'first',
				pcProcessing:false,
				delCouponsProcessing:false,
				successIds:[]
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			async delCoupons(){
				this.delCouponsProcessing = true
				let that = this
				let url = {"url":"/gets/app/gets/awesomeTool.php?act=delCoupons"}
				let p = this.del(url)
				p.then(res => {
					console.log(res)
					if (res.status === 200) {
						this.successMsg(res.data)
					} else {
						this.failMsg(res.data)
					}
				}).then(r => {
					console.log(r)
					let store = that.$store
					that.$axios.post("/rtx",{
						'sender':store.state.sender,
						'receivers':store.getters.getRtxReceivesName,
						'msg':'站点:gets  优惠券缓存清理成功;'
					}).then(res=>{
						console.log(res)
					})
				})
				this.delCouponsProcessing = false
			},
			async pcDelCache() {
				let that = this
				this.pcProcessing = true
				let pcidsArr = this.pcIds.split(',')
				pcidsArr = this.$index.unique(pcidsArr)
				let urlArr = []
				for (let id of pcidsArr) {
					if (that.$index.isIntNum(id)) {
						urlArr.push({url : "/gets/app/gets/awesomeTool.php?act=delItemsCache&producesId=" + id , id:id})
					}
				}
				for (const url of urlArr) {
					await that.del(url)
				}
				let successIdsStr = this.successIds.join(',')
				this.$axios.post("/rtx",{
					'sender':'系统机器人',
					'receivers':'全建誉;刘佳佳;',
					'msg':'站点:gets  产品id:['+successIdsStr+']缓存清理成功;'
				}).then(res=>{
					console.log(res)
				})
				this.pcProcessing = false
				this.successIds = []
			},
			del ( url ) {
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
				});
			},
			failMsg(msg) {
				this.$notify.error({
					title: '错误',
					message: msg
				});
			}
		},
		computed:{
			listProductColleague(){return this.$index.listProductColleague()}
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