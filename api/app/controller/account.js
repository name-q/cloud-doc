'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {

  // 获取验证码
  async getVerificationCode() {
    const { ctx } = this;
    let verify = await this.service.verify.num('account.getVerificationCode');
    ctx.response.type = 'image/svg+xml';
    ctx.body = verify.data;
  }

  // 注册账号
  async registerAnAccount() {
    let { ctx } = this
    // 用户邮箱 密码 昵称 验证码
    let { mail, password, nick, verificationCode } = ctx.request.body
    try {
      // 验证码校验
      await this.ctx.service.verify.parse('account.getVerificationCode', verificationCode)

      let result = await ctx.service.account.registerAnAccount(mail, password, nick)
      if (result === 'success') return ctx.successbody('操作成功')
      ctx.errbody('操作失败')
    } catch (error) {
      ctx.errbody(error)
    }
  }

  // 登入账号
  async loginAccount() {
    let { ctx } = this
    // 用户邮箱 密码 验证码
    let { mail, password, verificationCode } = ctx.request.body
    try {
      // 验证码校验
      await this.ctx.service.verify.parse('account.getVerificationCode', verificationCode)

      let result = await ctx.service.account.loginAccount(mail, password)
      if (result?._id) {
        let qwt = await ctx.service.qwt.createQWT('user-login-ok', { mail }, result._id)
        ctx.successbody(qwt)
        return
      }
      ctx.errbody('操作失败')
    } catch (error) {
      ctx.errbody(error)
    }
  }

  // 修改密码
  async changePassword() {

  }
}

module.exports = AccountController;
