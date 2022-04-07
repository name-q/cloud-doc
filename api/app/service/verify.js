'use strict';
/* 验证码生成器 */
const Service = require('egg').Service;

const svgCaptcha = require('svg-captcha');

class VerifyService extends Service {

    // 校验验证码
    async parse(sessionKey, enterVerify) {
        let trueVerify = this.ctx.session[sessionKey]
        console.log(sessionKey, enterVerify, '<user true>', trueVerify, '<<<<<验证码解析')
        if (!enterVerify || !trueVerify || trueVerify !== enterVerify) throw '验证码错误'
    }

    // 易于识别的数字验证码
    async num(sessionKey, size = 4) {
        // 配置长度 过滤字符 干扰线条等
        const options = {
            size,
            ignoreChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz40',
            fontSize: 150,
            width: 300,
            height: 150,
            background: '#e6f7ff',
            noise: 3
        }
        const captcha = svgCaptcha.create(options)
        this.ctx.session[sessionKey] = captcha.text;
        return captcha
    }
}

module.exports = VerifyService;