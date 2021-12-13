'use strict';
/* 验证码生成器 */
const Service = require('egg').Service;

const svgCaptcha = require('svg-captcha');

class VerifyService extends Service {

    // 易于识别的数字验证码
    async num(sessionKey) {
        // 配置长度 过滤字符 干扰线条等
        const options = {
            size: 4,
            ignoreChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz40',
            fontSize: 150,
            width: 500,
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