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
		that.$axios.post("/rtx",{
			'sender': sender,
			'receivers': receives,
			'msg': msg
		})
	},
	/**
	 * 简单请求方法,只提供url,即可完成请求,无需其他参数
	 * @param that vue实例
	 * @param url 请求url
	 * @param msg 成功的提示消息
	 */
	simpleGet: (that, url,msg) => {
		that.$axios.get(url).then(res => {
			if (res.status === 200) {
				if (res.data.indexOf("permission") < 0) {
					// 成功了
					that.$index.successRtx(that,msg+"成功:\n\t" + res.data)
				} else {
					// 没有权限,ip限制了
					that.$notify({
						title: '错误',
						message: res.data
					})
					that.$index.failRtx(that, msg+"失败,错误信息:\n\t" + res.data)
				}
			} else {
				that.$notify({
					title: '错误',
					message: "网络错误,请求失败"
				})
				that.$index.failRtx(that,  msg+"失败,错误:\n\t请求错误,请检查后再试")
			}
		})
	},
	/**
	 * 发送失败rtx消息
	 * @param that vue实例
	 * @param msg 消息文字
	 */
	failRtx: (that,msg) => {
		that.$index.postRtx(that, that.$store.getters.getDefaultReceivesName, msg)
	},
	/**
	 * 发送成功rtx消息
	 * @param that vue实例
	 * @param msg 消息文字
	 */
	successRtx:(that,msg)=>{
		that.$index.postRtx(that, that.$store.getters.getRtxReceivesName, msg)
	},
	/**
	 * 传入url,判断条件(字符串数组),如果返回结果中有字符串数组中的值,则为失败
	 * @param that vue实例
	 * @param url 请求url
	 * @param testConditions 判断条件
	 * @returns {Promise<void>}
	 */
	delCacheItemSync:async (that,url,testConditions)=>{
		await that.$axios.get(url).then(res => {
			return (res.status === 200) ? (testConditions.every((item,i) => (res.data.indexOf(item) < 0))) : false
		})
	},
	delCacheItem:(that,url)=>{return that.$axios.get(url)}

}