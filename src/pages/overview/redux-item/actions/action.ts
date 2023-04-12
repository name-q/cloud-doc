import { Command } from "../constant";
import { Dispatch } from "@/redux/types";
import { IAllReducerProps } from "../types";
import { getReducerData } from "@/redux/store";
import { extraPathsValue } from "@/redux/util";

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
  };
  return action;
};

// eslint-disable-next-line
function getData(): IAllReducerProps {
  return {
    main: getReducerData("overviewMain"),
  };
}
