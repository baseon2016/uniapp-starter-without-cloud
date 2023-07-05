# gt-axios-request

#### 介绍

根据 axios 封装的 request 网络请求

一个 request 插件,支持拦截器、Promise、缓存、加载动画

## uni-axios

使用 axios 封装 request 网络请求库

## 安装

1. 使用 HBuilderX 导入插件或者下载压缩包把文件解压到 js_sdk 目录下
2. 在@/uni_modules/gt-axios-request/目录下, 安装 axios
   `npm install`

## 使用方式：

```
1、[添加uni_modules插件](https://uniapp.dcloud.io/uni_modules?id=%e4%bd%bf%e7%94%a8-uni_modules-%e6%8f%92%e4%bb%b6)gt-axios-request到指定的项目

2. 修改config.js中的API接口 如下:
'@/uni_modules/gt-axios-request/js_sdk/config.js'
axios.defaults.baseURL = '你要修改的服务器地址' 

3、在项目的main.js文件中引入install.js 如下:
// 引入 gt-axios-request
import { install as http } from '@/uni_modules/gt-axios-request/js_sdk/install.js'
Vue.use(http)

4. api/index.js 如下:
export const TEST_DATA = '/game/list'
export const GAME_DATA = '/game/data'

5、在pages文件中直接使用 如下:
import { GAME_DATA, TEST_DATA } from 'api'

receiveCMS() {
	const data = {
		"Page": 1,
		"Limit": 10
	}
	this.$http.post(TEST_DATA, data, { showLoading: true }).then(res => {
		console.log("🚀 ~ file: index.vue ~ line 33 ~ this.$http.post ~ res", res)
	})
},
async receiveCMSAsync() {
	const data = {
		"Page": 1,
		"Limit": 10
	}
	const res = await this.$http.post(TEST_DATA, data)
	console.log("🚀 ~ file: index.vue ~ line 43 ~ receiveCMSAsync ~ res", res)
},
receiveMember() {
	// 开启缓存，设置缓存时间为一个小时，缓存的模式为localStorage
	const data = {}
	this.$http.get(GAME_DATA, data).then(res => {
		console.log("🚀 ~ file: index.vue ~ line 47 ~ this.$http.get ~ res", res)
	})
},
async receiveMemberAsync() {
	// 开启缓存，设置缓存时间为一个小时，缓存的模式为localStorage
	const data = {}
	const res = await this.$http.get(GAME_DATA, data, { showLoading: true, cache: true, expires: 1000 * 60 * 60 })
	console.log("🚀 ~ file: index.vue ~ line 54 ~ receiveMemberAsync ~ res", res)
}
```

## 
