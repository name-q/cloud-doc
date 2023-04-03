'use strict';
const Service = require('egg').Service;

class accountService extends Service {

    // 注册账号
    async registerAnAccount(mail, password, nick) {
        let { ctx } = this
        if (mail && password && nick) {
            let { isMail, isPassword, isNick } = ctx.helper
            if (!isMail(mail) || !isPassword(password) || !isNick(nick)) throw '参数错误'

            // 查询是否注册过
            let result = await ctx.service.mongo.findOne('Userinfo', { mail })
            if (result?._id) throw '邮箱已注册'

            try {
                // 载入数据库
                result = await ctx.service.mongo.save('Userinfo', { mail, password, nick, registerTime: Date.now() })
                return result?._id ? 'success' : 'error'
            } catch {
                ctx.logger.error('user register params error', { mail, password, nick })
                throw '操作失败'
            }

        } else {
            throw '参数缺失'
        }
    }

    // 登入账号
    async loginAccount(mail, password) {
        let { ctx, app } = this
        if (mail && password) {
            let { isMail, isPassword } = ctx.helper
            if (!isMail(mail) || !isPassword(password)) throw '参数错误'

            // 账号密码是否正确
            let result = await ctx.service.mongo.findOne('Userinfo', { mail, password })
            if (result?._id) {
                // 密码错误次数超过3次不允许登入
                let id = 'account.errCode' + result._id
                let countString = await app.redis.get(id)
                if(countString && parseInt(countString) >= 3) throw '请20分钟后登入'

                // 更新登入IP 并清除错误次数
                ctx.service.mongo.updateOne('Userinfo', { mail, password }, { ip: ctx.request.ip })
                await app.redis.del(id)

                return result
            }

            // 是否注册过
            result = await ctx.service.mongo.findOne('Userinfo', { mail })
            if (result?._id) {
                // 密码输入错误次数更新<redis>
                let id = 'account.errCode' + result._id
                let countString = await app.redis.get(id)
                countString = countString ? parseInt(countString) + 1 : 1
                await app.redis.set(id, countString)
                await app.redis.expire(id, 1200)
                if(parseInt(countString) >= 3) throw '请20分钟后登入'
                throw '密码不正确'
            }
            throw '该邮箱尚未注册'
        } else {
            throw '参数缺失'
        }
    }
}

module.exports = accountService