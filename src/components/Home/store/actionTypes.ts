import { CountState } from "./state/countState";
import { NameState } from "./state/nameState";
import { State } from "./reducer";

export const RESET_STATE = "HOME_RESET_STATE";
export interface ResetStateAction {
  type: typeof RESET_STATE;
  payload?: State;
}
export const ADD_ACTION = "HOME_ADD_ACTION";
export interface UpdateHomeAddCountStateAction {
  type: typeof ADD_ACTION;
  payload: Partial<CountState>;
}
export const SET_NAME_ACTION = "HOME_SET_NAME_ACTION";
export interface UpdateHomeNameStateAction {
  type: typeof SET_NAME_ACTION;
  payload: Partial<NameState>;
}

export type ActionTypes =
  | ResetStateAction
  | UpdateHomeAddCountStateAction
  | UpdateHomeNameStateAction;
