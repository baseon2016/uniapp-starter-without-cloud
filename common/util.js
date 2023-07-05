"use strict"

var stringUtils = {
	/**
	 * 字符串trim 处理删除指定字符左侧或右侧 内容
	 * @param str 指定字符
	 * @param char 原字符串
	 * @returns {string} 返回字符串
	 */
	ltrim: function (str, char) {
		let pos = str.indexOf(char);
		let sonstr = str.substr(pos + 1);
		return sonstr;
	},
	rtrim: function (str, char) {
		let pos = str.lastIndexOf(char);
		let sonstr = str.substr(0, pos);
		return sonstr;
	},
	/**
	 * 随机字符串
	 * @param {Number} e 位数
	 */
	randomString: function (e) {
		e = e || 32;
		var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
			a = t.length,
			n = "";
		for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
		return n
	},
	/**
	 * 16进制转字符串
	 * @param str
	 * @returns {string}
	 */
	hexToString: function (str) {
		var val = "",
			len = str.length / 2;
		for (var i = 0; i < len; i++) {
			val += String.fromCharCode(parseInt(str.substr(i * 2, 2), 16));
		}
		return val;
	},

	/**
	 * 姓名，身份证，银行卡等加密显示处理
	 */
	privacyStr(str,type) {
		let newStr;
		switch (type) {
			case 'name':
				if (str.length > 5) {
					newStr = str.substring(0, 4) + '**';
				} else if (str.length <= 5 && str.length > 3) {
					newStr = str.substring(0, 3) + '**';
				} else if (str.length == 3) {
					newStr = str.substring(0, 2) + '*';
				} else if (str.length <= 2) {
					newStr = str.substring(0, 1) + '*';
				}
				break;
			case 'idc':
				newStr = str.replace(/^(.{3})(?:\d+)(.{4})$/,"$1***********$2")
				break;
			case 'bankCard':
				for(let i = 0; i < str.length; i++){
					let item;
					if(i < str.length-4){
						item = '*'
					}else{
						item = data[i]
					}
					if(i % 4 == 0 && i != 0){
						newStr += ' ' + item
					}else{
						newStr += item
					}
				};
				break;
			default:
				//这个正则表达式使用了正向先行断言（positive lookahead assertion），即 (?=.)，它表示在任意字符之前的位置进行匹配。这样可以匹配除了字符串开头之外的所有位置。
				newStr = str.replace(/.(?=.)/g, '*');



		}
		return newStr;
	},

};

var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);//这里正则表达式，除了数字1-9以外的字符，不包括空格
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	/**
	 * 多久之前
	 * @param {String} dateStr "yyyy-mm-dd HH:MM:ss"格式的字符串
	 */
	fromNow: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	/**
	 * 秒数转时间长度 单位s
	 * @param {Number} time
	 */
	duration: function (time) {
		if (typeof time !== 'number' || time < 0) {
			return time
		}
		var hour = parseInt(time / 3600)
		time = time % 3600
		var minute = parseInt(time / 60)
		time = time % 60
		var second = time

		return ([hour, minute, second]).map(function (n) {
			n = n.toString()
			return n[1] ? n : '0' + n
		}).join(':')
	}

};

