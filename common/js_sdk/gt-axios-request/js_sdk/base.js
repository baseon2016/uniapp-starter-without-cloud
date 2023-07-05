/*
 * @Author: GaoTang
 * @Company: ShineSoft
 * @Date: 2021-07-19 19:49:01
 * @LastEditors: GaoTang
 * @LastEditTime: 2021-07-19 23:33:27
 * @FilePath: \tpl-uni-https\api\base.js
 * @Email: qq23745038@126.com
 */
import axios from './config'

export const post = (url, data, extend = { cache: false }) => {
  let defaultConfig = {
    url,
    method: 'POST',
    data: data
  }
  let config = { ...defaultConfig, ...extend }
  if (config.showLoading) {
    uni.showLoading({
      title: '加载中...',
      mask: true
    })
  }
  return axios(config).then(res => {
    successState(res);
    if (config.showLoading) uni.hideLoading()
    return res
  }, err => {
    errorState(err);
    if (config.showLoading) uni.hideLoading()
    return Promise.reject(err)
  })
}

export const get = (url, data, extend = { cache: false }) => {
  let defaultConfig = {
    url,
    method: 'GET',
    params: data
  }
  let config = { ...defaultConfig, ...extend }
  if (config.showLoading) {
    uni.showLoading({
      title: '加载中...',
      mask: true
    });
  }
  return axios(config).then(res => {
    successState(res);
    if (config.showLoading) uni.hideLoading()
    return res
  }, err => {
    errorState(err);
    if (config.showLoading) uni.hideLoading()
    return Promise.reject(err)
  })
}

// 封装数据返回成功提示函数------------------------------------------------------
function successState(res) {
  let code = res.data.code;
  // 401 为未授权/授权过期
  // 403 权限不足 访问受限
  // if (code === 403 || code == 401) {
  //   store.commit('user/LOGOUT') // 清除本地token
  //   // 关闭所有页面返回到登录页
  //   uni.reLaunch({
  //     url: '/pages/login/login'
  //   })
  // }
  //公共报错提醒
  if (code !== 200) {
    // 非成功状态码弹窗
    uni.showToast({
      icon: 'error',
      title: 'api服务错误',
    });
  }
}
// 封装数据返回失败提示函数------------------------------------------------------
function errorState(err) {
  // 请求失败弹窗
  uni.showToast({
    icon: 'error',
    title: '服务器错误',
  });
}
