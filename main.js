import App from './App'
import store from './store'
import api from './common/server-api/api'
import dict from './common/dict';
import download from './common/server-api/download'
import uniapi from './common/uniapi'
import i18n from './lang/i18n'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$dict = dict
Vue.prototype.$download = download
Vue.prototype.$uniapi = uniapi

Vue.prototype.$adpid = "" //uni广告id
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
App.mpType = 'app'
const app = new Vue({
	store,
	i18n,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store);
	app.use(api);
	app.use(dict);
	app.use(download);
	app.use(uniapi);
	app.use(i18n);
	app.config.globalProperties.$adpid = "" //uni广告id
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	}
	return {
		app
	}
}
// #endif