var arrayUtils = {
	/**
	 * 对象数组查询，可指定key
	 * @param arr	原数组
	 * @param keyValue	查询匹配键值
	 * @param keyName	可指定键名
	 * @returns {Object}	返回对象
	 */
	searchArrayByKey: function (arr, keyValue, keyName = 'key') {
		if (keyValue == null || keyValue == "") {
			return null
		}
		let result;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][keyName] == (keyValue + '')) {
				result = arr[i];
				break;
			}
		}
		return result;
	},
	/**
	 * 查询内容是否在数组内
	 * @param search 查询内容
	 * @param array 数组列表
	 * @returns {boolean} 是否
	 */
	inArray: function (search, array) {
		let flag = false;
		for (let i in array) {
			if (array[i] == search) {
				flag = true;
				break;
			}
		}
		return flag;
	},
	/**
	 * 数组去重
	 * @param {Array} arr
	 */
	arrUnique: function (arr) {
		return Array.from(new Set(arr));
	},
	/**
	 * 对象数组按照指定key键去重操作
	 * @param {Array} array 原始数组
	 * @param {String} key 指定key键
	 */
	arrUniqueByKey: function (array, key) {
		var uniqueMap = new Map();
		var uniqueArray = [];
		for (var i = 0; i < array.length; i++) {
			var item = array[i];
			var keyValue = item[key];

			if (!uniqueMap.has(keyValue)) {
				uniqueMap.set(keyValue, true);
				uniqueArray.push(item);
			}
		}
		return uniqueArray;
	},
	/**
	 * 奇偶拆分
	 * @param remainer 0 1
	 * @param splitList 源列表
	 * @returns {*[]}
	 */
	splitList: function (remainer, splitList) {
		let rst = [];
		splitList.map((item, index) => {
			if (index % 2 === remainer) {
				rst.push(item)
			}
		})
		return rst
	},
	/**
	 * 按照指定属性拆分列表
	 * @param {String} originalList 源列表
	 * @param {String} property    指定属性
	 * @param {String} propertyName 指定属性描述信息
	 * @return {Array}
	 */
	splitListByProperty: function (originalList, property, propertyName) {
		const resultMap = {}
		originalList.map(item => {
			const propertyValue = item[property];

			const propertyNameValue = item[propertyName] || undefined;
			if (!resultMap[propertyValue]) {
				resultMap[propertyValue] = {
					[property]: propertyValue,
					list: [item]
				}
				if (propertyNameValue) {
					resultMap[propertyValue][propertyName] = propertyNameValue
				}
			} else {
				resultMap[propertyValue].list.push(item)
			}
		})
		const result = Object.values(resultMap)
		return result;
	},

};
var objUtils = {
	/**
	 * 对象属性遍历数组
	 * @param {Object} obj
	 * @return {Array} res
	 */
	objToArray: function (obj) {
		let res = [];
		if (typeof obj == 'Object') {
			Object.keys(obj).map(key => {
				res.push({key, value: obj[key]})
			})
		}
		return res
	},
	/**
	 * 按设置预览对象，展示记录对象
	 * @param {Object} preview 预览模板对象 {[key]:{label:'展示key项对应名称'}}
	 * @param {Object} record 数据记录对象
	 * @return {Array} res 返回展示数据列表
	 */
	objToView: function (view, obj) {
		let viewTemplate = JSON.parse(view), objData = JSON.parse(obj)
		let res = [];
		if (typeof viewTemplate == 'object' && typeof objData == 'object') {
			Object.keys(viewTemplate).map(key => {
				let value = objData[key];
				let label = viewTemplate[key].label;
				if (Array.isArray(value)) {
					value = value.join(',')
				} else if (typeof value === "object") {
					value = this.objToArray(value).join(',');
				}
				res.push({key, label, value});
			})
		}
		return res
	}
};
var fileUtils = {
	/**
	 * 获取文件名
	 * @param str
	 * @returns {*|string}
	 */
	getFileName: function (str) {
		let arr = str.split('/')
		if (arr.length > 0) {
			return arr[arr.length - 1]
		} else {
			return ''
		}
	},
	/**
	 * 获取文件名后缀
	 * @param str
	 * @returns {*|string}
	 */
	getFileExt: function (str) {
		let name = getFileName(str)
		let arr = name.split('.')

		if (arr.length > 0) {
			return arr[arr.length - 1]
		} else {
			return ''
		}
	}
};

var otherUtils = {
	/**
	 * 经纬度转化为对象
	 * @param {Number,String} longitude
	 * @param {Number,String} latitude
	 */
	coordinateFormat: function (longitude, latitude) {
		if (typeof longitude === 'string' && typeof latitude === 'string') {
			longitude = parseFloat(longitude)
			latitude = parseFloat(latitude)
		}

		longitude = longitude.toFixed(2)
		latitude = latitude.toFixed(2)

		return {
			longitude: longitude.toString().split('.'),
			latitude: latitude.toString().split('.')
		}
	},
	/**
	 * 判断数据类型
	 * @param data
	 * @param type
	 * @returns {boolean}
	 */
	isType: function (data, type) {
		return Object.prototype.toString.call(data) === '[object ' + type + ']';
	},
	/**
	 * 判断是否为空
	 * @param v 传入数据
	 * @returns {boolean}
	 */
	isEmpty: function (v) {
		if (v === '' || v === undefined || v === null) {
			return true
		}
		if (typeof v === 'object') {
			if (Array.isArray(v)) {
				return v.length === 0
			} else {
				return Object.keys(v).length === 0
			}
		}
		return false
	},
	/**
	 * 节流 防抖
	 * @param {要执行的函数} fn
	 * @param {在操作多长时间后可再执行，第一次立即执行} interval
	 * @param {Object} isFirstAutoRun 是否首次自动执行
	 */
	debounce: function (fn, interval, isFirstAutoRun) {
		var _self = fn;
		var timer = null;
		var first = true;

		if (isFirstAutoRun) {
			_self();
		}

		return function () {
			var args = arguments;
			var _me = this;
			if (first) {
				first = false;
				_self.apply(_me, args);
			}

			if (timer) {
				clearTimeout(timer)
				// return false;
			}

			timer = setTimeout(function () {
				clearTimeout(timer);
				timer = null;
				_self.apply(_me, args);
			}, interval || 200);
		}
	}
};


export { stringUtils, dateUtils, arrayUtils, objUtils, fileUtils, otherUtils };

