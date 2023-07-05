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
    if (config.showLoading) uni.hideLoading()
    return res
  }, err => {
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
    if (config.showLoading) uni.hideLoading()
    return res
  }, err => {
    if (config.showLoading) uni.hideLoading()
    return Promise.reject(err)
  })
}