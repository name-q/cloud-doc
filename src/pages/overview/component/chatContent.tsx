import React, { memo } from "react";

import { connect } from "react-redux";
import { store2Props } from "../redux-item/selectors";
import actions from "../redux-item/actions";
import { reduxIProps } from "../redux-item/types";

import { Skeleton } from "antd";
import ReactMarkdown from "react-markdown";

const ChatContent: React.FC<reduxIProps> = ({
  main: { message_history, selectedId },
}) => {
  console.log(message_history, "<<<message_history");
  return (
    <>
      {!selectedId ? (
        <div className="chat-container">
          <div className="chat-bubble" style={{ width: "70%" }}>
            <Skeleton active />
          </div>
          <div className="chat-bubble right" style={{ width: "85%" }}>
            <Skeleton active />
          </div>
          <div className="chat-bubble" style={{ width: "70%" }}>
            <Skeleton active />
          </div>
          <div className="chat-bubble right" style={{ width: "85%" }}>
            <Skeleton active />
          </div>
          <div className="chat-bubble" style={{ width: "70%" }}>
            <Skeleton active />
          </div>
          <div className="chat-bubble right" style={{ width: "85%" }}>
            <Skeleton active />
          </div>
        </div>
      ) : (
        <div className="chat-container">
          {message_history.map((item) => {
            if (item.role === "user") {
              return (
                <>
                  <div className="chat-bubble right">
                    <p>{item.content}</p>
                  </div>
                </>
              );
            }
            if (item.role === "assistant") {
              return (
                <>
                  <div className="chat-bubble">
                    <ReactMarkdown>{item.content}</ReactMarkdown>
                  </div>
                </>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default connect(
  store2Props,
  actions
)(
  memo(
    ChatContent,
    (pre, next) => pre.main.message_history === next.main.message_history
  )
);
