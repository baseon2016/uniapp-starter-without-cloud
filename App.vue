<script>
  import initApp from '@/common/appInit.js';
  import openApp from '@/common/openApp.js';
  // #ifdef H5
  openApp() //h5端全局悬浮下载app的功能
  // #endif
  import checkIsAgree from '@/pages/uni-agree/utils/uni-agree.js';
  import uniIdPageInit from '@/pages/uni-id-pages/init.js';
	export default {
    globalData: {
      searchText: '',
      appVersion: {},// app版本
      config: {},// 应用配置
      $i18n: {},// 语言选择
      $t: {} // 语言包字典

    },
		onLaunch: function() {

			console.log('App Launch');
      this.globalData.$i18n = this.$i18n;
      this.globalData.$t = str => this.$t(str);

      initApp();
      uniIdPageInit()

      // #ifdef APP-PLUS
      //checkIsAgree(); APP端暂时先用原生默认生成的。目前，自定义方式启动vue界面时，原生层已经请求了部分权限这并不符合国家的法规
      // #endif

      // #ifdef H5
      // checkIsAgree(); // 默认不开启。目前全球，仅欧盟国家有网页端同意隐私权限的需要。如果需要可以自己去掉注视后生效
      // #endif

			// #ifdef APP-PLUS
      //idfa有需要的用户在应用首次启动时自己获取存储到storage中
      /*var idfa = '';
      var manager = plus.ios.invoke('ASIdentifierManager', 'sharedManager');
      if(plus.ios.invoke(manager, 'isAdvertisingTrackingEnabled')){
        var identifier = plus.ios.invoke(manager, 'advertisingIdentifier');
        idfa = plus.ios.invoke(identifier, 'UUIDString');
        plus.ios.deleteObject(identifier);
      }
      plus.ios.deleteObject(manager);
      console.log('idfa = '+idfa);*/
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},

		methods: {
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
  @import '@/common/css/uni.css';
	@import '@/static/customicons.css';

	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}

	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */

	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}

	/* #endif */

	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #efeff4;
		height: 100%;
		font-size: 28rpx;
		/* line-height: 1.8; */
	}

	.fix-pc-padding {
		padding: 0 50px;
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	/* #endif*/
</style>
