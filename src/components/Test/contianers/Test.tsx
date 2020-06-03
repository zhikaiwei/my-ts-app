import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ReducerKey } from "../../../enum/reducerKey";
import { State } from "../store/reducer";
import { TestCountState } from "../store/state/testCuntState";
import { getTestCountState } from "../store/actions";

interface StateProps {
  count: number;
}
interface DispatchProps {
  getTestCountState: (params: Partial<TestCountState>) => void;
}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: { [ReducerKey.Test]: State }): StateProps => ({
  count: state[ReducerKey.Test].testCount.count
});

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getTestCountState: params => dispatch(getTestCountState(params))
});

interface TestProps extends StateProps, DispatchProps {}

interface TestState {}

class Test extends React.Component<TestProps, TestState> {
  constructor(props: TestProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div>
        <button
          onClick={() =>
            this.props.getTestCountState({ count: this.props.count + 1 })
          }
        >
          加
        </button>
        <br />
        <button
          onClick={() =>
            this.props.getTestCountState({ count: this.props.count - 1 })
          }
        >
          减
        </button>
        <br />
        <span>{this.props.count}</span>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Test);
