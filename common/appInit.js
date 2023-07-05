import uniStarterConfig from '@/uni-starter.config.js';
//应用初始化页
// #ifdef APP-PLUS
import checkUpdate from '@/pages/uni-upgrade-center-app/utils/check-update';
import callCheckVersion from '@/pages/uni-upgrade-center-app/utils/call-check-version';

// 实现，路由拦截。当应用无访问摄像头/相册权限，引导跳到设置界面
import interceptorChooseImage from '@/uni_modules/json-interceptor-chooseImage/js_sdk/main.js';
interceptorChooseImage()
// #endif
export default async function() {
	const debug = uniStarterConfig.debug;

	// uniStarterConfig挂载到getApp().globalData.config
	setTimeout(() => {
		getApp({ allowDefault: true }).globalData.config = uniStarterConfig;
	}, 1)

	// #ifdef APP-PLUS
	// 初始化appVersion（仅app生效）
	initAppVersion();
	// 监听并提示设备网络状态变化
	uni.onNetworkStatusChange(res => {
		console.log(res.isConnected);
		console.log(res.networkType);
		if (res.networkType != 'none') {
			uni.showToast({
				title: '当前网络类型：' + res.networkType,
				icon: 'none',
				duration: 3000
			})
		} else {
			uni.showToast({
				title: '网络类型：' + res.networkType,
				icon: 'none',
				duration: 3000
			})
		}
	});
	// #endif

}
/**
 * // 初始化appVersion
 */
function initAppVersion() {
	// #ifdef APP-PLUS
	let appid = plus.runtime.appid;
	plus.runtime.getProperty(appid, (wgtInfo) => {
		let appVersion = plus.runtime;
		let currentVersion = appVersion.versionCode > wgtInfo.versionCode ? appVersion : wgtInfo;
		getApp({
			allowDefault: true
		}).appVersion = {
			...currentVersion,
			appid,
			hasNew: false
		}
		// 检查更新小红点
		callCheckVersion().then(res => {
			// console.log('检查是否有可以更新的版本', res);
			if (res.code > 0) {
				// 有新版本
				getApp({
					allowDefault: true
				}).appVersion.hasNew = true;
				console.log(checkUpdate());
			}
		})
	});
	// 检查更新
	// #endif
}
