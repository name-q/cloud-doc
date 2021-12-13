'use strict';

// 加密库 node内置
const crypto = require('crypto-js');

module.exports = {


    // 获取秒级时间戳
    getTime(ss = 1) {
        return ss ? Date.parse(new Date()) : new Date().getTime()
    },

    // 获取MD5值
    getMd5(data, salt = '') {
        if (!data) return '';
        data = data.toString() + salt
        return crypto.MD5(data).toString()
    },

    // 控制台打印
    log(data, hint) {
        console.log(`::::::${hint}:::::: ${JSON.stringify(data)}`)
    },

}