import { State } from "./reducer";
import {
  ResetStateAction,
  RESET_STATE,
  UPDATE_TEST_CONUT_STATE
} from "./actionsType";
import { TestCountState } from "./state/testCuntState";

/**
 * reset state
 * @param param State
 */
export function resetState(param?: State): ResetStateAction {
  return {
    type: RESET_STATE,
    payload: param
  };
}

/**
 * update count state
 * @param param testCountState
 */
export function getTestCountState(param: Partial<TestCountState>): any {
  return {
    type: UPDATE_TEST_CONUT_STATE,
    payload: param
  };
}
