import Vuex from 'vuex'
import Vue from 'vue'

Vue.use( Vuex )
let store = new Vuex.Store( {
	state: {
		listProductColleague: [ {
			"name": "李盛希",
			"group": "2",
			"groupName": "平台翻译组",
			"id": 2626,
			"status": 1
		}, { "name": "伍妙芬", "group": "1", "groupName": "核计组", "id": 2715, "status": 0 }, {
			"name": "杨定骋",
			"group": "1",
			"groupName": "编辑组",
			"id": 3937,
			"status": 0
		}, {
			"name": "黄彩婷",
			"group": "3",
			"groupName": "采购员",
			"id": 2847,
			"status": 0
		}, {
			"name": "陈子丰",
			"group": "3",
			"groupName": "采购部",
			"id": 2612,
			"status": 0
		}, {
			"name": "罗诗韵",
			"group": "3",
			"groupName": "平台销售",
			"id": 3093,
			"status": 0
		}, {
			"name": "祁彦红",
			"group": "3",
			"groupName": "采购部",
			"id": 2033,
			"status": 0
		}, {
			"name": "招卓宏",
			"group": "3",
			"groupName": "采购部",
			"id": 3912,
			"status": 0
		}, {
			"name": "苏泽佳",
			"group": "3",
			"groupName": "采购部",
			"id": 2009,
			"status": 0
		}, {
			"name": "黄华梅",
			"group": "3",
			"groupName": "采购部",
			"id": 3437,
			"status": 0
		}, {
			"name": "梁建梅",
			"group": "3",
			"groupName": "采购部",
			"id": 3822,
			"status": 0
		}, {
			"name": "林佩云",
			"group": "3",
			"groupName": "采购部",
			"id": 1031,
			"status": 0
		}, {
			"name": "黄晓容",
			"group": "3",
			"groupName": "采购部",
			"id": 3344,
			"status": 0
		}, {
			"name": "邓丽莉",
			"group": "3",
			"groupName": "采购部",
			"id": 3733,
			"status": 0
		}, {
			"name": "朱贵镇",
			"group": "3",
			"groupName": "采购部",
			"id": 1257,
			"status": 0
		}, {
			"name": "何宗蔚",
			"group": "3",
			"groupName": "采购部",
			"id": 3816,
			"status": 0
		}, {
			"name": "陈佳丽",
			"group": "3",
			"groupName": "外贸部",
			"id": 3791,
			"status": 0
		}, {
			"name": "林佩兰",
			"group": "3",
			"groupName": "外贸部",
			"id": 1336,
			"status": 0
		}, {
			"name": "黄思",
			"group": "3",
			"groupName": "外贸部",
			"id": 3814,
			"status": 0
		}, {
			"name": "肖海燕",
			"group": "3",
			"groupName": "外贸部",
			"id": 1285,
			"status": 0
		}, {
			"name": "梁建梅",
			"group": "3",
			"groupName": "外贸部",
			"id": 3822,
			"status": 0
		}, {
			"name": "林翠霞",
			"group": "3",
			"groupName": "外贸部",
			"id": 3897,
			"status": 0
		}, {
			"name": "尹冬月",
			"group": "3",
			"groupName": "采购部",
			"id": 1687,
			"status": 0
		}, {
			"name": "舒振",
			"group": "3",
			"groupName": "采购部",
			"id": 2418,
			"status": 0
		}, {
			"name": "陈镇泉",
			"group": "3",
			"groupName": "总裁",
			"id": 1005,
			"status": 0
		}, {
			"name": "陈婷",
			"group": "3",
			"groupName": "网络营销",
			"id": 3213,
			"status": 0
		}, {
			"name": "黄嘉伟",
			"group": "3",
			"groupName": "网络营销",
			"id": 3226,
			"status": 0
		}, {
			"name": "胡家宜",
			"group": "3",
			"groupName": "网络营销",
			"id": 3945,
			"status": 0
		}, {
			"name": "刘佳佳",
			"group": "3",
			"groupName": "采购部",
			"id": 1009,
			"status": 0
		}, {
			"name": "陈思诚",
			"group": "3",
			"groupName": "采购部",
			"id": 1319,
			"status": 0
		}, {
			"name": "周文宁",
			"group": "3",
			"groupName": "采购部",
			"id": 2790,
			"status": 0
		}, {
			"name": "邱泽邦",
			"group": "3",
			"groupName": "采购部",
			"id": 2683,
			"status": 0
		}, {
			"name": "白如轲",
			"group": "3",
			"groupName": "产品部",
			"id": 3960,
			"status": 0
		}, {
			"name": "苏泽敏",
			"group": "3",
			"groupName": "采购部",
			"id": 2128,
			"status": 0
		} ],
		receives: [ { "name": "全建誉", "id": 0, "status": 1 } ],
		rtxReceives: [],
		sender: "系统机器人"
	},
	mutations: {
		changStatus( state, index ) {
			state.listProductColleague.map((item,i) => {
				if (item.id === index) {
					item.status = !item.status
				}
			})
		}
	},
	getters: {
		getRtxReceives: state => {
			return state.listProductColleague.filter( data => {
				return data.status
			} ).concat( state.receives )
		},
		getRtxReceivesName: state => {
			return state.listProductColleague.filter( data => {
				return data.status
			} ).concat( state.receives ).map( ( item, index ) => {
				return item.name
			} ).join(';')
		},
		getDefaultReceivesName:state => {
			return state.receives.filter( data => {
				return data.status
			} ).map( ( item, index ) => {
				return item.name
			} ).join(';')
		}
	}
} )
export default store