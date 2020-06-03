import React from "react";
import { injectReducer } from "../../common/store";
import { ReducerKey } from "../../enum/reducerKey";
import Test from "./contianers/Test";
import { reducer } from "./store/reducer";

injectReducer(ReducerKey.Test, reducer);

interface PageProps {}
interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  public constructor(props: PageProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div>
        <Test />
      </div>
    );
  }
}
export default Page;
