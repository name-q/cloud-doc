"use strict";
const Service = require("egg").Service;

const { Configuration, OpenAIApi } = require("openai");

class ChatGPTService extends Service {
  // 提问ChatGPT
  async putQuestions(content, { model } = { model: "gpt-3.5-turbo-0301" }) {
    let { ctx, config } = this;
    if (
      !content ||
      Object.prototype.toString.call(content) !== "[object String]"
    )
      throw "参数错误";
    try {
      const configuration = new Configuration({
        apiKey: config.OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);
      let messages = [
        {
          role: "user",
          content,
        },
      ];
      const result = await openai.createChatCompletion({
        // 配置侧
        model,
        messages,
      });
      return result.data;
    } catch {
      ctx.logger.error("put questions To ChatGPT error, content:", content);
      throw "操作失败";
    }
  }
}
module.exports = ChatGPTService;
