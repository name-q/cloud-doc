import { Command } from "../constant";
import { Dispatch } from "@/redux/types";
import { IAllReducerProps } from "../types";
import { getReducerData } from "@/redux/store";
import { extraPathsValue } from "@/redux/util";

import dayjs from "dayjs";

import { Fetch } from "@/kit/index";

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
        const format = (time) => {
          // 获取当前时间
          const now = dayjs();
          // 获取待格式化的时间
          const date = dayjs(time);
          // 计算时间差
          const diff = now.diff(date, "day");
          // 根据时间差，格式化时间
          let formattedDate;
          if (diff === 0) {
            // 今天
            formattedDate = date.format("HH:mm");
          } else if (diff === 1) {
            formattedDate = date.format("昨天 HH:mm");
          } else {
            formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
          }
          return formattedDate;
        };
        createTime = format(createTime);
        updateTime = format(updateTime);
        action.commonChange("main.createTime", createTime);
        action.commonChange("main.updateTime", updateTime);
        action.commonChange("main.message_history", message_history);
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
