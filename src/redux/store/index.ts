import { compose, applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/index";

const middlewares = [thunk];

// create store
let GolbalStore: any = createStore(
  combineReducers(reducers),
  undefined,
  compose(applyMiddleware(...middlewares))
);

let newReducer = {}; //保存动态新加的reducers
//动态注册reducer
export function registerReducer(reducerMap: { [name: string]: Function }) {
  //判断是否重复.
  for (let key in reducerMap) {
    if (reducers[key]) {
      throw new Error(
        `the register reducer conflict with reducer name: ${key},please modify the reducer name`
      );
    }
  }
  newReducer = { ...newReducer, ...reducerMap }; //更新动态添加
  GolbalStore.replaceReducer(
    combineReducers({
      ...reducers, //以前全局注册的reducer
      ...newReducer //动态储蓄新的reducers
    })
  );
}

//动态解除reducer
export function deregister(reducerKeys: [string]) {
  reducerKeys.forEach((itemReduce) => {
    if (newReducer[itemReduce]) {
      //如果对应的reducerKey存在
      delete newReducer[itemReduce];
    }
  });

  GolbalStore.replaceReducer(
    combineReducers({
      ...reducers,
      ...newReducer
    })
  );
}

// Get reducer data
export function getReducerData(reducerKey: string) {
  return GolbalStore.getState()[reducerKey];
}

export default GolbalStore;

// compose: fn1(fn2(fn3(params)))  === compose(fn1,fn2,fn3)(params)
