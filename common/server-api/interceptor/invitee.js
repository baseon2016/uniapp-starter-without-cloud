
async function invitee(options) {
    let invite = options.invite || false;
    if(invite){
        options.data.inviteCode = await new Promise((resolve) => {
            uni.getClipboardData({
                success: function(res) {
                    console.log('剪切板内容：'+res.data);
                    if (res.data.slice(0, 18) == 'uniInvitationCode:') {
                        let uniInvitationCode = res.data.slice(18, 38)
                        // uni.showModal({
                        // 	content: '当前用户是其他用户推荐下载的,推荐者的code是：'+uniInvitationCode,
                        // 	showCancel: false
                        // });
                        resolve(uniInvitationCode)
                        //当前用户是其他用户推荐下载的。这里登记他的推荐者id 为当前用户的myInviteCode。判断如果是注册
                    } else {
                        resolve()
                    }
                },
                fail() {
                    console.log('error--');
                    resolve()
                },
                complete() {
                    // #ifdef MP-WEIXIN
                    uni.hideToast()
                    // #endif
                }
            });
        })
        // console.log(params);
    }

    return options;
}

export default invitee;

