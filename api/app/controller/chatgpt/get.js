"use strict";
const Controller = require("egg").Controller;

class chatGPTGetController extends Controller {
  // 分页-聊天列表
  async chatList() {
    const { ctx } = this;
    try {
      let { _id } = ctx.data;
      let { pageNum, pageSize } = ctx.query;
      // TODO
      let result = await ctx.service.chatgpt.chatListPagination(
        pageNum,
        pageSize,
        _id
      );
      ctx.successbody(result);
    } catch (error) {
      ctx.errbody(error);
    }
  }
}

module.exports = chatGPTGetController;
