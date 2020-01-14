<template>
	<div class="main-box">
		<div class="breadcrumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/3' }">wbeads清理缓存</el-breadcrumb-item>
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
				<el-tab-pane label="折扣缓存" name="third">折扣缓存</el-tab-pane>
				<el-tab-pane label="类别缓存" name="fourth">
					<div class="ib-box">
						<el-input placeholder="请输入分类id,多个以英文半角逗号隔开" v-model="sortPcIds">
							<template slot="prepend">PC</template>
						</el-input>
						<el-button :disabled="sortPcIds.length<1" type="primary" :loading="sortPcProcessing" @click="sortPcDelCache">清除缓存</el-button>
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
				pcBaseUrl : '//www.wbeads.com/app/gets/awesomeTool.php',
				mobileBaseUrl : '//m.wbeads.com/gets/awesomeTool.php',
				pcIds: '',
				sortPcIds: '',
				input2: '',
				activeName: 'first',
				pcProcessing:false,
				sortPcProcessing:false
			}
		},
		methods:{
			handleClick(tab, event) {
				console.log(tab, event);
			},
			async sortPcDelCache() {
				let that = this
				this.sortPcProcessing = true
				let idsArr = this.sortPcIds.split(',')
				idsArr = this.$index.unique(idsArr)
				for (let id of idsArr) {
					if (that.$index.isIntNum(id)) {
						let url = "/wbeads/app/gets/awesomeTool.php?act=delSortCache&sortsId=" + id
						await that.$axios.get(url).then(res=>{
							if (res.status === 200) {
								this.successMsg(res.data)
								if (/sortsId/.test(res.data)){
									this.successIds.push(id)
								}
							} else {
								this.failMsg(res.data)
							}
						})
					}
				}
				let successIdsStr = this.successIds.join(',')
				this.$axios.post("/rtx",{
					'sender':'全建誉',
					'receivers':'全建誉;邓碧云;',
					'msg':'站点:wbeads  类别id:['+successIdsStr+']缓存清理成功;'
				}).then(res=>{
					console.log(res)
				})
				this.sortPcProcessing = false
				this.successIds = []
			},
			async pcDelCache() {
				let that = this
				this.pcProcessing = true
				let idsArr = this.pcIds.split(',')
				idsArr = this.$index.unique(idsArr)
				let urlArr = []
				for (let id of idsArr) {
					if (that.$index.isIntNum(id)) {
						urlArr.push(this.pcBaseUrl + "?act=delItemsCache&producesId=" + id)
					}
				}
				for (const url of urlArr) {
					await that.del(url)
				}
				this.pcProcessing = false
			},
			del ( url ) {
				return this.$axios.get(url.url).then(res => {
					if (res.status === 200) {
						this.successMsg(res.data)
						if (/producesId/.test(res.data) || /sortsId/.test(res.data)){
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
		name: "wbeads"
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