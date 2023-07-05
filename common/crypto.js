/**
 * 工具类
 */
import CryptoJS from 'crypto-js';
import $store from '@/store'
import {stringUtils} from "./util";

export default {
    //加密
    AES_encrypt(word, k) {
        let keyStr = k ? k : 'abcdefgabcdefg12';
        let iv = k.substring(0, 16);
        var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var srcs = CryptoJS.enc.Utf8.parse(word);
        iv = CryptoJS.enc.Utf8.parse(iv);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding,
            iv: iv,
        });
        return encrypted.toString();
    },

    //解密
    AES_decrypt(word, k) {
        let keyStr = k ? k : 'abcdefgabcdefg12';
        let iv = k.substring(0, 16);
        var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        iv = CryptoJS.enc.Utf8.parse(iv);
        var decrypt = CryptoJS.AES.decrypt(word, key, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding,
            iv: iv
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();

    },
    MD5(word) {
        return CryptoJS.MD5(word).toString();
    },
    // 签名signature本地加密
    // 解析
    deCode(rKey) {
        let s = rKey
        let length = parseInt(s.substring(0, 2), 16);
        let time = parseInt(s.substring(2, 4), 16);
        let keyA = parseInt(s.substring(6, 2), 16)
        let keyZ = parseInt(s.substring(8, 2), 16)
        let cidA = parseInt(s.substring(10, 2), 16);
        let cidZ = parseInt(s.substring(12, 2), 16)
        let sLast = stringUtils.hexToString(s.substring(14));
        let key = sLast.substring(keyA, keyZ);
        let cid = sLast.substring(cidA, cidZ)
        return {cid, key, time}
    },
    // 加密
    enCode({cid, key}) {
        let timeDiff = $store.getters['signature/TIMEDIFF'];
        let reg_nonce = stringUtils.randomString(40)
        let a = Date.parse(new Date()) / 1000
        let reg_timestamp = parseInt(a + timeDiff);
        let md5Str = key + ':' + reg_timestamp + ':' + reg_nonce
        return {'req-timestamp': reg_timestamp, 'req-nonce': reg_nonce, 'req-key': this.MD5(md5Str), cid}
    }
}
