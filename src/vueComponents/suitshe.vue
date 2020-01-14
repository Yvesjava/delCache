<template>
	<div class="main-box">
		<div class="breadcrumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/5' }">suitshe清理缓存</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="单款产品" name="first">
					<div class="ib-box">
						<el-input placeholder="请输入id,多个以英文半角逗号隔开" v-model="pcIds">
							<template slot="prepend">PC</template>
						</el-input>
						<el-button :disabled="pcIds.length<1" type="primary" @click="pcDelCache">清除缓存</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane label="首页缓存" name="second">首页缓存</el-tab-pane>
				<el-tab-pane label="折扣缓存" name="third">折扣缓存</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pcBaseUrl : '//www.suitshe.com/app/gets/awesomeTool.php',
				mobileBaseUrl : '//m.suitshe.com/gets/awesomeTool.php',
				pcIds: '',
				input2: '',
				activeName: 'first'
			}
		},
		methods:{
			handleClick(tab, event) {
				console.log(tab, event);
			},
			pcDelCache() {
				console.log( this.pcIds );
				let pcidsArr = this.pcIds.split( ',' );
				console.log( pcidsArr );
				for ( let id of pcidsArr ) {
					if ( this.isIntNum(id)){
						let url = this.pcBaseUrl+"?act=delItemsCache&producesId="+id
						let p = this.del(url)
						p.then(res=>{
							console.log(res)
							if (res.status === 200) {
								this.successMsg(res.data)
							}else {
								this.failMsg(res.data)
							}
						})
					}
				}
			},
			isIntNum( val ) {
				let regPos = /^([1-9][0-9]*)$/ // 非负整数
				if ( regPos.test( val ) ) {
					return true;
				} else {
					return false;
				}
			},
			del ( url ) {
				return this.$axios.get( url )
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
		name: "suitshe"
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