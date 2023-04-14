import React, { memo } from "react";

import { connect } from "react-redux";
import { store2Props } from "../redux-item/selectors";
import actions from "../redux-item/actions";
import { reduxIProps } from "../redux-item/types";

import { Skeleton, message, Dropdown, Modal, ConfigProvider } from "antd";
import type { MenuProps } from "antd";
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // 代码高亮主题风格

const ChatContent: React.FC<reduxIProps> = ({
  main: { message_history, selectedId, createTime, updateTime },
}) => {
  const menu = (key: number): MenuProps["items"] => {
    return [
      {
        label: "撤消",
        key,
        onClick: () => {
          Modal.confirm({
            title: `您确定撤消这条消息吗？`,
            content: "撤消错误的对话会使ChatGPT判断更加准确",
            onOk: () => {
              if (message_history.length === 1)
                return message.error("不可撤销所有内容!");
              console.log(key);
            },
            okText: "撤消",
            cancelText: "取消",
            okButtonProps: {
              style: { backgroundColor: "#e7c895", color: "#333" },
            },
            cancelButtonProps: {
              style: { borderColor: "#eee", color: "#999" },
            },
          });
        },
      },
    ];
  };

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
                <Dropdown
                  menu={{ items: menu(index) }}
                  trigger={["contextMenu"]}
                  key={selectedId + "user" + index}
                >
                  <div className="chat-bubble right">
                    <p>{item.content}</p>
                  </div>
                </Dropdown>
              );
            }
            if (item.role === "assistant") {
              return (
                <div
                  style={{ maxWidth: "max-content" }}
                  key={selectedId + "assistant" + index}
                >
                  {!!updateTime &&
                    index === message_history.length - 1 &&
                    updateTime !== createTime && (
                      <p style={{ textAlign: "center", color: "#999" }}>
                        {updateTime}
                      </p>
                    )}
                  <Dropdown
                    menu={{ items: menu(index) }}
                    trigger={["contextMenu"]}
                  >
                    <div className="chat-bubble">
                      <ReactMarkdown
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            let match = /language-(\w+)/.exec(className || "");
                            return !inline ? (
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
                                  language={match?.[1] || "javascript"}
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
                  </Dropdown>
                </div>
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
