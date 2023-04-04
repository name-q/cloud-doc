import React from "react";

import "./Header-operate.less";
import SearchInput from "@/compon/search-input";
import {
  CloseCircleTwoTone,
  MinusCircleTwoTone,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

import { asyncSend } from "@/kit/ipc";
class HeaderOperate extends React.Component<any, any> {
  render() {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <p
            onClick={() => {
              alert(1);
            }}
          >
            清除所有消息
          </p>
        ),
      },
      {
        key: "2",
        label: (
          <p
            onClick={() => {
              alert(2);
            }}
          >
            退出登入
          </p>
        ),
      },
    ];
    return (
      <div className="headerOperate">
        <div className="leftArea">
          <div className="closeMinusButton">
            <CloseCircleTwoTone twoToneColor={["#fc605c", "#f3e1e1"]} />
            <MinusCircleTwoTone twoToneColor={["#fdbc40", "#f8f393"]} />
          </div>
          <div className="closeMinusButtonX">
            <div className="close" onClick={() => asyncSend("exit")} />
            <div className="minus" onClick={() => asyncSend("minimize")} />
          </div>
        </div>

        <div className="rightArea">
          <div>
            <SearchInput />
            <Dropdown menu={{ items }} placement="bottomRight">
              <SettingOutlined
                style={{ padding: 20, paddingRight: 10, marginRight: 10 }}
              />
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderOperate;
