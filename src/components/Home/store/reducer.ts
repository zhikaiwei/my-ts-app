import { CountState, initalCountState } from "./state/countState";
import { NameState, initalNameState } from "./state/nameState";
import {
  ActionTypes,
  ADD_ACTION,
  SET_NAME_ACTION,
  RESET_STATE
} from "./actionTypes";

export interface State {
  homeCountState: CountState;
  homeNameState: NameState;
}

/**
 * 初始化
 */
const getInitalState: State = {
  homeCountState: initalCountState,
  homeNameState: initalNameState
};

export function reducer(state = getInitalState, action: ActionTypes): State {
  switch (action.type) {
    case RESET_STATE:
      return getInitalState;
    case ADD_ACTION: {
      const oldHomeCountState = state.homeCountState;
      const newHomeCountState = Object.assign({}, oldHomeCountState, {
        ...action.payload
      });
      return Object.assign({}, state, { homeCountState: newHomeCountState });
    }
    case SET_NAME_ACTION: {
      const oldHomeNameState = state.homeNameState;
      const newHomeNameState = Object.assign({}, oldHomeNameState, {
        ...action.payload
      });
      return Object.assign({}, state, { homeNameState: newHomeNameState });
    }
    default: {
      return state;
    }
  }
}
