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
        colorPrimary: "#e7c895",
        colorFillContentHover: "#e7c895",
        colorTextHeading: "#e7c895",
        colorLink: "#e7c895",
        colorLinkHover: "#e7c895",
      },
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
