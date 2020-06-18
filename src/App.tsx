import React from "react";
import { Provider } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";
import Home from "./components/Home/Page";
import Test from "./components/Test/Page";
import Meun from "./components/Menu/Menu";
import Login from "./components/Login/Page";
import { store } from "./common/store";
import { history } from "./common/history";
import { Layout } from "antd";

const { Sider, Content } = Layout;
export interface AppProps {}
export interface AppState {
  collapsed: boolean;
}

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  public onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  public render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            {this.isLogin() ? (
              <Layout style={{ height: "100%", overflow: "hidden" }}>
                <Sider onCollapse={this.onCollapse} collapsible={true} collapsed={this.state.collapsed}>
                  <Meun />
                </Sider>
                <Layout style={{ backgroundColor: "#fff" }}>
                  <Content style={{ padding: "10px", height: "calc(100% - 40px)", overflow: "auto" }}>
                    <Switch>
                      <Route path="/" exact={true} component={Home} />
                      <Route path="/home" component={Home} />
                      <Route path="/test" component={Test} />
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
            ) : (
              <Switch>
                <Route path="/login" exact={true} component={Login} />
                <Route component={Login} />
              </Switch>
            )}
          </Router>
        </Provider>
      </div>
    );
  }

  /**
   * 是否登录
   */
  private isLogin() {
    // const state: any = store.getState();
    return true;
  }
}

export default App;
