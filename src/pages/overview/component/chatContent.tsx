import React, { memo } from "react";

import { connect } from "react-redux";
import { store2Props } from "../redux-item/selectors";
import actions from "../redux-item/actions";
import { reduxIProps } from "../redux-item/types";

import { Skeleton, message } from "antd";
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // 代码高亮主题风格

const ChatContent: React.FC<reduxIProps> = ({
  main: { message_history, selectedId, createTime, updateTime },
}) => {
  return (
    <>
      {!selectedId ? (
        <div className="chat-container" key="chat...">
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
        <div className="chat-container" key="chat">
          {!!createTime && (
            <p style={{ textAlign: "center", color: "#999" }}>{createTime}</p>
          )}
          {message_history.map((item, index) => {
            if (item.role === "user") {
              return (
                <div
                  className="chat-bubble right"
                  key={selectedId + "user" + index}
                >
                  <p>{item.content}</p>
                </div>
              );
            }
            if (item.role === "assistant") {
              return (
                <>
                  {!!updateTime &&
                    index === message_history.length - 1 &&
                    updateTime !== createTime && (
                      <p style={{ textAlign: "center", color: "#999" }}>
                        {updateTime}
                      </p>
                    )}
                  <div
                    className="chat-bubble"
                    key={selectedId + "assistant" + index}
                  >
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <>
                              <CopyToClipboard text={children}>
                                <span
                                  className="copy-code"
                                  onClick={() =>
                                    message.success("Copy Success!")
                                  }
                                >
                                  Copy Code
                                </span>
                              </CopyToClipboard>
                              <SyntaxHighlighter
                                showLineNumbers={true}
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  </div>
                </>
              );
            }
            return null;
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
    (pre, next) =>
      pre.main.message_history === next.main.message_history &&
      pre.main.selectedId === next.main.selectedId
  )
);
