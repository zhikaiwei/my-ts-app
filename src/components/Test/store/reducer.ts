import { RESET_STATE, UPDATE_TEST_CONUT_STATE } from "./actionsType";
import { TestCountState, initalTestCountState } from "./state/testCuntState";

export interface State {
  testCount: TestCountState;
}
const initalState: State = {
  testCount: initalTestCountState
};
export function reducer(state = initalState, action: any): State {
  switch (action.type) {
    case RESET_STATE: {
      return initalState;
    }
    case UPDATE_TEST_CONUT_STATE: {
      const oldTestCountState = state.testCount;
      const newTestCountState = Object.assign({}, oldTestCountState, {
        ...action.payload
      });
      return Object.assign({}, state, { testCount: newTestCountState });
    }
    default: {
      return state;
    }
  }
}
