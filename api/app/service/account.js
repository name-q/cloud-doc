'use strict';
const Service = require('egg').Service;

class accountService extends Service {

    // 注册账号
    async registerAnAccount(mail, password, nick) {
        let { ctx } = this
        // 参数校验
        if (mail && password && nick) {
            let {isMail, isPassword, isNick} = ctx.helper
            if(!isMail(mail) || !isPassword(password) || !isNick(nick)) throw '参数错误'

            // 查询是否注册过
            let result = await ctx.service.find.being('Userinfo', { mail })
            ctx.helper.log(result)
            if(result?._id) throw '该邮箱已注册'

            // 载入数据库
        } else {
            throw '参数缺失'
        }
    }
}

module.exports = accountService