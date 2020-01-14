let unique = function(arr){
	return Array.from(new Set(arr))
}

let isIntNum = function(val) {
	let regPos = /^([1-9]\d*|[0]{1,1})$/ // 非负整数
	if (regPos.test(val)) {
		return true
	} else {
		return false
	}
}

let listProductColleague = function () {
	return ["李盛希", "yyyyyyyy", "xxxxxxxx", "wwwwwwww", "vvvvvvvv"]
}


export default {
	unique,
	isIntNum,
	listProductColleague
}