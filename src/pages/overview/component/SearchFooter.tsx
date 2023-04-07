import React from "react";

import { connect } from "react-redux";
import { store2Props } from "../redux-item/selectors";
import actions from "../redux-item/actions";
import { reduxIProps } from "../redux-item/types";

import { Input } from "antd";

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log("Change:", e.target.value);
};

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // 阻止 TextArea 默认的换行行为
    e.stopPropagation();
    console.log('send')
  }
};

const SearchFooter: React.FC<reduxIProps> = (props) => (
  <>
    <TextArea
      showCount
      maxLength={2000}
      style={{ height: "100%", resize: "none" }}
      onChange={onChange}
      placeholder="Send a message..."
      onKeyDown={handleKeyDown} // 监听键盘事件
    />
  </>
);

export default connect(store2Props, actions)(SearchFooter);
