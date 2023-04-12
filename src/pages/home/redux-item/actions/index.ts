import { Command } from "../constant";
import { Dispatch } from "@/redux/types";
import { getActionProxy } from "@/redux/action-util";
import * as reduxStore from "@/redux/store";
import Action from "./action";

import { message } from "antd";

// eslint-disable-next-line
export default (dispatch: Dispatch) => {
  const actions = {
    action: getActionProxy<typeof Action>(Action)(dispatch),

    /**
     * 初始化数据
     */
    async init() {
      message.success("home init");
    },

    /**
     * 重置
     */
    async clean() {
      if (reduxStore.deregister) {
        reduxStore.deregister(["homeMain"]);
      }
      dispatch({ type: Command.clean });
    },
  };

  return { actions };
};
