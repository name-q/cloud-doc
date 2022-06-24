'use strict';

const Controller = require('egg').Controller;

class userGetController extends Controller {

  // 获取用户信息
  async info() {
    const { ctx } = this;
    ctx.successbody(ctx.data)
  }

  // 获取用户上传头像的STS
  async getAvatarSTS() {
    let { ctx } = this

    let { mail } = ctx.data
    let STS = await ctx.service.oss.getPolicy(mail)
    this.ctx.successbody(STS)
  }
}

module.exports = userGetController;
