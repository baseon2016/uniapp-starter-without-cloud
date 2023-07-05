/*
 * @Author: GaoTang
 * @Company: ShineSoft
 * @Date: 2021-07-19 19:49:01
 * @LastEditors: GaoTang
 * @LastEditTime: 2021-07-19 23:33:54
 * @FilePath: \tpl-uni-https\api\install.js
 * @Email: qq23745038@126.com
 */
import * as http from './base'

export const install = function (Vue, config = {}) {
  Vue.prototype.$http = http
}
