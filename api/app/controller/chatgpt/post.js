"use strict";
const Controller = require("egg").Controller;

class chatGPTPostController extends Controller {
  // 创建新的ChatGPT提问
  async question() {
    const { ctx } = this;

    try {
      let { _id } = ctx.data;
      let { question } = ctx.request.body;
      // 反馈回答
      let chatGPT_result = await ctx.service.chatgpt.putQuestions(question);
      // 保存到历史消息
      let result = await ctx.service.chatgpt.saveMessage(
        _id,
        chatGPT_result.choices[0].message,
        question
      );
      ctx.successbody(result);
    } catch (error) {
      ctx.errbody(error);
    }
  }

  // 继续旧的对话
  async linkChat() {
    const { ctx } = this;

    try {
      let { _id } = ctx.data;
      let { question, messageId } = ctx.request.body;

      // 查询上一次的对话并拼接
      let message = await ctx.service.chatgpt.linkMessage(question, messageId);
      // 发起继续对话
      
      // 更新chatGPT最新反馈

      ctx.successbody("result");
    } catch (error) {
      ctx.errbody(error);
    }
  }
}

module.exports = chatGPTPostController;
