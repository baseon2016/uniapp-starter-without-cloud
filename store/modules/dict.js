import $api from '@/common/server-api/api';
import {setItems} from '@/common/items';
import {arrayUtils} from '@/common/util';

const state = {
    dict: new Array(),
    loading: new Map(),

}
const mutations = {
    SET_DICT: (state, {key, value}) => {
        if (key !== null && key !== "") {
            state.dict.push({
                key: key,
                value: value
            })
        }
    },
    REMOVE_DICT: (state, key) => {
        try {
            for (let i = 0; i < state.dict.length; i++) {
                if (state.dict[i].key == key) {
                    state.dict.splice(i, i)
                    return true
                }
            }
        } catch (e) {
        }
    },
    CLEAR_DICT: (state) => {
        state.dict = new Array()
    },

    SET_LOADING: (state, item) => {
        if (item !== null && item !== "") {
            state.loading.set(item.key, item.loading);
        }
    },
    REMOVE_LOADING: (state, key) => {
        if (key !== null && key !== "") {
            state.loading.delete(key)
        }
    },
    CLEAR_LOADING: (state) => {
        state.loading.clear()
    },

}

const actions = {

    // 接口服务查询字典
    getDictAsync({commit,state},type) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',{key:type, loading: true})
            switch (type) {
                case 'deptOptions':
                    $api.getDeptsAll().then(res => {
                        if (res.data.code === 200) {
                            const list = setItems(res, 'deptId', 'deptName')
                            commit('SET_DICT', {key: type, value: list})
                            commit('SET_LOADING',{key:type, loading: false})
                            let rst = arrayUtils.searchArrayByKey(state.dict, type)
                            resolve(rst.value);
                        }
                    });
                    break;
                default:
                    this.$api.getDicts(type).then(res => {
                        if (res.data.code === 200) {
                            const list = setItems(res, 'dictValue', 'dictLabel')
                            commit('SET_DICT', {key: type, value: list})
                            commit('SET_LOADING',{key:type, loading: false})
                            let rst = arrayUtils.searchArrayByKey(state.dict, type)
                            resolve(rst.value);
                        }
                    });
                    break;
            }
        })
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}

