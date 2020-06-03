import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const render = () => {
  ReactDOM.render(
    <div>
      <App />
    </div>,
    document.getElementById("root")
  );
};
render();
