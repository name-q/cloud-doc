import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
import "default-passive-events";

import { ConfigProvider } from "antd";

import "./index.less";
import App from "./App";

ReactDOM.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#F56614",
        colorFillContentHover: "#F56614",
        colorTextHeading: "#F56614",
        colorLink: "#F56614",
        colorLinkHover: "rgb(241,144,79)",
      },
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
