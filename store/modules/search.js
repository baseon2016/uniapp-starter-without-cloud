import {arrayUtils} from "@/common/util";

const search = {
    namespaced: true,
    state: {
        searchText: '',//关键字
        localSearchListKey: [],//本地历史搜索记录

    },

    mutations: {

        SET_SEARCHTEXT: (state, text) => {
            state.searchText = text
        },
		CLEAR_SEARCHTEXT: (state) => {
			state.searchText = '';
		},
        SET_LOCALSEARCHLIST: (state, word) => {
            if (state.localSearchListKey.length) {
                state.localSearchListKey.unshift(word);
                state.localSearchListKey = arrayUtils.arrUnique(state.localSearchListKey);
                if (state.localSearchListKey.length > 20) {
                    state.localSearchListKey.pop();
                }
            } else {
                state.localSearchListKey = [word];
            }
        },
        DEL_LOCALSEARCHLIST: (state, index) => {
            state.localSearchListKey.splice(index, 1)
        },
        CLEAR_LOCALSEARCHLIST: (state) => {
            state.localSearchListKey = []
        },



    },

    actions: {}
}

export default search
