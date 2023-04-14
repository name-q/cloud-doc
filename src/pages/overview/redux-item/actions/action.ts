import { Command } from "../constant";
import { Dispatch } from "@/redux/types";
import { IAllReducerProps } from "../types";
import { getReducerData } from "@/redux/store";
import { extraPathsValue } from "@/redux/util";

import dayjs from "dayjs";

import { Fetch, msg } from "@/kit/index";
import { message } from "antd";

// eslint-disable-next-line
export default (dispatch: Dispatch) => {
  let action = {
    commonChange(...param: any) {
      dispatch({
        type: Command.commonChange,
        payload: extraPathsValue(...arguments),
      });
    },

    async getChatList(pageNum) {
      try {
        let { result } = await Fetch(
          `/api/chatgpt/chatlist?pageNum=${pageNum}&pageSize=20`,
          {
            noCache: true,
          }
        );
        if (result.code) {
          return result.data;
        }
        return [];
      } catch (error) {
        return [];
      }
    },

    format(time) {
      // 获取待格式化的时间
      const date = dayjs(time);
      const today = dayjs(Date.now()).format("YYYY-MM-DD");
      const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      const targetDay = date.format("YYYY-MM-DD");
      // 根据时间差，格式化时间
      let formattedDate;
      if (targetDay === today) {
        // 今天
        formattedDate = date.format("HH:mm");
      } else if (targetDay === yesterday) {
        formattedDate = date.format("昨天 HH:mm");
      } else {
        formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
      }
      return formattedDate;
    },

    // 选择左侧聊天
    async selectedChat(messageId) {
      action.commonChange("main.loadingMessage", true);
      // 获取聊天内容
      let { result } = await Fetch(
        `/api/chatgpt/dialogueDetails?messageId=${messageId}`,
        {
          noCache: true,
        }
      );
      console.log(result);

      if (result.code) {
        let { createTime, message_history, updateTime } = result.data;
        createTime = action.format(createTime);
        updateTime = action.format(updateTime);
        action.commonChange("main.createTime", createTime);
        action.commonChange("main.updateTime", updateTime);
        action.commonChange("main.message_history", message_history);
        action.commonChange("main.selectedId", messageId);
      } else {
        message.error("对话失效");
      }
      action.commonChange("main.loadingMessage", false);
    },

    // 发送消息
    async sendMessage(question: any) {
      let {
        main: { selectedId, message_history },
      } = getData();
      if (!question) return;
      action.commonChange("main.loadingMessage", true);
      if (selectedId) {
        // 继续对话
        let { result } = await Fetch("/api/chatgpt/linkchat", {
          method: "POST",
          body: { question, messageId: selectedId } as any,
          noCache: true,
        });
        console.log(result);
        let {
          data: { newMessage, updateTime },
        } = result;

        updateTime = action.format(updateTime);
        action.commonChange("main.updateTime", updateTime);
        message_history = [
          ...message_history,
          {
            role: "user",
            content: question,
          },
          newMessage,
        ];
        action.commonChange("main.message_history", message_history);
      } else {
        // 开启新的对话
        let { result } = await Fetch("/api/chatgpt/question", {
          method: "POST",
          body: { question } as any,
          noCache: true,
        });
        let {
          data: { createTime, messageHistory, messageId, updateTime },
        } = result;
        // 更新左侧列表
        msg.emit("Refresh Left List");
        // 载入数据
        createTime = action.format(createTime);
        updateTime = action.format(updateTime);
        action.commonChange("main.createTime", createTime);
        action.commonChange("main.updateTime", updateTime);
        action.commonChange("main.message_history", messageHistory);
        action.commonChange("main.selectedId", messageId);
      }
      action.commonChange("main.loadingMessage", false);
    },
  };
  return action;
};

// eslint-disable-next-line
function getData(): IAllReducerProps {
  return {
    main: getReducerData("overviewMain"),
  };
}
