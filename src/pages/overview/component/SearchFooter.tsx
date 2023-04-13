import React, { useState } from "react";

import { connect } from "react-redux";
import { store2Props } from "../redux-item/selectors";
import actions from "../redux-item/actions";
import { reduxIProps } from "../redux-item/types";

import { Input } from "antd";

const { TextArea } = Input;

const SearchFooter: React.FC<reduxIProps> = (props) => {
  let [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Change:", e.target.value);
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 阻止 TextArea 默认的换行行为
      e.stopPropagation();
      console.log("send");
      props.actions.action.sendMessage(value);
    }
  };
  return (
    <>
      <TextArea
        showCount
        maxLength={2000}
        style={{ height: "100%", resize: "none" }}
        onChange={onChange}
        placeholder="Send a message..."
        onKeyDown={handleKeyDown} // 监听键盘事件
        disabled={props.main.loadingMessage}
      />
    </>
  );
};

export default connect(store2Props, actions)(SearchFooter);
