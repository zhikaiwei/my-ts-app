import { State } from "./reducer";
import { TestCountState } from "./state/testCuntState";

export const RESET_STATE = "HOME_RESET_STATE";
export interface ResetStateAction {
  type: typeof RESET_STATE;
  payload?: State;
}

export const UPDATE_TEST_CONUT_STATE = "TEST_UPDATE_TEST_CONUT_STATE";
export interface UpdateTestCountStateAction {
  type: typeof UPDATE_TEST_CONUT_STATE;
  payload: Partial<TestCountState>;
}

export type ActionTypes = ResetStateAction | UpdateTestCountStateAction;
