'use strict';

const Controller = require('egg').Controller;

class userGetController extends Controller {

  // 点击头像 弹框 获取用户信息
  async info() {
    const { ctx } = this;

    try {
      let { _id } = ctx.data
      let result = await ctx.service.mongo.findOne('Userinfo', { _id })
      if (!result?._id) return ctx.errbody('操作失败')
      // 输出: 随笔数 造极数 粉丝数 会员等级 最后签到时间戳
      let {
        essaysNumber = 0,
        zaojiNumber = 0,
        fansNumber = 0,
        level = 1,
        lastSignTime = 0
      } = result
      
      ctx.successbody({
        essaysNumber,
        zaojiNumber,
        fansNumber,
        level,
        lastSignTime
      })
    } catch (error) {
      ctx.logger.error('user get info error', error)
      ctx.errbody('操作失败')
    }
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
