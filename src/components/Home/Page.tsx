import React from "react";
import Home from "./containers/Home";
import { injectReducer } from "../../common/store";
import { ReducerKey } from "../../enum/reducerKey";
import { reducer } from "./store/reducer";

injectReducer(ReducerKey.Home, reducer);

interface PageProps {}
interface PageState {}

class Page extends React.Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}
export default Page;
