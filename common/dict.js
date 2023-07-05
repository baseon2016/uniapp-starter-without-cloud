"use strict"

import {arrayUtils} from '@/common/util';
import $store from '@/store';

/**
 * 查询异步状态（递归）
 * @params times 查询次数
 * @params wait 单词延迟（毫秒）
 */
function getFlagDelay(type, times = 20, wait = 400) {
    if (!type) {
        return null
    }
    let loading = $store.getters['dictLoading'].get(type);
    return new Promise((resolve, reject) => {
        function innerFunc() {
            setTimeout(() => {
                if (!loading) {
                    resolve(true)
                } else if (times > 0) {
                    times--
                    innerFunc()
                } else {
                    uni.$u.toast('网络延迟,请检查')
                    resolve(false)
                }
            }, wait)
        }

        innerFunc()
    })

}

async function getDict(type) {
    if (!type) {
        return null
    }
    let dict = $store.getters['dict'];
    // 本地存储不需要接口获取
    let search = arrayUtils.searchArrayByKey(dict, type)
    if (search) {
        return search.value;
    }
    // 本地不存在需要接口获取
    else {
        // 查询状态
        const ready = await getFlagDelay(type);
        if (ready) {
            // 核查本地是否已存在
            let search2 = arrayUtils.searchArrayByKey(dict, type)
            if (search2) {
                return search2.value;
            }
            // 字典接口服务
            else {
                return $store.dispatch('dict/getDictAsync', type);
            }
        }
    }
}
export default getDict
