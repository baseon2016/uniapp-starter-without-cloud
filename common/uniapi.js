
const uniapi = {
	/**
	 * 弹出消息
	 * @param content 内容
	 * @param time 显示时长
	 */
	toast(content, time = 3000) {
		uni.showToast({
			icon: 'none',
			title: content,
			duration: time
		});
	},
	/**
	 * 弹出Loading
	 * @param content 加载时文字
	 * @param time 显示时长
	 */
	showLoading(content = "加载数据中...", mask = true) {
		uni.showLoading({
			title: content,
			mask: mask
		});
	},
	/**
	 * 关闭Loading
	 * @param timer 显示时长
	 *
	 */
	hideLoading(timer = 0) {
		if (timer > 0) {
			var t = setTimeout(function() {
				uni.hideLoading();
				clearTimeout(t);
			}, timer);
		} else {
			uni.hideLoading();
		}
	},

	/**
	 * 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
	 */
	navigateTo(url, params) {
		uni.navigateTo({
			url: parseUrl(url, params)
		})
	},

	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 */
	redirectTo(url, params) {
		uni.redirectTo({
			url: parseUrl(url, params)
		});
	},

	/**
	 * 关闭所有页面，打开到应用内的某个页面。
	 */
	reLaunch(url, params) {
		uni.reLaunch({
			url: parseUrl(url, params)
		});
	},

	/**
	 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
	 */
	switchTab(url, params) {
		uni.switchTab({
			url: parseUrl(url, params)
		});
	},

	/**
	 * 关闭当前页面，返回上一页面或多级页面
	 */
	navigateBack(delta) {
		uni.navigateBack({
			delta: delta
		});
	},

	/**
	 * 预加载页面，是一种性能优化技术。被预载的页面，在打开时速度更快。
	 */
	preloadPage() {
		uni.preloadPage({
			url: parseUrl(url, params)
		});
	},

	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		// #ifdef H5
		return prePage;
		// #endif
		return prePage.$vm;
	},
	/**
	 * px和rpx 单位转化
	 * @param rpx(px)
	 * @returns {number} 转化结果
	 */
	// rpx转px
	rpxToPx(rpx) {
		return uni.upx2px(num);
	},

	// px转rpx
	pxToRpx(px) {
		const screenWidth = uni.getSystemInfoSync().screenWidth
		return (750 * Number.parseInt(px)) / screenWidth
	},

	/**
	 * 获取窗口的宽高
	 */
	getWindow() {
		const info = uni.getSystemInfoSync();
		return {
			w: info.windowWidth,
			h: info.windowHeight
		};
	},

	storageSet(name, value) {
		uni.setStorageSync(name, value);
	},
	storageSetjson(name, value) {
		uni.setStorageSync(name, JSON.stringify(value));
	},
	storageGet(name) {
		return uni.getStorageSync(name);
	},
	storageGetjson(name) {
		const content = uni.getStorageSync(name);
		if (!content) {
			return null;
		}
		return JSON.parse(content);
	},
	storageRemove(name) {
		uni.removeStorageSync(name);
	},
	storageClear() {
		uni.clearStorageSync();
	}

}

function parseUrl(url, params) {
	let arr = [];
	let string = '';
	for (let i in params) {
		arr.push(i + "=" + params[i]);
	}
	string = "/pages/" + url;
	if (arr.length > 0) {
		string += "?" + arr.join("&");
	}
	return string;
}

export default uniapi;
