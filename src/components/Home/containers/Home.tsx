import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReducerKey } from "../../../enum/reducerKey";
import { getAddCountState, getNameState } from "../store/actions";
import { State } from "../store/reducer";
import { CountState } from "../store/state/countState";
import { NameState } from "../store/state/nameState";

interface StateProps {
  count: number;
  name: string;
}

interface DispatchToProps {
  onAdd: (params: Partial<CountState>) => void;
  onSetName: (params: Partial<NameState>) => void;
}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: { [ReducerKey.Home]: State }): StateProps => {
  const homeCountState = state[ReducerKey.Home].homeCountState;
  const homeNameState = state[ReducerKey.Home].homeNameState;
  return {
    count: homeCountState.count,
    name: homeNameState.name
  };
};

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
  onAdd: params => dispatch(getAddCountState(params)),
  onSetName: params => dispatch(getNameState(params))
});

interface HomeProps extends StateProps, DispatchToProps {}
interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <button
          onClick={() => this.props.onAdd({ count: this.props.count + 1 })}
        >
          增加
        </button>
        <button
          onClick={() => this.props.onAdd({ count: this.props.count - 1 })}
        >
          减少
        </button>
        <div>
          <button
            onClick={() =>
              this.props.onSetName({ name: `name${this.props.count + 1}` })
            }
          >
            设置名称
          </button>
          <div>{this.props.name}</div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
