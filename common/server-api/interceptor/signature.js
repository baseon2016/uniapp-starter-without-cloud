import crypto from './crypto'
import $store from '@/store';
import $uniapi from '@/common/uniapi';

import {signatureWhiteList} from "@/common/config-center";

// 接口获取签名中状态
let FLAG = false

async function signature(options) {
	// 签名信息阻塞
	let times = 20, wait = 400;
	function getFlagDelay() {
		setTimeout(function () {
			if (!FLAG) {
				return getLocalKey();
			} else if (times > 0) {
				times--
				getFlagDelay()
			} else {
				return false
			}
		}, wait)
	}

	// 验签拦截器
	// 白名单
	let d = new Date().getDate();
	const defaultWhiteList = [`/rt/k/${d}`];
	const whiteList = defaultWhiteList.concat(signatureWhiteList);
	if (!whiteList.some(item => item == options.url)) {
		let signature;
		if (FLAG) {
			signature = await getFlagDelay()
		} else {
			signature = await getLocalKey();
		}
		options.header = options.header || {}
		Object.assign(options.header, signature)
	}

	return options;
}

// 	请求验签辅助功能--------------------------------------------------------------
async function getLocalKey(){
	let app_storage = $uniapi.storageGetjson("app_storage") || '';
	let rKey, timeStmp, duration;
	if(app_storage.signature && app_storage.signature.rKey){
		rKey = crypto.deCode(app_storage.signature.rKey);
		timeStmp = app_storage.signature.timeStmp;
		duration= app_storage.signature.duration;
	}

	let now = Date.parse(new Date());
	let rst ;
	if(rKey && timeStmp && duration && now<(timeStmp+duration*1000)){
		rst = crypto.enCode(rKey)
	}else{
		FLAG = true;
		let res_decoded = await $store.dispatch('signature/GET_KEY');
		rst = crypto.enCode(res_decoded);
		FLAG = false;
	}
	return rst
}

export default signature;

