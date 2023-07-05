# uni-app 生产项目框架

## 配置文件
    `uni-starter.config.js` 应用产品配置文件
    `/common/config-center.js` 业务配置文件
    `/common/appInit.js` app初始化文件
    `uni.scss` 样式变量配置文件
## 目录结构
    `/common`   js文件
    `/component` 全局组件
    `/hybrid`   本地html(webview加载失败，可显示本地html内容) 
    `/lang` 多语言包功能
    `/pages`    页面内容
    `/platforms`    app平台专用页面或组件
    `/static`    静态资源内容
    `/store`    uniapp内置vuex
    `/uni_modules`  uniapp 市场组件
    `/uts`  uniapp框架专用uts语言插件
    `/windows`  自定义窗口,pc窗口尺寸较大时
    `/wxcomponents`  微信小程序专用组件

##  功能说明
    基于uniapp 开源框架uni-starter.
    uni-starter大部分功能基于serverless云端一体化的插件，包括`uni-upgrade-center-app`版本管理插件、`uni-id-pages`用户管理的uni-id体系
    `uni-upgrade-center-app、uni-id-pages`修改插件适用于server-api接口请求方式
