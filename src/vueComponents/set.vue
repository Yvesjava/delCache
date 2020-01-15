<template>
	<el-table :data="$store.state.listProductColleague.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" stripe>
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
</template>

<script>
	export default {
		data() {
			return {
				search: ''
			}
		},
		methods: {
			handleDelete( index, row ) {
				this.$store.commit("changStatus",index)
				console.log(this.$store.getters.getRtxReceives);
				console.log(this.$store.getters.getRtxReceivesName);
			}
		},
		name: "set"
	}
</script>

<style lang="less" scoped>

</style>