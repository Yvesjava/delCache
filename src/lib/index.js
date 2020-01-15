export default {
	unique: arr => {
		return Array.from( new Set( arr ) )
	},
	isIntNum: val => {
		return /^([1-9]\d*|[0]{1,1})$/.test( val )
	}
}