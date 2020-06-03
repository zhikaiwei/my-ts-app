import { CountState } from "./state/countState";
import { NameState } from "./state/nameState";
import {
  ADD_ACTION,
  UpdateHomeAddCountStateAction,
  SET_NAME_ACTION,
  UpdateHomeNameStateAction
} from "./actionTypes";

/**
 * Add count state
 */
export function getAddCountState(
  params: Partial<CountState>
): UpdateHomeAddCountStateAction {
  return {
    type: ADD_ACTION,
    payload: params
  };
}

/**
 * Reduce count state
 */
export function getNameState(
  params: Partial<NameState>
): UpdateHomeNameStateAction {
  console.log(params);
  return {
    type: SET_NAME_ACTION,
    payload: params
  };
}
