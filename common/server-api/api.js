import http from './interceptor/signature'
import * as http from '@/uni_modules/gt-axios-request/js_sdk/base.js'
const api = {

	//检测版本更新接口
	checkAppUpdate(data) {
		return http({ url: `app/version/new`, method: 'get', data: data})
	},
	// 验签获取接口
	getSignature(date){
		return http({url: `rt/k/${date}`, method: 'get'})
	},
	// 文件预览/下载
	getFile(fid) {
		return http({ url: `resource/fid/${fid}`, method: 'get'})
	},
	// 文件地址获取
	getFileUrl(fid) {
		return http({ url: `resource/fp/${fid}`, method: 'get'})
	},
	getTempFileURL({fileList}) {
		return http({url: fileList[0], method: 'get'})
	},
	// 根据字典类型查询字典数据信息
	getDicts(dictType) {
	  return http({ url: 'system/dict/data/type/' + dictType, method: 'get' })
	},
	// 关联选项类接口
	// 系统部门
	getDepts(data) {
	  return http({ url: 'system/dept/list', method: 'get',data:data })
	},
	getDeptsAll(data) {
	  return http({ url: 'system/dept/all', method: 'get',data:data })
	},
	// 行政区域
	getArea(data) {
	  return http({ url: 'petition/area/list', method: 'get',data:data })
	},
	// 来访人
	// 列表
	listPetitioner(data){
		return http({ url: 'petition/petitioner/list', method: 'get',data:data })
	},
	// 添加
	addPetitioner(data){
		return http({ url: 'petition/petitioner', method: 'post',data:data })
	},
	// 信息推送cid记录
	cidRecord(cid){
		return http({ url: `v1/app/${cid}`, method: 'get' })
	},
	// 查询用户id
	getUser(uid){
		return http({ url:`system/user/${uid}`,method:'get'})
	},

	// 登录
	doLogin(data) {
		return http({url: `applogin`, method: 'post', data: data})
	},
	// 首页信息统计
	homeCount() {
		return http({url: `petition/view/count`, method: 'get',})
	},
	// --------------- 信访 ----------------
	// 信访登记
	petitionRegister(data) {
		return http({url: `petition/petition_register`, method: 'post', data: data})
	},
	// // 信件列表
	// petitionList(data) {
	// 	return http({url: `petition/view/untreated`, method: 'get', data: data})
	// },
	// 信件列表
	petitionList(data) {
		return http({url: `petition/view`, method: 'get', data: data})
	},
	// 信件进度详情
	petitionDetail(id) {
		return http({url: `petition/view/detail/${id}`, method: 'get',})
	},
	// 信件中联名上访名单
	petitionRelations(id) {
		return http({url: `petition/view/relation/${id}`, method: 'get',})
	},

	// 信件受理
	processAccept(data) {
		return http({url: `petition/process/accept`, method: 'post', data: data})
	},
	// 信件交办
	processAssign(data) {
		return http({url: `petition/process/assignment`, method: 'post', data: data})
	},
	// 信件承办
	processUndertake(data) {
		return http({url: `petition/process/undertake`, method: 'post', data: data})
	},
	// 信件约谈
	appointmentHandle(data) {
		return http({url: `petition/appointment/handle`, method: 'post', data: data})
	},
	// 信件标记有效
	valid(data) {
		return http({url: `petition/petition_register/markerValid`, method: 'post', data: data})
	},
	// 信件标记无效
	invalid(data) {
		return http({url: `petition/petition_register/markerInvalid`, method: 'post', data: data})
	},
	// 交办信件接收
	processReceive(data) {
		return http({url: `petition/process/receive`, method: 'post', data: data})
	},
	// 交办信件拒收
	processReject(data) {
		return http({url: `petition/process/rejection`, method: 'post', data: data})
	},
	// 信件办结(申请办结)
	processComplete(data) {
		return http({url: `petition/process/complete`, method: 'post', data: data})
	},
	// 信件办结审核
	auditComplete(data) {
		return http({url: `petition/process/audit`, method: 'post', data: data})
	},
	// 信件申请延期
	applyExtension(data) {
		return http({url: `petition/process/applyExtension`, method: 'post', data: data})
	},
	// 信件延期审核
	auditExtension(data) {
		return http({url: `petition/process/auditApplyExtension`, method: 'post', data: data})
	},
	// --------------- 消息 ----------------
	// 消息列表
	noticeList(data) {
		return http({url: `app/notice/list`, method: 'get', data: data})
	},
	// 消息详情
	noticeDetail(id) {
		return http({url: `app/notice/${id}`, method: 'get',})
	},


}
export default api
