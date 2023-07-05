import {
	pathToBase64,
	base64ToPath
} from 'image-tools';
export const mixin = {
	data() {
		return {
			iStatusBarHeight: 0,
			userInfo: {},
			imgDomain: '',
			noClick:true,
			clipboardText: '',
			
			// 下载保存图片
			downloadImgSrc: '',
			base64ImgUrl: '',


			
			wxPopupShow: false,
			popupShow: false,
		}
	},
	onLoad() {
		// this.getImgDomain();
		// this.initUserInfo();
		this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
	},
	onShow() {
		// this.initUserInfo();
	},
	created() {
	},
	mounted() {
	},
	methods: {
		// 防止处理多次点击
		noMultipleClicks(methods, info, time = 2000) {
			// methods是点击后需要执行的函数， info是函数需要传的参数
			let that = this;
			if (that.noClick) {
				// 第一次点击
				that.noClick = false;
				if ((info && info !== '') || info == 0) {
					// info是执行函数需要传的参数
					methods(info);
				} else {
					methods();
				}
				setTimeout(() => {
					that.noClick = true;
				}, time)
			} else {
				//  这里是重复点击的判断
				that.$u.toast('操作太快，请稍后再试~');
			}
		},
		
		async getImgDomain() {
			const res = await this.$api.getImgDomain({})
			if (res.data.code == 1) {
				if (!this.$u.test.empty(res.data.data)) {
					this.imgDomain = res.data.data;
				}
			} else {
				this.$u.toast(res.data.msg);
			}
		},
		//初始化用户信息
		initUserInfo() {
			if (!this.$store.getters.hasLogin) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return false;
			}
			this.userInfo = this.$storage.getJson('app_config_data').userInfo || {};
		},

		//复制文字
		copyText() {
			let _this = this;
			uni.setClipboardData({
				data: _this.clipboardText, // e是需要设置的内容
				success: function() {
					_this.$u.toast('复制成功')
				}
			});
		}
		
	}
}
