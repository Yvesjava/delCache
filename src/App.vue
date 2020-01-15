<template>
	<div>
		<el-container>
			<el-header>缓存清理助手</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
							router
							default-active="1"
							class="el-menu-vertical-demo"
							@open="handleOpen"
							@close="handleClose"
							background-color="#545c64"
							text-color="#fff"
							active-text-color="#ffd04b">
						<el-menu-item index="1">
							<i class="el-icon-setting"></i>
							<span slot="title">gets</span>
							<router-link to="/gets"></router-link>
						</el-menu-item>
						<el-menu-item index="2">
							<i class="el-icon-setting"></i>
							<span slot="title">beads</span>
						</el-menu-item>
						<el-menu-item index="3">
							<i class="el-icon-setting"></i>
							<span slot="title">wbeads</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-setting"></i>
							<span slot="title">yyw</span>
						</el-menu-item>
						<el-menu-item index="5">
							<i class="el-icon-setting"></i>
							<span slot="title">suitshe</span>
						</el-menu-item>
						<el-menu-item index="6">
							<i class="el-icon-setting"></i>
							<span slot="title">set</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-container>
					<el-main><router-view></router-view></el-main>
					<el-footer>qjy 临时制作</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				appMsg: 'login msg'
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>


<style lang="less" scoped>
	.el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #545c64;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		height: 400px;
	}

	body > .el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>