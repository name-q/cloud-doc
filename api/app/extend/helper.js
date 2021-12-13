'use strict';

const crypto = require('crypto-js');

module.exports = {

    // 邮箱校验
    isMail(mail) {
        return /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(mail)
    },

    // 密码校验
    isPassword(password) {
        return /^[0-9A-Za-z]+$/.test(password) && password?.length <= 20
    },

    // 昵称校验
    isNick(nick) {
        return nick?.length <= 10
    },

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