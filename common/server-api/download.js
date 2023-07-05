import $configCenter from '@/common/config-center.js';
const download = {
	/**
	 * 下载图片文件
	 * @param {Object} fid minIo文件id
	 */
	downloadImage(fid) {
		let url = $configCenter.apiUrl+`/resource/fid/${fid}`;
		// #ifdef APP-PLUS
		uni.downloadFile({
			url,
			success: (res) => {
				var tempFilePath = res.tempFilePath;
				uni.saveImageToPhotosAlbum({ // 然后调用这个方法
					filePath: tempFilePath,
					success: (res) => {
						uni.showToast({
							icon: 'none',
							title: '图片下载成功'
						});
					}
				})
			},
			fail: () => {
				uni.showToast({
					icon: 'none',
					title: '图片保存失败'
				});
			}
		});
		// #endif
		// #ifndef APP-PLUS
		//把base64转换成Blob数据
		let ua = window.navigator.userAgent.toLowerCase() // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
		// 微信内置浏览器
		// if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		// 	this.wxPopupShow = true;
		// } else {}
		// let downloads = url.replace(this.imgDomain, '');
		// let proxyurl = '/alioss' + downloads;
		uni.downloadFile({
			url,
			success: (res) => {
				var tempFilePath = res.tempFilePath;
				var link = document.createElement('a');
				link.href = tempFilePath;
				link.download = getFileExt(tempFilePath);
				link.click();
			}
		})
		// #endif
	},
	downloadFile(fid,cb){
		let url = $configCenter.apiUrl+`/resource/fid/${fid}`;
		uni.downloadFile({
			url,
			success: (res) => {
				if (res.statusCode === 200) {
					uni.showToast({
						icon: 'none',
						title: '下载成功',
						duration: 1000
					});
					let tempFilePath = res.tempFilePath;
					// #ifndef H5
					uni.saveFile({
						tempFilePath,
						success: function (res) {
							if(cb) cb()
						}
					});
					// #endif
					// #ifdef H5
					var link = document.createElement('a');
					link.href = tempFilePath;
					// link.download = this.getFileExt(tempFilePath);
					document.body.append(link);
					link.click();
					document.body.removeChild(link);
					if(cb) cb()
					// #endif

				}
			}
		});
	},
}
export default download
