import {
  createStore,
  applyMiddleware,
  Reducer,
  combineReducers,
  ReducersMapObject
} from "redux";
import thunk from "redux-thunk"; // 中间件，作用：如果不使用该中间件，当我们dispatch一个action时，需要给dispatch函数传入action对象；但如果我们使用了这个中间件，那么就可以传入一个函数，这个函数接收两个参数:dispatch和getState。这个dispatch可以在将来的异步请求完成后使用，对于异步action很有用
import { ReducerKey } from "../enum/reducerKey";

const reducers: ReducersMapObject = {};

export const store = createStore(
  combineReducers(reducers),
  undefined,
  applyMiddleware(thunk)
);

export const injectReducer = (key: ReducerKey, r: Reducer): void => {
  reducers[key] = r;
  store.replaceReducer(combineReducers(reducers));
};
