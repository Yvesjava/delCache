export default {
	/**
	 * 数组去重
	 * @param arr 操作数组
	 * @returns {any[]}
	 */
	unique: arr => {
		return Array.from(new Set(arr))
	},
	/**
	 * 判断是否是数字
	 * @param val 传入参数
	 * @returns {boolean}
	 */
	isIntNum: val => {
		return /^([1-9]\d*|[0]{1,1})$/.test(val)
	},
	/**
	 * 发送rtx请求
	 * @param that vue实例
	 * @param receives 收信人
	 * @param msg 消息文字
	 */
	postRtx: (that, receives, msg) => {
		let sender = that.$store.state.sender
		that.$axios.post("/rtx", {
			'sender': sender,
			'receivers': receives,
			'msg': msg
		})
	},
	/**
	 * 简单请求方法,只提供url,即可完成请求,无需其他参数
	 * @param that vue实例
	 * @param item
	 */
	simpleGet:async (that, item) => {
		item.processing = true
		await that.$axios.get(item.url).then(res => {
			if (res.status === 200) {
				if (item.testConditions.every(s => (res.data.indexOf(s) < 0))) {
					// 成功了
					that.$notify({
						title: '成功',
						message: res.data,
						type: 'success'
					})
					that.$index.successRtx(that, item.msg + "\n" + res.data)
				} else {
					// 没有权限,ip限制了
					that.$notify({
						title: '错误',
						message: res.data,
						type: 'fail'
					})
					that.$index.failRtx(that, item.msg + "失败,错误信息:\n" + res.data)
				}
			} else {
				that.$notify({
					title: '错误',
					message: "网络错误,请求失败",
					type: 'fail'
				})
				that.$index.failRtx(that, item.msg + "失败,错误:\n\t请求错误,请检查后再试")
			}
		})
		item.processing = false
	},
	/**
	 * 发送失败rtx消息
	 * @param that vue实例
	 * @param msg 消息文字
	 */
	failRtx: (that, msg) => {
		that.$index.postRtx(that, that.$store.getters.getDefaultReceivesName, msg)
	},
	/**
	 * 发送成功rtx消息
	 * @param that vue实例
	 * @param msg 消息文字
	 */
	successRtx: (that, msg) => {
		that.$index.postRtx(that, that.$store.getters.getRtxReceivesName, msg)
	},
	/**
	 * 删除需要传入参数的缓存方法
	 * @param that vue实例
	 * @param item 对应的数组
	 * @param sucMsg 成功的rt消息字符串
	 * @returns {Promise<void>}
	 */
	delItems: async (that,item, sucMsg) => {
		let _that = that
		item.processing = true
		await Promise.all(_that.$index.unique(item.ids.split(',')).map(async id => {
			_that.$index.isIntNum(id) && await _that.$axios.get(item.url).then(res => {
				if ((res.status === 200) ? (item.testConditions.every(s => (res.data.indexOf(s) < 0))) : false) {
					item.successIds.push(id)
					_that.$notify({
						title: '成功',
						message: res.data,
						type: 'success'
					})
				} else {
					_that.$notify({
						title: '失败',
						message: res.data,
						type: 'fail'
					})
				}
			})
		}))
		item.successIds.length > 0 && _that.$index.successRtx(_that, sucMsg + "[" + item.successIds.join(',') + "]")
		item.processing = false
		item.successIds = []
	}
}