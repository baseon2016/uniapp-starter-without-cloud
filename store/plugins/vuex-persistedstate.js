import createPersistedState from 'vuex-persistedstate'

const vuexPersistedState = new createPersistedState({
	key: 'app_storage',
	storage: {
		getItem: key => uni.getStorageSync(key),
		setItem: (key, value) => uni.setStorageSync(key, value),
		removeItem: key => uni.removeStorageSync(key)
	},

	paths: [
		'user.userInfo',
		'user.hasLogin',
		'user.appToken',
		'user.roles',
		'user.permissions',
		'search.searchVisitor',
		'search.localSearchListKey',
		'search.visitor',
		'signature'
	],

})
export default vuexPersistedState

