<template>
	<div class="main-box">
		<div class="breadcrumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/2' }">beads清理缓存</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="单款产品" name="first">
					<div class="ib-box">
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="pcIds">
							<template slot="prepend">PC</template>
						</el-input>
						<el-button :disabled="pcIds.length<1" :loading="pcProcessing" type="primary" @click="pcDelCache">清除缓存</el-button>
					</div>
					<div class="ib-box">
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="mobileIds">
							<template slot="prepend">Mobile</template>
						</el-input>
						<el-button :disabled="mobileIds.length<1" :loading="mobileProcessing" type="primary" @click="mobileDelCache">清除缓存</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="首页缓存" name="second">
					<el-button type="primary" @click="pcDelCacheIndex">清除PC首页缓存</el-button>
				</el-tab-pane>
				<el-tab-pane label="折扣缓存" name="third">
					<el-button :loading="discountProcessing" type="primary" @click="pcDelCacheDiscount">清除缓存</el-button>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pcBaseUrl: '//www.beads.us/app/gets/awesomeTool.php',
				mobileBaseUrl: '//m.beads.us/gets/awesomeTool.php',
				pcIds: '',
				mobileIds: '',
				activeName: 'first',
				pcProcessing: false,
				mobileProcessing: false,
				discountProcessing: false,
				successIds:[]
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event)
			},
			async pcDelCacheIndex() {
				let that = this
				let url = "beads/app/gets/awesomeTool.php?act=delIndexCache"
				await this.$axios.get(url).then(res => {
					console.log(res)
				})
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;李盛希;',
					'msg':'站点:beads  首页缓存清理成功;'
				}).then(res=>{
					console.log(res)
				})
			},
			async pcDelCacheDiscount() {
				let that = this
				this.discountProcessing = true
				let url = "beads/app/gets/awesomeTool.php?act=delDiscount"
				await this.$axios.get(url).then(res => {
					console.log(res)
				})
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;邱国华;',
					'msg':'站点:beads  折扣缓存清理成功;'
				}).then(res=>{
					console.log(res)
				})
				this.discountProcessing = false
			},
			async mobileDelCache() {
				let that = this
				this.mobileProcessing = true
				let idsArr = this.mobileIds.split(',')
				idsArr = this.$index.unique(idsArr)
				let urlArr = []
				for (let id of idsArr) {
					if (that.$index.isIntNum(id)) {
						urlArr.push({url : "/m/beads/gets/awesomeTool.php?act=delItemsCache&producesId=" + id , id:id})
					}
				}
				for (const url of urlArr) {
					await that.del(url)
				}
				let successIdsStr = this.successIds.join(',')
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;李盛希;',
					'msg':'站点:m.beads  产品id:['+successIdsStr+']缓存清理成功;'
				}).then(res=>{
					console.log(successIdsStr)
					console.log(res)
				})
				this.mobileProcessing = false
				this.successIds = []
			},
			async pcDelCache() {
				let that = this
				this.pcProcessing = true
				let pcidsArr = this.pcIds.split(',')
				pcidsArr = this.$index.unique(pcidsArr)
				let urlArr = []
				for (let id of pcidsArr) {
					if (that.$index.isIntNum(id)) {
						urlArr.push({url : "/beads/app/gets/awesomeTool.php?act=delItemsCache&producesId=" + id , id:id})
					}
				}
				for (const url of urlArr) {
					await that.del(url)
				}
				let successIdsStr = this.successIds.join(',')
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;招卓宏;',
					'msg':'站点:beads  产品id:['+successIdsStr+']缓存清理成功;'
				}).then(res=>{
					console.log(successIdsStr)
					console.log(res)
				})
				this.pcProcessing = false
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
		name: "beads"
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