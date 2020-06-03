import React from "react";
import { Provider } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";
// import { ConnectedRouter } from "connected-react-router";
import Home from "./components/Home/Page";
import Test from "./components/Test/Page";
import Meun from "./components/Menu/Menu";
import { store } from "./common/store";
import { history } from "./common/history";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router history={history}>
          <Meun />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/test" component={Test} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
