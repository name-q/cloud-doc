import Actions from "./actions";

export interface IMainReducer {
  isReady: boolean;
  mail: string;
  nick: string;
  _id: string;
  selectedId: string;
  loadingMessage: boolean;
  createTime: number;
  updateTime: number;
  message_history: Array<{
    content: string;
    role: "user" | "assistant" | "system";
  }>;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type reduxIProps = IAllReducerProps & ActionType;
