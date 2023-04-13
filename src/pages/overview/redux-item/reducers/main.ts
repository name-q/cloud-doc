import { Command } from "../constant";
import { IMainReducer } from "../types";
import { Action } from "@/redux/types";
import produce from "immer";
import * as immerUtil from "@/redux/immer-util";

const INITIAL_STATE: IMainReducer = {
  isReady: false,
  mail: "",
  nick: "",
  _id: "",
  // 选中的对话
  selectedId: "",
  // 加载对话中
  loadingMessage: false,
  createTime: 0,
  updateTime: 0,
  message_history: [],
};

export default function main(
  state = INITIAL_STATE,
  action: Action
): IMainReducer {
  const { type, payload } = action;

  return produce<IMainReducer>(state, (draftState) => {
    switch (type) {
      //通用改变数据
      case Command.commonChange:
        return immerUtil.commonChange(draftState, { ...payload, key: "main" });

      //初始化
      case Command.init:
        draftState = { ...draftState, ...payload.main };
        draftState.isReady = true;
        return draftState;

      //重置
      case Command.clean:
        return INITIAL_STATE;
    }
  });
}
