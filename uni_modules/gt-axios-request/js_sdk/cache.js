import qs from 'qs'
export default class Cache {
  constructor (axios, config = {}) {
    this.axios = axios
    this.caches = []
    if (!this.axios) {
      throw new Error('请传入axios实例')
    }
    this.config = config
    this.defaultConfig = {
      showLoading: false,
      cache: false,
      expire: 100 * 1000
    }
    this.CancelToken = this.axios.CancelToken
    this.init()
  }
  init () {
    this.requestInterceptor(this.config.requestInterceptorFn)
    this.responseInterceptor(this.config.responseInterceptorFn)
    // window.onbeforeunload = () => {
    //   this.mapStorage()
    // }
  }
  requestInterceptor (callback) {
    this.axios.interceptors.request.use(async config => {
      let newConfig = callback && (await callback(config))
      config = newConfig || config
      let { url, data, params, cache = this.defaultConfig.cache, expire = this.defaultConfig.expire } = config
      if (cache === true) {
        let getKey = data ? `${url}?cacheParams=${JSON.stringify(data)}` : `${url}?cacheParams=${qs.stringify(params)}`
        let obj = this.getStorage(getKey)
        // 判断缓存数据是否存在
        if (obj) {
          let curTime = this.getExpireTime()
          let source = this.CancelToken.source()
          config.cancelToken = source.token
          // 判断缓存数据是否存在，存在的话是否过期，如果没过期就停止请求返回缓存
          if (curTime - obj.expire < expire) {
            source.cancel(obj)
          } else {
            this.removeStorage(url)
          }
        }
      } else {
        // this.clearStorage(url)
        this.removeStorage(url)
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
  }
  responseInterceptor (callback) {
    this.axios.interceptors.response.use(async response => {
      let newResponse = callback && (await callback(response))
      response = newResponse || response
      // the http request error, do not store the result, direct return result
      if (response.status !== 200) {
        return response
      }
      /*
       * `data` is the data to be sent as the request body, only applicable for request methods 'PUT', 'POST', and 'PATCH'
       * `params` are the URL parameters to be sent with the request, can be applicable for request methods 'GET'
       */
      let { url, cache, data, params } = response.config
      if (cache === true) {
        let obj = {
          expire: this.getExpireTime(),
          params,
          data,
          result: response.data
        }
        let setKey = data ? `${url}?cacheParams=${data}` : `${url}?cacheParams=${qs.stringify(params)}`
        this.caches.push(setKey)
        this.setStorage(setKey, obj)
      }
      return response.data
    }, async error => {
      let newError = callback && (await callback(newError))
      error = newError || error
      // 返回缓存数据
      if (this.axios.isCancel(error)) {
        return Promise.resolve(error.message.result)
      }
      return Promise.reject(error)
    })
  }

  // 设置缓存
  setStorage (key, cache) {
    uni.setStorageSync(key, cache)
  }

  // 获取缓存
  getStorage (key) {
    const data = uni.getStorageSync(key)
    return data
  }

  // 清除缓存
  removeStorage (key) {
    uni.removeStorageSync(key)
  }

  // 设置过期时间
  getExpireTime () {
    return new Date().getTime()
  }

  // 清空缓存
  clearStorage () {
    uni.clearStorageSync()
  }

  // 清空没用到的缓存
  mapStorage () {
    const res = uni.getStorageInfoSync()
    const length = res.keys.length
    if (length) {
      for (let i = 0; i < length; i++) {
        const key = res.keys[i]
        if (!this.caches.includes(key) && key.includes('?cacheParams=')) {
          uni.removeStorageSync(key)
        }
      }
    }
  }

}