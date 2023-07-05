import dict from './modules/dict'
import user from './modules/user'
import search from './modules/search'
import signature from './modules/signature'
import getters from './getters'

import vuexPersistedState from "./plugins/vuex-persistedstate"
// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import {createStore} from 'vuex'
const store = createStore({
// #endif
    plugins: [vuexPersistedState],
    modules: {
        dict, user, search, signature
    },

    state: {
        noMatchLeftWindow: true, // uni内置媒体查询 isPC控制leftWindow
        active: 'componentPage',//动态绑定组件名
        leftWinActive: '/pages/component/view/view',//当前$route.path

        activeOpen: '',
        menu: [],
    },
    mutations: {
        setMatchLeftWindow(state, matchLeftWindow) {
            state.noMatchLeftWindow = !matchLeftWindow
        },
        setActive(state, tabPage) {
            state.active = tabPage
        },
        setLeftWinActive(state, leftWinActive) {
            state.leftWinActive = leftWinActive
        },
        setActiveOpen(state, activeOpen) {
            state.activeOpen = activeOpen
        },
        setMenu(state, menu) {
            state.menu = menu
        },

    },
    actions: {
    },
    getters
})

export default store
