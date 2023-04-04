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
        model,
        messages,
      });
      return result.data;
    } catch {
      ctx.logger.error("put questions To ChatGPT error, content:", content);
      throw "操作失败";
    }
  }

  /**
   * 保存对话讯息
   * @param {*} user_id _id
   * @param {*} message chatGPT result message
   * @param {*} title 提问的第一个消息前20个字
   */
  async saveMessage(user_id, message, title) {
    let { ctx } = this;
    try {
      let message_history = [
        {
          role: "user",
          content: title,
        },
        message,
      ];
      title = String(title).slice(0, 20);
      if (!title) return;
      let createTime = Date.now();
      // 载入数据库
      let result = await ctx.service.mongo.save("Chatgpt", {
        createTime,
        updateTime: createTime,
        user_id,
        message_history,
        title,
      });
      return {
        createTime,
        messageHistory: result.message_history,
        updateTime: createTime,
        messageId: result._id,
        title,
      };
    } catch (error) {
      ctx.logger.error("saveMessage error:", error);
    }
  }

  /**
   * 查询上一次的对话并拼接
   * @param {*} content 新的内容
   * @param {*} messageId 上一次的对话id
   * @returns
   */
  async linkMessage(content, messageId) {
    let { ctx } = this;
    try {
      if (
        !content ||
        Object.prototype.toString.call(content) !== "[object String]" ||
        !messageId ||
        Object.prototype.toString.call(messageId) !== "[object String]"
      )
        throw "参数错误";
      let result = await ctx.service.mongo.findOne("Chatgpt", {
        _id: messageId,
      });
      if (!result) throw "对话已失效";
      return [
        ...result.message_history,
        {
          role: "user",
          content: content,
        },
      ];
    } catch (error) {
      throw "对话已失效";
    }
  }

  // 发起继续对话
  async callAgain(messages, { model } = { model: "gpt-3.5-turbo-0301" }) {
    let { ctx, config } = this;
    try {
      const configuration = new Configuration({
        apiKey: config.OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const result = await openai.createChatCompletion({
        model,
        messages,
      });
      return result.data;
    } catch (error) {
      ctx.logger.error("callAgain error:", error);
      throw "操作失败";
    }
  }

  /**
   * 更新chatGPT最新反馈
   * @param {*} messages 历史消息集合
   * @param {*} newMessage chatGPT发来的最新消息
   * @param {*} messageId 定位消息的id
   * @param {*} user_id 用户_id
   */
  async updateMessage(messages, newMessage, messageId, user_id) {
    let { ctx, config } = this;
    try {
      let updateTime = Date.now();
      let message_history = [...messages, newMessage].splice(
        -config.QA_RECORD * 2
      );
      await ctx.service.mongo.updateOne(
        "Chatgpt",
        {
          _id: messageId,
          user_id,
        },
        {
          message_history,
          updateTime,
        }
      );
      return {
        newMessage,
        updateTime,
      };
    } catch (error) {
      ctx.logger.error("updateMessage error:", error);
    }
  }

  // 获取聊天列表分页数据
  async chatListPagination(pageNum, pageSize, user_id) {
    let { ctx } = this;
    try {
      pageNum = Number(pageNum);
      pageSize = Number(pageSize);
      if (isNaN(pageNum) || isNaN(pageSize)) throw "参数错误";
      this.app.redis.get;
      let result = await ctx.service.mongo.pagination(
        "Chatgpt",
        pageSize,
        pageNum,
        { user_id },
        { updateTime: 1 },
        "_id title"
      );
      return result;
    } catch (error) {
      ctx.logger.error("chatListPagination error:", error);
      throw "操作失败";
    }
  }

  // 获取对话详情
  async getMessage(messageId, user_id) {
    let { ctx } = this;
    try {
      if (
        !messageId ||
        Object.prototype.toString.call(messageId) !== "[object String]"
      )
        throw "参数错误";

      let result = await ctx.service.mongo.findOne(
        "Chatgpt",
        {
          _id: messageId,
          user_id,
        },
        "message_history createTime updateTime _id"
      );
      if (!result) throw "对话已失效";
      return result;
    } catch (error) {
      // 此处为参数乱传情况 直接抛错不要记录
      // ctx.logger.error("getMessage error:", error);
      throw "对话已失效";
    }
  }
}
module.exports = ChatGPTService;
