'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {

  // 获取验证码
  async getVerificationCode() {
    const { ctx } = this;
    let verify = await this.service.verify.num('getVerificationCode');
    ctx.response.type = 'image/svg+xml';
    ctx.body = verify.data;
  }

  // 注册账号
  async registerAnAccount() {

  }

  // 登入账号
  async loginAccount() {

  }

  // 退出账号-记录退出时间IP
  async quitAccount() {
  }

  // 修改密码
  async changePassword() {

  }
}

module.exports = AccountController;
