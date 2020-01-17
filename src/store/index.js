import Vuex from 'vuex'
import Vue from 'vue'

Vue.use( Vuex )
let store = new Vuex.Store( {
	state: {
		listProductColleague: [ {
			"name": "李盛希",
			"group": "2",
			"groupName": "平台销售",
			"id": 1,
			"status": 0
		}, { "name": "伍妙芬", "group": "1", "groupName": "产品部", "id": 2, "status": 0 }, {
			"name": "杨定骋",
			"group": "1",
			"groupName": "产品组",
			"id": 3,
			"status": 0
		}, {
			"name": "黄彩婷",
			"group": "3",
			"groupName": "采购部",
			"id": 4,
			"status": 0
		} ],
		receives: [ { "name": "全建誉", "id": 0, "status": 1 } ],
		rtxReceives: [],
		sender: "系统机器人"
	},
	mutations: {
		changStatus( state, index ) {
			state.listProductColleague[ index ].status = !state.listProductColleague[ index ].status
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