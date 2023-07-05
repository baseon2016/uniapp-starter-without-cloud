import $api from '@/common/api.js'
import crypto from '@/common/crypto.js'

const signature = {
    namespaced: true,
    state: {
        rKey: '',
        timeStmp: null,
        timeDiff: null,
        duration: null,
    },

    mutations: {
        SET_RKEY(state, provider) {
            state.rKey = provider;
        },
        SET_TIMESTAMP(state, provider) {
            state.timeStmp = provider;
        },
        SET_TIMEDIFF(state, provider) {
            state.timeDiff = provider;
        },
        SET_DURATION(state, provider) {
            state.duration = provider;
        },

    },
    actions: {
        GET_KEY({commit}) {
            return new Promise((resolve, reject) => {
                $api.getSignature(new Date().getDate()).then(res => {
                    commit('SET_RKEY', res.data.data);
                    let decodeKey = crypto.deCode(res.data.data);
                    let currentTime = Date.parse(new Date());
                    let serverTime = res.data.timestamp;
                    commit('SET_TIMESTAMP', currentTime);
                    commit('SET_TIMEDIFF', (serverTime - currentTime) / 1000);
                    commit('SET_DURATION', decodeKey.time);
                    resolve(decodeKey);
                })
            })
        }
    },
    getters: {
        RKEY(state) {
            return crypto.deCode(state.rKey)
        },
        TIMESTAMP(state) {
            return parseInt(state.timeStmp)
        },
        TIMEDIFF(state) {
            return parseInt(state.timeDiff)
        },
        DURATION(state) {
            return parseInt(state.duration)
        },
    }
}


export default signature
