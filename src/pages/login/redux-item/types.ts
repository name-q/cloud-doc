import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  testText: string;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;

  [name: string]: any;
};

//默认是全部的属性,可以自定义
export type reduxIProps = IAllReducerProps & ActionType;