import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

const middlewares = [
  thunk
]

// create store
let GolbalStore: any = createStore(
  combineReducers(reducers),
  undefined,
  compose(applyMiddleware(...middlewares)),
);

let currentReducer = reducers;

//Dynamic registration reducer
export function registerReducer(reducerMap: { [name: string]: Function }) {
  currentReducer = {
    ...reducers,
    ...reducerMap,
  };

  GolbalStore.replaceReducer(
    combineReducers(currentReducer),
  );
}

// Get reducer data
export function getReducerData(reducerKey: string) {
  return GolbalStore.getState()[reducerKey]
}

export default GolbalStore;


// compose: fn1(fn2(fn3(params)))  === compose(fn1,fn2,fn3)(params) 