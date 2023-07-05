import $api from './api';
import $uniapi from './uniapi'

// 登记cid
function getCid(){
	plus.push.getClientInfoAsync((info) => {
		let cid = info["clientid"];
		if(cid){
			$api.cidRecord(cid).then(res=>{
				if(res.data.code===200){ return true }
			})
		}
	});
}
// push 接收信息回调处理
function _handlePush(msg){
	if (uni.getSystemInfoSync().platform == 'ios') {
		if (msg.type == "receive") {
			var serverMsg = msg.content.Payload
			plus.push.createMessage(serverMsg.content, JSON.stringify(serverMsg.payload), {
				title: serverMsg.title
			});
		}
	} else {
		var pushMsg = JSON.parse(msg.content);
		var messageTitle = pushMsg.m_title;//智慧信访
		var messageContent = pushMsg.m_content;//智慧信访
		var payload = pushMsg.payload;//智慧信访
		plus.push.createMessage(messageContent, payload, {
			title: messageTitle
		})
	}
	// 如果是新信息显示红点
	uni.showTabBarRedDot({
		index: 1,
	})
}
// push点击事件回调处理
function _handlePushClick(msg){
	// IOS
	if (uni.getSystemInfoSync().platform == 'ios') {
		var payload;
		if (msg.type == "click") {
			payload = msg.payload;
		} else {
			payload = JSON.parse(msg.payload);
		}
		if (payload != null || payload != undefined) {
			switch (payload.name){
				case 'information':
					setTimeout(() => { $uniapi.navigateTo('notice/detail',{id:payload.value}) }, 1000)
					break;
				case 'letter':
					setTimeout(() => { $uniapi.navigateTo('index/mailDetail',{id:payload.value}) }, 1000)
					break;
				default:
					setTimeout(() => { $uniapi.switchTab('index/index') }, 1000)
					break;
			}
		}
	} else { // Android
		var payload = msg.payload;
		if (payload != null || payload != undefined) {
			switch (payload.name){
				case 'information':
					setTimeout(() => { $uniapi.navigateTo('notice/detail',{id:payload.value}) }, 1000)
					break;
				case 'letter':
					setTimeout(() => { $uniapi.navigateTo('index/mailDetail',{id:payload.value}) }, 1000)
					break;
				default:
					setTimeout(() => { $uniapi.switchTab('index/index') }, 1000)

					break;
			}

		}
	}
}
export default { getCid,_handlePush,_handlePushClick }
