import $api from '@/common/server-api/api';

export default function() {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, async function (widgetInfo) {
			let appVersion = plus.runtime;
			let currentVersion = appVersion.versionCode > wgtInfo.versionCode ? appVersion : wgtInfo;

			const res = await $api.checkAppUpdate();
			let data = res.data ? res.data : null;
			let onlineVersion = data.data && data.data.version;
			let {title, contents, version, is_mandatory, is_silently, url, platform, type} = onlineVersion;
			let result = {
				title, // 标题
				contents, // 升级内容
				version,//安装包版本
				is_mandatory, // 是否强制更新
				is_silently, // 是否静默更新
				url, // 安装包下载地址
				platform, // 安装包平台
				type // 安装包类型
			};
			if (currentVersion.versionCode >= onlineVersion.versionCode) {
				result.code = 0;
				result.message = '当前已经是最新版本了'
			} else{
				result.code = 1;
				result.message='app有新版本可以更新'
			};
			resolve({result});
		});
	})
	// #endif
	// #ifndef APP-PLUS
	return new Promise((resolve, reject) => {
		reject({
			message: '请在App中使用'
		})
	})
	// #endif
}
