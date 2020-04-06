<template>
	<div>
		<el-table :data="$store.state.listProductColleague.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)" current-row-key="id" style="width: 100%" stripe>
			<el-table-column label="ID" prop="id"></el-table-column>
			<el-table-column label="Name" prop="name"></el-table-column>
			<el-table-column label="Status" prop="status">
				<template slot-scope="scope">
					<el-tag :type="scope.row.status ? 'success' : 'warning'">{{ scope.row.status ? '发送' : '无' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
				</template>
				<template slot-scope="scope">
					<el-button size="mini" :type="scope.row.status ? 'warning' : 'success'" @click="handleDelete(scope.$index, scope.row)">{{ scope.row.status ? '取消' : '选择' }}</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页器 -->
		<div class="block" style="margin-top:15px;">
		<el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="page_sizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="$store.state.listProductColleague.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).length">
		</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: '',
				currentPage: 1, // 当前页码
				total: 20, // 总条数
				pageSize: 12, // 每页的数据条数
				page_sizes: [6,12,18,24] // 每页的数据条数
			}
		},
		methods: {
			handleDelete( index, row ) {
				this.$store.commit("changStatus",row.id)
				console.log(this.$store.getters.getRtxReceives);
				console.log(this.$store.getters.getRtxReceivesName);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.currentPage = 1;
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
			},
		},
		name: "set"
	}
</script>

<style lang="less" scoped>
	.el-table{
		/*overflow-y: auto;*/
		/*height: 800px;*/
		/*width: 98%;*/
	}
</style>